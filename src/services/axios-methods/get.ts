/* eslint-disable @typescript-eslint/naming-convention */
import clearLocalStorage from "@/shared/clearLocalStorage";
import {
  SERVER_URL,
  SHOULD_ENABLE_CREDENTIALS
} from "@/shared/constants/envVars";
import { addToast } from "@heroui/toast";
import axios, { type AxiosResponse } from "axios";
import Cookies from "js-cookie";
import {
  addToRefreshQueue,
  getIsRefreshing,
  processQueue,
  setIsRefreshing,
  tryRefreshToken
} from "./refreshToken";

const get = async (API_ROUTE: string, PARAMS: OBJECT = {}): Promise<any> => {
  try {
    const accessToken = Cookies.get("accessToken");

    const response: AxiosResponse<any, any> = await axios.get(API_ROUTE, {
      method: "get",
      baseURL: SERVER_URL,
      allowAbsoluteUrls: false,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        authorization: `Bearer ${accessToken ?? ""}`
      },
      params: PARAMS,
      // timeout: 10000,
      withCredentials: SHOULD_ENABLE_CREDENTIALS, // set via VITE_ENABLE_CREDENTIALS env var
      responseType: "json",
      maxRedirects: 21
    });

    const { data } = response;

    return data;
  } catch (error: any) {
    let currentError = error;

    // If it's a 401, try to refresh and retry once
    if (error.response?.status === 401) {
      // Prevent trying to refresh if this request was the refresh endpoint itself
      const wasRefreshCall =
        error.config &&
        (error.config.url?.includes("/auth/refresh") ||
          (error.config.baseURL &&
            error.config.baseURL.includes("/auth/refresh")));

      if (wasRefreshCall) {
        // refresh itself failed -> force logout
        addToast({
          title: "Session Expired",
          description: "Please log in again.",
          color: "danger"
        });

        Cookies.remove("accessToken");
        clearLocalStorage(["user"]);
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);

        return;
      }

      // If a refresh is already in progress, queue this request
      if (getIsRefreshing()) {
        return new Promise((resolve, reject) => {
          addToRefreshQueue({ resolve, reject, config: error.config });
        });
      }

      // mark refresh started
      setIsRefreshing(true);

      const newToken = await tryRefreshToken();

      if (!newToken) {
        // refresh failed -> logout
        setIsRefreshing(false);

        processQueue(new Error("Refresh failed"), null);

        addToast({
          title: "Unauthorized access!",
          description: "Access token expired. Please log in again.",
          color: "danger"
        });

        Cookies.remove("accessToken");
        clearLocalStorage(["user"]);
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);

        return;
      }

      // refresh succeeded -> retry original request with new token
      setIsRefreshing(false);

      processQueue(null, newToken);

      // retry the original request (error.config contains original axios config)
      if (error.config) {
        // set Authorization header and retry
        if (!error.config.headers) error.config.headers = {};
        (error.config.headers as any).authorization = `Bearer ${newToken}`;

        try {
          const retryResp = await axios.request(error.config);

          return retryResp.data;
        } catch (retryErr: any) {
          // If retry fails, use retry error for handling below
          currentError = retryErr;
        }
      }
    }

    // Handle other server errors explicitly if needed
    if (currentError.response?.status === 500) {
      // optional: specific handling for 500
    }

    if (
      currentError.response?.status === 502 ||
      currentError.response?.status === 504
    ) {
      // optional: specific handling for gateway/timeouts
    }

    if (currentError.response?.status === 403) {
      // optional: forbidden
    }

    // If we've reached here, it's not a handled 401 that succeeded
    const finalIsNetworkError = !currentError.response;
    const errorTitle = finalIsNetworkError
      ? "Network Error!"
      : "Request Error!";

    const errorMessage = finalIsNetworkError
      ? "Please check your server connection."
      : currentError?.response?.data?.message ||
        "An unexpected error occurred.";

    addToast({
      title: errorTitle,
      description: errorMessage,
      color: "danger"
    });

    // Cleanup and rethrow so callers can also handle if they want
    throw new Error(currentError?.response?.data?.message || errorMessage);
  }
};

export default get;

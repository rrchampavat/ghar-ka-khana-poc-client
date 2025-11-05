/* eslint-disable @typescript-eslint/naming-convention */
import clearLocalStorage from "@/shared/clearLocalStorage";
import {
  SERVER_URL,
  SHOULD_ENABLE_CREDENTIALS
} from "@/shared/constants/envVars";
import { addToast } from "@heroui/toast";
import axios from "axios";
import Cookies from "js-cookie";
import {
  addToRefreshQueue,
  getIsRefreshing,
  processQueue,
  setIsRefreshing,
  tryRefreshToken
} from "./refreshToken";

const update = async (
  API_ROUTE: string,
  payload: { [key: string | number]: string | number | null }
): Promise<any> => {
  try {
    const accessToken = Cookies.get("accessToken");

    const REQ_URL = SERVER_URL + API_ROUTE;

    const response = await axios.put(REQ_URL, payload, {
      method: "put",
      allowAbsoluteUrls: true,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${accessToken}`
      },
      timeout: 10000,
      withCredentials: SHOULD_ENABLE_CREDENTIALS, // Required to send HttpOnly refresh cookie
      responseType: "json",
      validateStatus: (status: number) => status >= 200 && status < 300,
      maxRedirects: 21
    });

    const { data } = response;

    return data;
  } catch (error: any) {
    let currentError = error;
    if (error.response?.status === 500) {
      // throw new Error("Something went wrong.");
    }

    if (error.response?.status === 502) {
      // throw new Error("Could not connect to server.");
    }

    if (error.response?.status === 504) {
      // throw new Error("Could not connect to server.");
    }

    if (error.response?.status === 403) {
      // throw new Error("Could not connect to server.");
    }

    // Handle 401 with refresh token logic
    if (error.response?.status === 401) {
      // Prevent trying to refresh if this request was the refresh endpoint itself
      const wasRefreshCall =
        error.config &&
        (String(error.config.url).includes("/auth/refresh") ||
          String(error.config.baseURL).includes("/auth/refresh"));

      if (wasRefreshCall) {
        // Refresh itself failed -> force logout
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

      // Mark refresh started
      setIsRefreshing(true);

      const newToken = await tryRefreshToken();

      if (!newToken) {
        // Refresh failed -> logout
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

      // Refresh succeeded -> retry original request with new token
      setIsRefreshing(false);

      processQueue(null, newToken);

      // Retry the original request (error.config contains original axios config)
      if (error.config) {
        // Set Authorization header and retry
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
    const isNetworkError = !currentError.response;

    const errorTitle = isNetworkError ? "Network Error!" : "Request Error!";

    const errorMessage = isNetworkError
      ? "Please check your server connection."
      : currentError?.response?.data?.message ||
        "An unexpected error occurred.";

    addToast({
      title: errorTitle,
      description: errorMessage,
      color: "danger"
    });

    throw new Error(currentError?.response?.data?.message || errorMessage);
  }
};

export default update;

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

const post = async (API_ROUTE: string, payload: OBJECT): Promise<any> => {
  try {
    const accessToken = Cookies.get("accessToken");
    const REQ_URL = SERVER_URL + API_ROUTE;

    const response = await axios.post(REQ_URL, payload, {
      method: "post",
      allowAbsoluteUrls: true,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${accessToken ?? ""}`
      },
      timeout: 10000,
      withCredentials: SHOULD_ENABLE_CREDENTIALS, // set via VITE_ENABLE_CREDENTIALS env var
      responseType: "json",
      validateStatus: (status: number) => status >= 200 && status < 300,
      maxRedirects: 21
    });

    return response.data;
  } catch (error: any) {
    let currentError = error;

    // 401 handling with refresh + retry
    if (error.response?.status === 401) {
      // If this request itself was the refresh call, don't attempt again
      const wasRefreshCall =
        error.config &&
        (String(error.config.url).includes("/auth/refresh") ||
          String(error.config.baseURL).includes("/auth/refresh"));

      if (wasRefreshCall) {
        addToast({
          title: "Session Expired",
          description: "Please log in again.",
          color: "danger"
        });

        Cookies.remove("accessToken");
        clearLocalStorage(["user"]);
        setTimeout(() => {
          window.location.href = "/login";
        }, 1200);
        return;
      }

      // Queue if refresh already in progress
      if (getIsRefreshing()) {
        return new Promise((resolve, reject) => {
          addToRefreshQueue({ resolve, reject, config: error.config });
        });
      }

      setIsRefreshing(true);
      const newToken = await tryRefreshToken();

      if (!newToken) {
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
        }, 1200);

        return;
      }

      // refresh succeeded -> retry queued requests and original
      setIsRefreshing(false);
      processQueue(null, newToken);

      if (error.config) {
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

    // Other status-specific handling (kept from your original file)
    if (currentError.response?.status === 500) {
      // optional: specific handling for 500
    }

    if (currentError.response?.status === 502) {
      // optional: specific handling for 502
    }

    if (currentError.response?.status === 504) {
      // optional: specific handling for 504
    }

    if (currentError.response?.status === 403) {
      // optional: specific handling for 403
    }

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

    throw new Error(currentError?.response?.data?.message || errorMessage);
  }
};

export default post;

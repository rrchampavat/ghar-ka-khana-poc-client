/* eslint-disable @typescript-eslint/naming-convention */
import {
  SERVER_URL,
  SHOULD_ENABLE_CREDENTIALS
} from "@/shared/constants/envVars";
import axios, { type AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

type QueueItem = {
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
  config: AxiosRequestConfig;
};

let isRefreshing = false;
let refreshQueue: QueueItem[] = [];

/**
 * Process all queued requests after a refresh token attempt
 */
export const processQueue = (error: any, token: string | null = null) => {
  refreshQueue.forEach(({ resolve, reject, config }) => {
    if (error) {
      reject(error);
    } else {
      if (token) {
        // Initialize headers if it doesn't exist
        if (!config.headers) config.headers = {};
        // Set new auth header before retrying
        (config.headers as any).authorization = `Bearer ${token}`;
      }
      resolve(axios.request(config));
    }
  });

  refreshQueue = [];
};

/**
 * Attempt to refresh the access token using the HttpOnly refresh cookie
 * Backend implements token rotation: creates new refresh token, revokes old one
 * Returns the new access token or null if refresh fails
 */
export const tryRefreshToken = async (): Promise<string | null> => {
  try {
    // Call refresh endpoint - backend expects refresh token in HttpOnly cookie
    // Backend will: validate token, create new refresh token (rotation), revoke old one
    const resp = await axios.post(
      `${SERVER_URL}/api/v1/auth/refresh`,
      {},
      {
        withCredentials: SHOULD_ENABLE_CREDENTIALS, // Required to send HttpOnly refresh cookie
        headers: { "Content-Type": "application/json" }
      }
    );

    // Backend returns: { success: true, data: { accessToken }, message: "" }
    const responseData = resp.data?.data;
    const newAccessToken =
      (responseData && (responseData as any).accessToken) || null;

    if (newAccessToken) {
      // Store new access token (refresh token is automatically set as HttpOnly cookie by backend)
      Cookies.set("accessToken", newAccessToken, { sameSite: "lax" });
      return newAccessToken;
    }

    return null;
  } catch {
    return null;
  }
};

/**
 * Check if a refresh is currently in progress
 */
export const getIsRefreshing = () => isRefreshing;

/**
 * Set the refresh state
 */
export const setIsRefreshing = (value: boolean) => {
  isRefreshing = value;
};

/**
 * Add a request to the refresh queue
 */
export const addToRefreshQueue = (item: QueueItem) => {
  refreshQueue.push(item);
};

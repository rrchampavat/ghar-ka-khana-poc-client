/* eslint-disable @typescript-eslint/naming-convention */
import clearLocalStorage from "@/shared/clearLocalStorage";
import { SERVER_URL } from "@/shared/constants/envVars";
import { addToast } from "@heroui/toast";
import axios, { type AxiosResponse } from "axios";
import Cookies from "js-cookie";

const get = async (API_ROUTE: string, PARAMS: OBJECT = {}): Promise<any> => {
  try {
    const accessToken = Cookies.get("accessToken");

    const response: AxiosResponse<any, any> = await axios.get(API_ROUTE, {
      method: "get",
      baseURL: SERVER_URL,
      allowAbsoluteUrls: false,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        authorization: `Bearer ${accessToken}`
      },
      params: PARAMS,
      // timeout: 10000,
      withCredentials: false,
      responseType: "json",
      // validateStatus: (status) => status >= 200 && status < 300,
      maxRedirects: 21
    });

    const { data } = response;

    return data;
  } catch (error: any) {
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

    if (error.response.status === 401) {
      // Handle unauthorized access, e.g., redirect to login
      addToast({
        title: "Unauthorized access!",
        description:
          "Access token expired. Please log in again or refresh your token.",
        color: "danger"
      });

      Cookies.remove("accessToken");
      //  clearLocalStorage(["user"]);
      clearLocalStorage(["user"]);
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);

      return;
    }

    const isNetworkError = !error.response;

    const errorTitle = isNetworkError ? "Network Error!" : "Request Error!";

    const errorMessage = isNetworkError
      ? "Please check your server connection."
      : error?.response?.data?.message || "An unexpected error occurred.";

    addToast({
      title: errorTitle,
      description: errorMessage,
      color: "danger"
    });

    throw new Error(error?.response?.data?.message);
  }
};

export default get;

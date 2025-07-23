/* eslint-disable @typescript-eslint/naming-convention */
import { SERVER_URL } from "@/shared/constants/envVars";
import { addToast } from "@heroui/toast";
import axios from "axios";
import Cookies from "js-cookie";

const post = async (API_ROUTE: string, payload: OBJECT): Promise<any> => {
  try {
    const accessToken = Cookies.get("accessToken");

    const REQ_URL = SERVER_URL + API_ROUTE;

    const response = await axios.post(REQ_URL, payload, {
      method: "post",
      allowAbsoluteUrls: true,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${accessToken}`
      },
      timeout: 10000,
      withCredentials: false,
      responseType: "json",
      validateStatus: (status: number) => status >= 200 && status < 300,
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
      Cookies.remove("accessToken");
      window.location.href = "/login";
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

export default post;

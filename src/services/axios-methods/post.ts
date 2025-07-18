/* eslint-disable @typescript-eslint/naming-convention */
import { SERVER_URL } from "@/shared/constants/envVars";
import { addToast } from "@heroui/toast";

import axios from "axios";

const post = async (payload: any, requestURL: string) => {
  try {
    const response = await axios.post(`${SERVER_URL}${requestURL}`, payload, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    const { data, status } = response;

    return { data, status };
  } catch (error: any) {
    const isNetworkError = !error.response;

    const errorTitle = isNetworkError ? "Network Error!" : "Request Error!";

    const errorMessage = isNetworkError
      ? "Please check your server connection."
      : error?.response?.data?.message || "An unexpected error occurred.";

    addToast({
      title: errorTitle,
      description: errorMessage,
      color: "danger",
      shouldShowTimeoutProgress: true
    });

    throw new Error(error?.response?.data?.message);
  }
};

export default post;

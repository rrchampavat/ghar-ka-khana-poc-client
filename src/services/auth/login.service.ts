import API_ROUTES from "@/shared/constants/request-urls";
import type { LOGIN_PAYLOAD } from "@/shared/validation-schemas/auth/login.schema";
import Cookies from "js-cookie";
import post from "../axios-methods/post";

export const login = async (
  payload: LOGIN_PAYLOAD
): Promise<LOGIN_RESPONSE_DATA> => {
  const { data }: LOGIN_RESPONSE = await post(API_ROUTES.LOGIN, payload);

  Cookies.set("accessToken", data.accessToken);

  localStorage.setItem("user", JSON.stringify(data.user));

  return data;
};

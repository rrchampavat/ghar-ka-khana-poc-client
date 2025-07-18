import { AUTH } from "@/shared/constants/request-urls";
import post from "../axios-methods/post";

export const login = async (payload: LOGIN_PAYLOAD) => {
  const response: LOGIN_RESPONSE = await post(payload, AUTH.LOGIN);

  const { data } = response;

  return data;
};

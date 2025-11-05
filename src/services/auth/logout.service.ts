import API_ROUTES from "@/shared/constants/request-urls";
import post from "../axios-methods/post";

export const logout = async (): Promise<void> => {
  await post(API_ROUTES.LOGOUT, {});
};

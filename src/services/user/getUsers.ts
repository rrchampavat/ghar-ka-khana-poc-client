import API_ROUTES from "@/shared/constants/request-urls";
import get from "../axios-methods/get";

const getUsers = async () => {
  const { data }: USER_LIST_RESPONSE = await get(API_ROUTES.USERS);

  return data;
};

export default getUsers;

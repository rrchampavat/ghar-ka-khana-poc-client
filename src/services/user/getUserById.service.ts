import API_ROUTES from "@/shared/constants/request-urls";
import get from "../axios-methods/get";

const getUserById = async (userID: number): Promise<USER> => {
  const { data }: USER_RESPONSE = await get(`${API_ROUTES.USERS}/${userID}`);

  return data;
};

export default getUserById;

import API_ROUTES from "@/shared/constants/request-urls";
import update from "../axios-methods/update";
import type { USER_UPDATE_PAYLOAD } from "@/shared/validation-schemas/auth/userUpdate.schema";

const updateUser = async (userID: number, payload: USER_UPDATE_PAYLOAD) => {
  const reqUrl = `${API_ROUTES.USERS}/${userID}`;

  const response = await update(reqUrl, payload);

  return response;
};

export default updateUser;

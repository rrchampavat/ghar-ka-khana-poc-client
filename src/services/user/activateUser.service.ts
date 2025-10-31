import API_ROUTES from "@/shared/constants/request-urls";
import patch from "../axios-methods/patch";

const activateUser = async (userId: number) => {
  const { data } = await patch(`${API_ROUTES.USERS}/${userId}/activate`, {});

  return data;
};

export default activateUser;

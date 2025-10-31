import API_ROUTES from "@/shared/constants/request-urls";
import patch from "../axios-methods/patch";

const deactivateUser = async (userId: number) => {
  const { data } = await patch(`${API_ROUTES.USERS}/${userId}/deactivate`, {});

  return data;
};

export default deactivateUser;

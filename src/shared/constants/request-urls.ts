const API_BASE_PATH_V1 = "/api/v1";

const API_ROUTES = {
  LOGIN: `${API_BASE_PATH_V1}/auth/login`,
  REGISTER: `${API_BASE_PATH_V1}/auth/register`,
  LOGOUT: `${API_BASE_PATH_V1}/auth/logout`,
  USERS: `${API_BASE_PATH_V1}/users`
};

export default API_ROUTES;

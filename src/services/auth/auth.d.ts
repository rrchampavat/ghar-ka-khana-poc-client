type LOGIN_RESPONSE_DATA = {
  user: USER;
  accessToken: string;
};

type LOGIN_RESPONSE = {
  message: string;
  success: boolean;
  data: LOGIN_RESPONSE_DATA;
};

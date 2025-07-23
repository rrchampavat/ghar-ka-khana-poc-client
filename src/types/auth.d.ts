type LOGIN_RESPONSE_DATA = {
  user: USER;
  accessToken: string;
};

type LOGIN_RESPONSE = GENERIC_RESPONSE & {
  data: LOGIN_RESPONSE_DATA;
};

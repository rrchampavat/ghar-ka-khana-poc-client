type USER = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  contact_no: string;
  role: number;
  user_image: string | null;
};

type USER_RESPONSE = {
  message: string;
  success: boolean;
  data: USER;
};

type USER_LIST_RESPONSE = {
  message: string;
  success: boolean;
  data: USER[];
};

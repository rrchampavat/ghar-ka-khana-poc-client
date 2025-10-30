type USER = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  contact_no: string;
  role: number;
  user_image: string;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
};

type USER_RESPONSE = {
  message: string;
  success: boolean;
  data: USER;
};

type USER_LIST_RESPONSE = {
  message: string;
  success: boolean;
  data: GENERIC_LIST<USER>;
};

type BASE_RESPONSE = {
  success: boolean;
  message: string;
};

type SORT_PARAMS = {
  sortBy: Key;
  sortOrder: "asc" | "desc";
};

type OBJECT = { [key: string | number]: string | number };

type GENERIC_RESPONSE = {
  message: string;
  success: boolean;
};

type GENERIC_LIST<T> = {
  data: T[];
  limit: number;
  page: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
};

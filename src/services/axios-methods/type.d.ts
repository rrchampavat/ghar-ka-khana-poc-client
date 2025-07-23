type BASE_RESPONSE = {
  success: boolean;
  message: string;
};

type SORT_PARAMS = {
  sortBy: Key;
  sortOrder: "asc" | "desc";
};

type QUERY_PARAMS = { [key: string]: string | number };

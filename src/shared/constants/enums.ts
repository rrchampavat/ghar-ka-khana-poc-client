/* eslint-disable @typescript-eslint/naming-convention */
export const USER_ROLE: OBJECT = {
  "1": "Admin",
  "2": "Cook",
  "3": "Delivery",
  "4": "Customer",
  Admin: "1",
  Cook: "2",
  Delivery: "3",
  Customer: "4"
};

export const ROLE_COLOR: {
  [key: string | number]:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined;
} = {
  1: "primary",
  2: "secondary",
  3: "success",
  4: "default",
  Admin: "warning",
  Cook: "secondary",
  Delivery: "success",
  Customer: "primary"
};

export const COLOR: { [key: string]: string } = {
  default: "#d4d4d8",
  primary: "#006FEE",
  secondary: "#7828c8",
  success: "#17c964",
  warning: "#f5a524",
  danger: "#f31260"
};

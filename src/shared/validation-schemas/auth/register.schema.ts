import {
  passwordRegex,
  phoneRegex
} from "@/shared/constants/regular-expressions";
import { object, string, type InferType } from "yup";

const registerSchema = object({
  firstName: string()
    .required("Please provide your first name; it's a required field.")
    .typeError("Ensure that the first name is entered as a string."),
  lastName: string()
    .required("Please provide your last name; it's a required field.")
    .typeError("Ensure that the last name is entered as a string."),
  email: string()
    .email("Kindly enter a valid email address.")
    .required("Kindly enter a valid email address."),
  contactNo: string()
    .matches(phoneRegex, "Please enter a valid contact number.")
    .required("Please provide your contact number; it's a required field."),
  password: string()
    .required("Please provide a password; it is a required field.")
    .typeError("Ensure that the password is entered as a string.")
    .matches(
      passwordRegex,
      "For security reasons, your password must be a minimum of 8 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character."
    )
}).strict();

export default registerSchema;

export type REGISTER_PAYLOAD = InferType<typeof registerSchema>;

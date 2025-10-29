import { phoneRegex } from "@/shared/constants/regular-expressions";
import { number, object, string, type InferType } from "yup";

const userUpdateSchema = object({
  firstName: string()
    .required("Provide your first name; it's a required field.")
    .typeError("Ensure that the first name is entered as a string."),
  lastName: string()
    .required("Provide your last name; it's a required field.")
    .typeError("Ensure that the last name is entered as a string."),
  email: string()
    .email("Kindly enter a valid email address.")
    .required("Kindly enter a valid email address."),
  contactNo: string()
    .matches(phoneRegex, "Enter a valid contact number.")
    .required("Provide your contact number; it's a required field."),
  role: number().required("Assign role to user; it's a required field."),
  userImage: string().nullable().default("")
}).strict();

export default userUpdateSchema;

export type USER_UPDATE_PAYLOAD = InferType<typeof userUpdateSchema>;

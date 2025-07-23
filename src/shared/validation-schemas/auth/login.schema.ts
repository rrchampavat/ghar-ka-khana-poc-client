import { object, string, type InferType } from "yup";

const loginSchema = object({
  emailOrContact: string().required(
    "Please provide a email or contact number; it is a required field."
  ),
  password: string()
    .required("Please provide a password; it is a required field.")
    .typeError("Ensure that the password is entered as a string.")
}).strict();

export default loginSchema;

export type LOGIN_PAYLOAD = InferType<typeof loginSchema>;

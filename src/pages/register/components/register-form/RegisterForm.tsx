import { register } from "@/services/auth/register.service";
import registerSchema, {
  type REGISTER_PAYLOAD
} from "@/shared/validation-schemas/auth/register.schema";
import Button from "@/ui/components/button/Button";
import Input from "@/ui/components/input/Input";
// import Input from "@/ui/components/input";
import PasswordInput from "@/ui/components/input/password-input/PasswordInput";
import Link from "@/ui/components/link/Link";
import {
  TypographyH1,
  TypographyLead,
  TypographyP
} from "@/ui/components/typography/Typography";
import { Form } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const initialRegisterValues: REGISTER_PAYLOAD = {
  firstName: "",
  lastName: "",
  contactNo: "",
  email: "",
  password: ""
};

const RegisterForm = () => {
  const navigate = useNavigate();

  const { handleSubmit, control } = useForm<REGISTER_PAYLOAD>({
    resolver: yupResolver(registerSchema),
    defaultValues: initialRegisterValues,
    mode: "onSubmit"
  });

  const { mutate: registerMutation, isPending } = useMutation({
    mutationFn: register,
    onSuccess: () => navigate("/")
  });

  const handleRegister: SubmitHandler<REGISTER_PAYLOAD> = (values) =>
    registerMutation(values);

  return (
    <section className="mx-auto my-auto px-4 md:border-l-1 lg:px-12 xl:px-20">
      <TypographyH1>Welcome to Ghar ka Khana</TypographyH1>
      <TypographyLead>Your goto online tiffin service.</TypographyLead>
      <Form
        className="my-10 flex flex-col items-center space-y-3"
        onSubmit={handleSubmit(handleRegister)}
      >
        <Controller
          name="firstName"
          control={control}
          render={({ field, formState }) => (
            <Input
              type="text"
              label="First name"
              errorMessage={formState.errors.firstName?.message}
              className="w-full"
              {...field}
            />
          )}
        />

        <Controller
          name="lastName"
          control={control}
          render={({ field, formState }) => (
            <Input
              type="text"
              label="Last name"
              className="w-full"
              errorMessage={formState.errors.lastName?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field, formState }) => (
            <Input
              type="email"
              label="Email address"
              className="w-full"
              placeholder="Email address"
              errorMessage={formState.errors.email?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="contactNo"
          control={control}
          render={({ field, formState }) => (
            <Input
              type="text"
              label="Contact number"
              className="w-full"
              errorMessage={formState.errors.contactNo?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field, formState }) => (
            <PasswordInput
              label="Password"
              className="mb-5 w-full"
              placeholder="Password"
              errorMessage={formState.errors.password?.message}
              {...field}
            />
          )}
        />

        <Button
          className="!mt-6 w-fit"
          isLoading={isPending}
          type="submit"
          color="default"
        >
          Sign up
        </Button>
      </Form>

      <div className="flex justify-between space-x-3">
        <TypographyP>Already registered with us?</TypographyP>
        <Link href="/login">Login</Link>
      </div>
    </section>
  );
};

export default RegisterForm;

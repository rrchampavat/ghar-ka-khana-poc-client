import { register } from "@/services/auth/register";
import registerSchema from "@/shared/validation-schemas/auth/register";
import Button from "@/ui/components/button";
import Input from "@/ui/components/input";
// import Input from "@/ui/components/input";
import PasswordInput from "@/ui/components/input/password-input";
import Link from "@/ui/components/link";
import {
  TypographyH1,
  TypographyLead,
  TypographyP
} from "@/ui/components/typography";
import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from "js-cookie";
import { useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { InferType } from "yup";

type REGISTER_SCHEMA = InferType<typeof registerSchema>;

const initialRegisterValues: REGISTER_SCHEMA = {
  firstName: "",
  lastName: "",
  contactNo: "",
  email: "",
  password: ""
};

const RegisterForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { handleSubmit, control } = useForm<REGISTER_SCHEMA>({
    resolver: yupResolver(registerSchema),
    defaultValues: initialRegisterValues,
    mode: "onSubmit"
  });

  const handleRegister: SubmitHandler<REGISTER_SCHEMA> = async (values) => {
    try {
      setIsLoading(true);

      const response = await register({
        ...values,
        contactNo: Number(values.contactNo)
      });

      const { data, success: isSuccess } = response;

      if (isSuccess) {
        Cookies.set("accessToken", data.accessToken);

        navigate("/");
      }
    } catch (error: any) {
      throw new Error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="mx-auto my-auto px-4 md:border-l-1 lg:px-12 xl:px-20">
      <TypographyH1>Welcome to Ghar ka Khana</TypographyH1>

      <TypographyLead>Your goto online tiffin service.</TypographyLead>

      <form className="my-10 flex flex-col items-center space-y-3">
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
              errorMessage={formState.errors.password?.message}
              {...field}
            />
          )}
        />

        <Button
          className="!mt-6 w-fit"
          onClick={handleSubmit(handleRegister)}
          isLoading={isLoading}
        >
          Sign up
        </Button>
      </form>

      <div className="flex justify-between space-x-3">
        <TypographyP>Already registered with us?</TypographyP>
        <Link href="/login">Login</Link>
      </div>
    </section>
  );
};

export default RegisterForm;

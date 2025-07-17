import { login } from "@/services/auth/login";
import loginSchema from "@/shared/validation-schemas/auth/login";
import Button from "@/ui/components/button";
import Input from "@/ui/components/input";
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

const initialLoginValues: LOGIN_PAYLOAD = {
  emailOrContact: "",
  password: ""
};

const LoginForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { handleSubmit, control } = useForm<LOGIN_PAYLOAD>({
    resolver: yupResolver(loginSchema),
    defaultValues: initialLoginValues,
    mode: "onSubmit"
  });

  const handleLogin: SubmitHandler<LOGIN_PAYLOAD> = async (values) => {
    try {
      setIsLoading(true);

      const response = await login(values);

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
          name="emailOrContact"
          control={control}
          render={({ field, formState }) => (
            <Input
              type="text"
              label="Email or Contact number"
              errorMessage={formState.errors.emailOrContact?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field, formState }) => (
            <PasswordInput
              className="mb-5"
              errorMessage={formState.errors.password?.message}
              {...field}
            />
          )}
        />

        <Button
          onClick={handleSubmit(handleLogin)}
          isLoading={isLoading}
          className="!mt-6 w-fit"
        >
          Login
        </Button>
      </form>

      <div className="flex justify-between space-x-3">
        <TypographyP>New to Ghar ka Khana?</TypographyP>
        <Link href="/sign-up">Create an account</Link>
      </div>
    </section>
  );
};

export default LoginForm;

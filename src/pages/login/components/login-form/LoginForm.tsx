import { login } from "@/services/auth/login";
import loginSchema from "@/shared/validation-schemas/auth/login";
import Button from "@/ui/components/button/Button";
import Input from "@/ui/components/input/Input";
import PasswordInput from "@/ui/components/input/password-input/PasswordInput";
import Link from "@/ui/components/link/Link";
import {
  TypographyH1,
  TypographyLead,
  TypographyP
} from "@/ui/components/typography/Typography";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const initialLoginValues: LOGIN_PAYLOAD = {
  emailOrContact: "",
  password: ""
};

const LoginForm = () => {
  const navigate = useNavigate();

  const { handleSubmit, control } = useForm<LOGIN_PAYLOAD>({
    resolver: yupResolver(loginSchema),
    defaultValues: initialLoginValues,
    mode: "onSubmit"
  });

  const { mutate: loginMutation, isPending } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate("/");
    }
  });

  const handleLogin: SubmitHandler<LOGIN_PAYLOAD> = (values) =>
    loginMutation(values);

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
              className="w-full"
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
              className="mb-5 w-full"
              errorMessage={formState.errors.password?.message}
              {...field}
            />
          )}
        />

        <Button
          onClick={handleSubmit(handleLogin)}
          isLoading={isPending}
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

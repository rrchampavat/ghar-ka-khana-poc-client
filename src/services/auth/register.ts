import { AUTH } from "@/shared/constants/request-urls";
import { toast } from "@/ui/components/toast/use-toast";
import post from "../axios-methods/post";

export const register = async (payload: REGISTER_PAYLOAD) => {
  try {
    const response: LOGIN_RESPONSE = await post(payload, AUTH.REGISTER);

    const { data } = response;

    if (!data.success) {
      toast({
        variant: "destructive",
        title: "Register Error!",
        description: data.message
      });

      return {
        message: "",
        data: { user: {}, accessToken: "" },
        success: false
      };
    }

    toast({
      variant: "success",
      title: "Registration successful!",
      description: data.message
    });

    return data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

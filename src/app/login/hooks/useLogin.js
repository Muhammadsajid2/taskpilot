import { useLoginMutation } from "../../../../public/Hooks/Mutations/useLoginMutation";
import { useRouter } from "next/navigation";

const useLogin = () => {
  const { userLoginMutateAsync, isUserLoginLoading } = useLoginMutation();
  const router = useRouter();

  const onFinish = async (userCreds) => {
    try {
      await userLoginMutateAsync(userCreds);
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return { onFinish, isUserLoginLoading };
};

export default useLogin;

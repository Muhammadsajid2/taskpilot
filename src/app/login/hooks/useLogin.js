import { useLoginMutation } from "../../../../public/Hooks/Mutations/useLoginMutation";

const useLogin = () => {
  const { userLoginMutateAsync, isUserLoginLoading } = useLoginMutation();

  console.log(
    userLoginMutateAsync,
    isUserLoginLoading,
    ">>userLoginMutateAsync, isUserLoginLoading>>>"
  );

  const onFinish = (userCreds) => {
    console.log(userCreds, ">>>>Creds>>>");
  };

  return { onFinish };
};

export default useLogin;

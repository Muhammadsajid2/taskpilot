import { useMutation } from "@tanstack/react-query";
import { customNotification } from "../../utils/notifications";
import { loginFn } from "../../API/auth"; // Adjust the path to your loginFn

export const useLoginMutation = () => {
  const {
    mutate: userLoginMutate,
    mutateAsync: userLoginMutateAsync,
    data: loginData,
    status: userLoginStatus,
    error: userLoginError,
    isLoading: isUserLoginLoading,
  } = useMutation({
    mutationFn: (UserRoleData) => loginFn(UserRoleData),
    onSuccess: () => {
      customNotification("success", "User Login Successful");
    },
    onError: (error) => {
      customNotification(
        "error",
        `Login Failed: ${error.message || "Unknown error"}`
      );
    },
  });

  return {
    userLoginMutate,
    userLoginMutateAsync,
    isUserLoginLoading,
    loginData,
    userLoginStatus,
    userLoginError,
  };
};

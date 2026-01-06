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
    isPending: isUserLoginLoading,
  } = useMutation({
    mutationFn: (UserRoleData) => loginFn(UserRoleData),
    onSuccess: (data) => {
      if (data?.token) {
        localStorage.setItem("token", data.token);
      }
      customNotification("Login Successful", "Welcome back to Task Pilot!");
    },
    onError: (error) => {
      // The error notification is handled globally by the axios interceptor in request.js
      console.error("Mutation Error:", error);
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

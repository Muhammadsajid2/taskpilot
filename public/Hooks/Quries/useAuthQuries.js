import { loginFn } from "../../API/auth";

export function useLoginQuery() {
  const { data: loginUserData, isLoading: isLoginUserDataLoading } =
    useCustomQuery(["loginUserData"], () => loginFn(), true, true);
  return { loginUserData, isLoginUserDataLoading };
}

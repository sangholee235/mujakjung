import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { User } from "../types/user";
import type {
  SignupRequest,
  LoginRequest,
  UserResponse,
} from "../types/userApi";
import { signup, login, fetchCurrentUser } from "../api/userApi";

// 회원가입 훅
export const useSignup = () => {
  const queryClient = useQueryClient();

  return useMutation<UserResponse, unknown, SignupRequest>({
    mutationFn: signup,
    onSuccess: (user) => {
      localStorage.setItem("user", JSON.stringify(user)); // SPA 상태 유지용
      queryClient.setQueryData(["currentUser"], user);
    },
  });
};

// 로그인 훅
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<UserResponse, unknown, LoginRequest>({
    mutationFn: login,
    onSuccess: (user) => {
      localStorage.setItem("user", JSON.stringify(user)); // SPA 상태 유지용
      queryClient.setQueryData(["currentUser"], user);
    },
  });
};

// 현재 사용자 조회 훅
export const useCurrentUser = () => {
  return useQuery<User | null>({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    retry: false,
    initialData: () => {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    },
  });
};

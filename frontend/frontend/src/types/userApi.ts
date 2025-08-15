import type { User } from "./user";

// 회원가입 요청
export interface SignupRequest {
  username: string;
  nickname: string;
  password: string;
}

// 로그인 요청
export interface LoginRequest {
  username: string;
  password: string;
}

// 회원가입/로그인 응답은 User 타입 그대로 사용
export type UserResponse = User;

import api from "./axios";
import type {
  SignupRequest,
  LoginRequest,
  UserResponse,
} from "../types/userApi";

export const signup = (data: SignupRequest) =>
  api.post("/users/signup", data).then((res) => res.data as UserResponse);

export const login = (data: LoginRequest) =>
  api.post("/users/login", data).then((res) => res.data as UserResponse);

export const fetchCurrentUser = () =>
  api.get("/users/me").then((res) => res.data as UserResponse);

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useUsers"; // 훅 가져오기
import type { LoginRequest } from "../types/userApi";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigator = useNavigate();

  const loginMutation = useLogin();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data: LoginRequest = { username, password };

    loginMutation.mutate(data, {
      onSuccess: (user) => {
        alert("로그인 성공!");
        navigator("/"); // 홈으로 이동
      },
      onError: () => {
        alert("로그인 실패");
      },
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={onSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">로그인</h1>

        <input
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          placeholder="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
          disabled={loginMutation.isPending} // 진행 중 비활성화
        >
          {loginMutation.isPending ? "로그인 중..." : "로그인"}
        </button>
      </form>
    </div>
  );
}

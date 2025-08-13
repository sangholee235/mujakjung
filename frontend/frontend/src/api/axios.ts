import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true, // 세션 쿠키 전송
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 500) {
      alert("세션이 만료되었습니다. 다시 로그인해주세요.");
      localStorage.removeItem("user"); // UI 상태 초기화
      window.location.href = "/login"; // 로그인 페이지로 이동
    }
    return Promise.reject(err);
  }
);

export default api;

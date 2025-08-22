import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true, // 세션 쿠키 전송
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.response?.status;

    if (status === 401) {
      alert("세션이 만료되었습니다. 다시 로그인해주세요.");
      localStorage.removeItem("user");
      window.location.href = "/login";
    } else if (status === 403) {
      alert("권한이 없습니다.");
    } else if (status === 404) {
      console.warn("요청한 글을 찾을 수 없습니다.");
    } else if (status === 500) {
      alert("서버 내부 오류가 발생했습니다.");
    }

    return Promise.reject(err);
  }
);

export default api;

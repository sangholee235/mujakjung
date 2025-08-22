import api from "./axios";

export const fetchPosts = () => api.get("/posts").then((res) => res.data);

export const fetchPostById = (id: number) =>
  api.get(`/posts/${id}`).then((res) => res.data);

export const createPost = (data: { title: string; content: string }) =>
  api.post("/posts", data).then((res) => res.data);

export const deletePost = (id: number) =>
  api.delete(`/posts/${id}`).then((res) => res.data);

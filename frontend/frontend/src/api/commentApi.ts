import api from "./axios";
import type { CommentRequest, CommentResponse } from "../types/commentApi";

// 댓글 목록 조회
export const fetchCommentsByPost = (postId: number) =>
  api.get(`/comments/post/${postId}`).then((res) => {
    console.log("📌 댓글 목록 API 응답:", res.data);
    return res.data as CommentResponse[];
  });

// 댓글 작성
export const createComment = (postId: number, data: CommentRequest) =>
  api.post(`/comments/post/${postId}`, data).then((res) => {
    console.log("📌 댓글 작성 API 응답:", res.data);
    return res.data as CommentResponse;
  });

// 댓글 삭제
export const deleteComment = (commentId: number) =>
  api.delete(`/comments/${commentId}`).then((res) => {
    console.log("📌 댓글 삭제 API 응답:", res.data);
    return res.data;
  });

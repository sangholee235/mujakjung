import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchCommentsByPost,
  createComment,
  deleteComment,
} from "../api/commentApi";
import type { CommentRequest, CommentResponse } from "../types/commentApi";

// 댓글 목록 조회
export const useComments = (postId: number) => {
  return useQuery<CommentResponse[]>({
    queryKey: ["comments", postId],
    queryFn: () => fetchCommentsByPost(postId),
  });
};

// 댓글 작성
export const useCreateComment = (postId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CommentRequest) => createComment(postId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });
};

// 댓글 삭제
export const useDeleteComment = (postId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (commentId: number) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });
};

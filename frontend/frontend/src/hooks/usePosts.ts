import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchPosts,
  fetchPostById,
  createPost,
  deletePost,
} from "../api/postApi";
import type { Post } from "../types/post";

export const usePosts = () => {
  return useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
};

export const usePost = (id: number) => {
  return useQuery<Post>({
    queryKey: ["posts", id],
    queryFn: () => fetchPostById(id),
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

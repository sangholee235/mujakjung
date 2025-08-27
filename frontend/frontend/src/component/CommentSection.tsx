import { useState } from "react";
import {
  useComments,
  useCreateComment,
  useDeleteComment,
} from "../hooks/useComments";
import type { CommentResponse } from "../types/commentApi";

interface Props {
  postId: number;
  currentUser: { id: number; nickname: string } | null;
}

export default function CommentSection({ postId, currentUser }: Props) {
  const { data: comments = [], isLoading } = useComments(postId);
  const createMutation = useCreateComment(postId);
  const deleteMutation = useDeleteComment(postId);
  const [content, setContent] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return alert("로그인이 필요합니다.");
    if (!content.trim()) return;

    createMutation.mutate({ content });
    setContent("");
  };

  const handleDelete = (commentId: number) => {
    if (!currentUser) return;
    if (!confirm("댓글을 삭제하시겠습니까?")) return;
    deleteMutation.mutate(commentId);
  };

  if (isLoading) return <div>댓글 불러오는 중...</div>;

  console.log(currentUser);

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-4">댓글</h2>

      {/* 댓글 작성 폼 */}
      {currentUser && (
        <form onSubmit={handleCreate} className="flex mb-4 space-x-2">
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="댓글을 입력하세요"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            등록
          </button>
        </form>
      )}

      {/* 댓글 리스트 */}
      <ul className="space-y-3">
        {comments.map((c: CommentResponse) => (
          <li
            key={c.id}
            className="bg-gray-50 p-3 rounded-lg flex justify-between items-start"
          >
            <div>
              <span className="font-semibold">{c.userNickname}</span>
              <p className="text-gray-700">{c.content}</p>
              <span className="text-xs text-gray-400">
                {new Date(c.createdAt).toLocaleString()}
              </span>
            </div>
            {currentUser?.id === c.userId && (
              <button
                onClick={() => handleDelete(c.id)}
                className="text-red-500 hover:text-red-700 text-sm ml-2"
              >
                삭제
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

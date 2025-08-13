// src/components/PostItem.tsx
import type { Post } from "../types/post";
import { useDeletePost } from "../hooks/usePosts";

type Props = {
  post: Post;
};

export default function PostItem({ post }: Props) {
  const deleteMutation = useDeletePost();

  // localStorage에서 로그인한 사용자 정보 가져오기
  const storedUser = localStorage.getItem("user");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;

  const handleDelete = () => {
    if (!currentUser) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (confirm("정말 삭제하시겠습니까?")) {
      deleteMutation.mutate(post.id);
    }
  };

  return (
    <li className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <h2 className="text-xl font-semibold text-blue-600 mb-2">{post.title}</h2>
      <p className="text-gray-700 mb-4 whitespace-pre-wrap">{post.content}</p>
      <small className="text-gray-400 block mb-3">
        {post.authorNickname} | {new Date(post.createdAt).toLocaleString()}
      </small>

      {/* 로그인한 사용자와 글 작성자가 같으면 삭제 버튼 표시 */}
      {currentUser && currentUser.id === post.userId && (
        <button
          onClick={handleDelete}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
          disabled={deleteMutation.isPending} // 삭제 진행 중이면 비활성화
        >
          {deleteMutation.isPending ? "삭제 중..." : "삭제"}
        </button>
      )}
    </li>
  );
}

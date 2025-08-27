import { useParams, useNavigate } from "react-router-dom";
import { usePost, useDeletePost } from "../hooks/usePosts";
import CommentSection from "../component/CommentSection";

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id) return <div>잘못된 접근입니다.</div>;

  const { data: post, isLoading, isError, error } = usePost(Number(id));
  const deleteMutation = useDeletePost();

  // 현재 로그인 사용자
  const storedUser = localStorage.getItem("user");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;

  // 로딩
  if (isLoading) {
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  }

  // 에러 처리
  if (isError) {
    // @ts-ignore
    const status = error.response?.status;

    if (status === 404) {
      return (
        <div className="text-center mt-10 text-gray-500">
          글이 존재하지 않습니다.
          <br />
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            목록으로 돌아가기
          </button>
        </div>
      );
    }

    return (
      <div className="text-center mt-10 text-red-500">글 불러오기 실패</div>
    );
  }

  // 글이 없는 경우
  if (!post) {
    return (
      <div className="text-center mt-10 text-gray-500">
        글이 존재하지 않습니다.
        <br />
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          목록으로 돌아가기
        </button>
      </div>
    );
  }

  // 삭제 핸들러
  const handleDelete = () => {
    if (!currentUser) {
      alert("로그인이 필요합니다.");
      return;
    }
    if (confirm("정말 삭제하시겠습니까?")) {
      deleteMutation.mutate(post.id, { onSuccess: () => navigate("/") });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      {/* 글 내용 */}
      <h1 className="text-3xl font-bold mb-3 text-gray-800">{post.title}</h1>
      <div className="text-sm text-gray-400 mb-6">
        {post.authorNickname} · {new Date(post.createdAt).toLocaleString()}
      </div>
      <p className="text-gray-700 mb-8 whitespace-pre-wrap">{post.content}</p>

      {/* 글 조작 버튼 */}
      <div className="flex space-x-3 mb-8">
        <button
          onClick={() => navigate("/")}
          className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
        >
          목록
        </button>

        {currentUser && currentUser.id === post.userId && (
          <button
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="px-5 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors disabled:bg-red-300"
          >
            {deleteMutation.isPending ? "삭제 중..." : "삭제"}
          </button>
        )}
      </div>

      {/* 댓글 섹션 */}
      <CommentSection postId={post.id} currentUser={currentUser} />
    </div>
  );
}

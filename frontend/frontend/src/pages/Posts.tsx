import { useNavigate } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";
import PostItem from "../component/PostItem";

export default function Posts() {
  const { data: posts = [], isLoading, isError } = usePosts();
  const navigate = useNavigate();

  if (isLoading)
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  if (isError)
    return <div className="text-center mt-10 text-red-500">글 조회 실패</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">글 목록</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          onClick={() => navigate("/createpost")}
        >
          새 글 작성
        </button>
      </div>
      <ul className="space-y-6">
        {posts.map((p) => (
          <PostItem key={p.id} post={p} />
        ))}
      </ul>
    </div>
  );
}

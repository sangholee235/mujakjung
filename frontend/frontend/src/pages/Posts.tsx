import { usePosts } from "../hooks/usePosts";
import PostItem from "../component/PostItem";

export default function Posts() {
  const { data: posts = [], isLoading, isError } = usePosts();

  if (isLoading)
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  if (isError)
    return <div className="text-center mt-10 text-red-500">글 조회 실패</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">글 목록</h1>
      <ul className="space-y-6">
        {posts.map((p) => (
          <PostItem key={p.id} post={p} />
        ))}
      </ul>
    </div>
  );
}

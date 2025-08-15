import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreatePost } from "../hooks/usePosts";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const createPost = useCreatePost();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createPost.mutate(
      { title, content },
      {
        onSuccess: () => {
          alert("글 작성 완료");
          navigate("/"); // 작성 후 홈으로 이동
        },
        onError: () => {
          alert("글 작성 실패");
        },
      }
    );
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600">
          새 글 작성
        </h2>

        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <textarea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
          disabled={createPost.isPending}
        >
          {createPost.isPending ? "작성 중..." : "작성"}
        </button>
      </form>
    </div>
  );
}

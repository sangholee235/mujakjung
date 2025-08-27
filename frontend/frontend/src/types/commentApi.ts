// 댓글 작성 요청
export interface CommentRequest {
  content: string;
}

// 댓글 응답
export interface CommentResponse {
  id: number;
  content: string;
  createdAt: string; // ISO 문자열로 오는 경우
  userId: number;
  userNickname: string;
  postId: number;
}

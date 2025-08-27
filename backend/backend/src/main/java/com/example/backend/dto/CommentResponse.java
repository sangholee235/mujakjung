package com.example.backend.dto;

import com.example.backend.entity.Comment;

public record CommentResponse(
        Long id,
        String content,
        String authorNickname,
        String createdAt,
        Long userId  // 추가
) {
    public static CommentResponse from(Comment comment) {
        return new CommentResponse(
                comment.getId(),
                comment.getContent(),
                comment.getUser().getNickname(),
                comment.getCreatedAt().toString(),
                comment.getUser().getId()  // 여기서 내려줌
        );
    }
}

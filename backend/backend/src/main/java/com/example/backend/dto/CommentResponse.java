package com.example.backend.dto;

import com.example.backend.entity.Comment;

import java.time.LocalDateTime;

public record CommentResponse(Long id, String content, String authorNickname, LocalDateTime createdAt) {
    public static CommentResponse from(Comment comment) {
        return new CommentResponse(
                comment.getId(),
                comment.getContent(),
                comment.getUser().getNickname(),
                comment.getCreatedAt()
        );
    }
}

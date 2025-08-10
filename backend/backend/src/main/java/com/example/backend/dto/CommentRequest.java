package com.example.backend.dto;

public record CommentRequest(
        Long userId,
        Long postId,
        String content
) {}

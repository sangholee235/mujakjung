package com.example.backend.dto;

import com.example.backend.entity.Post;
import java.time.LocalDateTime;

public record PostResponse(
        Long id,
        String title,
        String content,
        String authorNickname,
        Long userId,           // ← 작성자 ID 추가
        LocalDateTime createdAt
) {
    public static PostResponse from(Post post) {
        return new PostResponse(
                post.getId(),
                post.getTitle(),
                post.getContent(),
                post.getUser().getNickname(), // authorNickname
                post.getUser().getId(),       // userId
                post.getCreatedAt()
        );
    }
}

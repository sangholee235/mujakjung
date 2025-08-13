package com.example.backend.dto;

import com.example.backend.entity.User;

public record UserResponse(Long id, String username, String nickname) {
    public static UserResponse from(User user) {
        return new UserResponse(user.getId(), user.getUsername(), user.getNickname());
    }
}

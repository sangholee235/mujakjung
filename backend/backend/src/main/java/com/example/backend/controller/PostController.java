package com.example.backend.controller;

import com.example.backend.dto.PostRequest;
import com.example.backend.dto.PostResponse;
import com.example.backend.entity.Post;
import com.example.backend.entity.User;
import com.example.backend.repository.PostRepository;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostRepository postRepository;

    // 전체 글 조회
    @GetMapping
    public List<PostResponse> getAll() {
        return postRepository.findAll()
                .stream()
                .map(PostResponse::from)
                .collect(Collectors.toList());
    }

    // 단일 글 조회
    @GetMapping("/{id}")
    public PostResponse getOne(@PathVariable Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Post not found"));
        return PostResponse.from(post);
    }

    // 글 작성
    @PostMapping
    public PostResponse create(@RequestBody PostRequest request, HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized");
        }

        Post post = Post.builder()
                .user(user)
                .title(request.title())
                .content(request.content())
                .createdAt(LocalDateTime.now())
                .build();

        Post saved = postRepository.save(post);
        return PostResponse.from(saved);
    }

    // 글 삭제
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id, HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized");
        }

        Post post = postRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Post not found"));

        if (!post.getUser().getId().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Forbidden");
        }

        postRepository.delete(post);
    }
}

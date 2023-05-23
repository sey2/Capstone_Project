package com.example.trymatch.board;

import com.example.trymatch.repository.ClubMemberRepository;
import com.example.trymatch.security.entity.ClubMember;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostController {
    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    // READ
    // 모든 게시물을 반환함
    @GetMapping
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    // READ
    // ID를 통해서 게시글을 하나만 반환한다.
    @GetMapping("/{postId}")
    public ResponseEntity<Post> getPostById(@PathVariable Long postId) {
        Post post = postService.getPostById(postId);
        if (post != null) {
            return ResponseEntity.ok(post);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // CREATE
    // post와 user의 이메일을 받아서 Post 객체를 생성 후 반환
    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody Post post, @RequestParam String email) {
        Post createPost = this.postService.createPost(post, email);
        return new ResponseEntity<>(createPost, HttpStatus.CREATED);
    }

    // UPDATE
    // 포스트 ID와 업데이트한 포스트를 받음
    @PutMapping("/{postId}")
    public ResponseEntity<Post> updatePost(@PathVariable Long postId, @RequestBody Post updatedPost) {
        Post updatedPostEntity = postService.updatePost(postId, updatedPost);
        if (updatedPostEntity != null) {
            return ResponseEntity.ok(updatedPostEntity);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("{postId}")
    public ResponseEntity<String> deletePost(@PathVariable Long postId) {
        boolean isDelete = this.postService.delete(postId);
        if (isDelete) {
            return ResponseEntity.ok("게시물이 삭제되었습니다.");
        } else{
            return ResponseEntity.notFound().build();
        }
    }
}

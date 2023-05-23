package com.example.trymatch.board;

import com.example.trymatch.comment.Comment;
import com.example.trymatch.comment.CommentService;
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
    private final CommentService commentService;

    @Autowired
    public PostController(PostService postService, CommentService commentService) {
        this.postService = postService;
        this.commentService = commentService;
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
    @PostMapping("/{postId}/comments")
    public ResponseEntity<Comment> createComment(
            @PathVariable Long postId, @RequestBody Comment comment, @RequestParam("memberEmail") String memberEmail) {
        // TODO: 댓글 작성 함수
        Comment createdComment = this.commentService.createComment(postId,memberEmail,comment);
        if(createdComment != null){ // 댓글 작성 성공
            return ResponseEntity.ok(createdComment); // 만든 댓글을 리턴해줌
        }else{ // 댓글 작성 실패
            return ResponseEntity.notFound().build();
        }
    }

}

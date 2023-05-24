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

    // DELETE
    // postId의 게시글을 삭제함
    @DeleteMapping("{postId}")
    public ResponseEntity<String> deletePost(@PathVariable Long postId) {
        boolean isDelete = this.postService.delete(postId);
        if (isDelete) {
            return ResponseEntity.ok("게시물이 삭제되었습니다.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // CREATE
    // 댓글을 생성해줌
    @PostMapping("/{postId}/comments")
    public ResponseEntity<Comment> createComment(
            @PathVariable Long postId, @RequestBody Comment comment, @RequestParam("memberEmail") String memberEmail) {
        // TODO: 댓글 작성 함수
        Comment createdComment = this.commentService.createComment(postId, memberEmail, comment);
        if (createdComment != null) { // 댓글 작성 성공
            return ResponseEntity.ok(createdComment); // 만든 댓글을 리턴해줌
        } else { // 댓글 작성 실패
            return ResponseEntity.notFound().build();
        }
    }

    // READ
    // 댓글 목록을 받아옴
    @GetMapping("/{postId}/comments")
    public ResponseEntity<List<Comment>> getCommentsByPostId(@PathVariable Long postId) {
        List<Comment> comments = this.commentService.getCommentsByPostId(postId);
        if (!comments.isEmpty()) {
            return ResponseEntity.ok(comments);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // UPDATE
    // 댓글을 수정함
    @PutMapping("/comments/{commentId}")
    public ResponseEntity<Comment> updateComment(@PathVariable Long commentId, @RequestBody Comment updatedComment) {
        Comment updatedCommentEntity = this.commentService.updateComment(commentId, updatedComment.getContent());
        if (updatedCommentEntity != null) {
            return ResponseEntity.ok(updatedCommentEntity);
        }
        return ResponseEntity.notFound().build();
    }

    // DELETE
    // 댓글을 제거함
    @DeleteMapping("/comments/{commentId}")
    public ResponseEntity<String> deleteComment(@PathVariable Long commentId) {
        boolean isDeleted = this.commentService.deleteComment(commentId);
        if (isDeleted) {
            return ResponseEntity.ok("댓글이 삭제되었습니다.");
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    // 게시물 추천 기능
    @PutMapping("/{postId}/recommend")
    public ResponseEntity<Boolean> toggleRecommendation(@PathVariable Long postId, @RequestParam String memberEmail) {
        boolean toggle = postService.recommendPost(postId, memberEmail);
        return ResponseEntity.ok(toggle);
    }
}

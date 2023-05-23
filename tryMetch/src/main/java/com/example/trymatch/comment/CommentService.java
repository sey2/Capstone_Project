package com.example.trymatch.comment;

import com.example.trymatch.board.Post;
import com.example.trymatch.board.PostRepository;
import com.example.trymatch.repository.ClubMemberRepository;
import com.example.trymatch.security.entity.ClubMember;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final ClubMemberRepository clubMemberRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository, PostRepository postRepository, ClubMemberRepository clubMemberRepository) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
        this.clubMemberRepository = clubMemberRepository;
    }

    /*
        CREATE
        댓글 저장
        @param Long String Comment
        return
     */
    public Comment createComment(Long postId, String memberEmail, Comment comment) {

        Optional<Post> postOptional = postRepository.findById(postId); // Post 객체를 가져옴
        Optional<ClubMember> memberOptional = clubMemberRepository.findByEmail(memberEmail, false); // 댓글 작성자 객체를 가져옴

        // 둘 다 존재 할 시
        if (postOptional.isPresent() && memberOptional.isPresent()) {
            // 게시글과 정보를 가져옴
            Post post = postOptional.get();
            ClubMember member = memberOptional.get();

            // commetn의 post와 member의 정보를 설정
            comment.setPost(post);
            comment.setMember(member);

            // commentRepo의 저장함
            return this.commentRepository.save(comment);
        }
        // 존재 안한다면 null 리턴
        return null;
    }

    /*
        READ
        댓글 목록 조회
        @param Long
        return
     */
    public List<Comment> getCommentsByPostId(Long postId) {
        return this.commentRepository.findByPostId(postId);
    }

    /*
        UPDATE
        댓글 수정
        @param Long Comment
        return
     */
    public Comment updateComment(Long commentId, String updatedContent) {
        Optional<Comment> commentOptional = this.commentRepository.findById(commentId);
        if (commentOptional.isPresent()) {
            Comment comment = commentOptional.get();
            comment.setContent(updatedContent);
            return commentRepository.save(comment);
        }
        return null;
    }

    /*
        DELETE
        댓글 삭제
        @param Long
        return
     */
    public boolean deleteComment(Long commentId) {
        // 댓글을 불러옴
        Optional<Comment> commentOptional = this.commentRepository.findById(commentId);

        if (commentOptional.isPresent()) { // 댓글이 존재한다면
            commentRepository.deleteById(commentId);
            return true;
        }
        // 댓글이 존재하지않는다면
            return false;
    }

}

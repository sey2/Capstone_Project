package com.example.trymatch.comment;

import com.example.trymatch.board.Post;
import com.example.trymatch.board.PostRepository;
import com.example.trymatch.repository.ClubMemberRepository;
import com.example.trymatch.security.entity.ClubMember;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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


}

package com.example.trymatch.comment;

import com.example.trymatch.board.Post;
import com.example.trymatch.security.entity.ClubMember;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 댓글 id

    @Column(nullable = false)
    private String content;

    @ManyToOne
    @JoinColumn(name = "post_id") //포스트의 key와 연결
    private Post post;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private ClubMember member;
}

package com.example.trymatch.board;

import com.example.trymatch.security.entity.ClubMember;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Post{
    //게시판을 나타냄

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 게시글 번호

    // 제목의 길이는 최대 40 널값은 허용 안함
    @Column(length = 40,nullable = false)
    private String title;

    // 게시글 내용의 널값은 허용 안함
    @Column(nullable = false)
    private String content; // 게시글 내용

    @ManyToOne
    private ClubMember clubMember;
}

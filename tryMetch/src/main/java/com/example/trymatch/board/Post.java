//package com.example.trymatch.board;
//
//import jakarta.persistence.*;
//import lombok.Getter;
//import lombok.Setter;
//
//import java.time.LocalDateTime;
//
//@Entity
//@Getter
//@Setter
//public class Post {
//    //게시판을 나타냄
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id; // 게시글 번호
//
//    // 제목의 길이는 200으로 제한
//    @Column(length = 200)
//    private String title;
//
//
//    @Column(columnDefinition = "TEXT")
//    private String content; // 게시글 내용
//
//    // 글 작성 날짜
//    private LocalDateTime createDate;
//}

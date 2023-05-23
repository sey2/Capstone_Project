//package com.example.trymatch.board;
//
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.web.client.TestRestTemplate;
//import org.springframework.http.*;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//
//@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
//public class PostControllerTest {
//
//    @Autowired
//    private TestRestTemplate restTemplate;
//
//    @Test
//    public void createPostTest() {
//        String url = "/api/posts";
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//
//        String requestBody = "{\"id\": 1, \"title\": \"제목\", \"content\": \"내용\"}";
//        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);
//
//        ResponseEntity<Post> responseEntity = restTemplate.exchange(url, HttpMethod.POST, requestEntity, Post.class);
//
//        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
//
//        Post createdPost = responseEntity.getBody();
//        assertEquals(1L, createdPost.getId());
//        assertEquals("제목", createdPost.getTitle());
//        assertEquals("내용", createdPost.getContent());
//    }
//}
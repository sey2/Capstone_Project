package com.example.trymatch.board;

import com.example.trymatch.repository.ClubMemberRepository;
import com.example.trymatch.security.entity.ClubMember;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class PostService {
    private final ClubMemberRepository clubMemberRepository;
    private final PostRepository postRepository;

    @Autowired
    public PostService(ClubMemberRepository clubMemberRepository, PostRepository postRepository) {
        this.clubMemberRepository = clubMemberRepository;
        this.postRepository = postRepository;
    }

    /*
        모든 게시물 조회
        return
     */
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    /*
        게시물 갯수
        return
     */
    public Integer getCount(){
        return (int) postRepository.count();
    }

    /*
    * 게시글 ID로 조회
    * @param id
    * return
    * */
    public Post getPostById(Long id) {
        Optional<Post> postOptional = postRepository.findById(id);
        return postOptional.orElse(null);
    }

    /*
        게시글 저장
        @param Post String
        return
     */
    public Post createPost(Post post, String Email) {
        // User 정보 가져오기
        Optional<ClubMember> member = clubMemberRepository.findByName(Email);

        // User 정보가 존재하는 경우에만 게시물 작성자로 설정
        if (member.isPresent()) {
            post.setClubMember(member.get());
        }
        return postRepository.save(post);
    }

    /*
        게시글 수정
        @param Long Post
        return
     */
    public Post updatePost(Long postId, Post updatedPost) {
        Post post = this.getPostById(postId);

        // 기존 포스트가 있다면
        if (post != null) {
            // 제목과 내용을 수정한 것으로 변경
            post.setTitle(updatedPost.getTitle());
            post.setContent(updatedPost.getContent());


            return this.postRepository.save(post);
        }
        // 기존 포스트가 없다면
        return null;

    }

    /*
        게시글 삭제
        @param id
        return
     */
    public boolean delete(Long postId) {
        Optional<Post> postOptional = this.postRepository.findById(postId);
        if (postOptional.isPresent()) {
            this.postRepository.deleteById(postId);
            return true;
        } else{
            return false;
        }
    }

    /*
        게시글 추천
        @param Long Long
        return
     */
    public boolean recommendPost(Long postId, String memberEmail) {
        Optional<Post> postOptional = this.postRepository.findById(postId);
        Optional<ClubMember> memberOptional = this.clubMemberRepository.findByEmail(memberEmail,false);

        if (postOptional.isPresent() && memberOptional.isPresent()) {
            Post post = postOptional.get();
            ClubMember member = memberOptional.get();
            Set<ClubMember> recommendedByMembers = post.getRecommendedByMembers();

            if (recommendedByMembers.contains(member)) {
                recommendedByMembers.remove(member);
                post.setRecommendationCount(post.getRecommendationCount() - 1);
                postRepository.save(post);
                return false;
            } else {
                recommendedByMembers.add(member);
                post.setRecommendationCount(post.getRecommendationCount() + 1);
                postRepository.save(post);
                return true;
            }
        }
        return false;
    }
}


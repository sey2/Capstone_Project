package com.example.trymatch.security;

import com.example.trymatch.repository.ClubMemberRepository;
import com.example.trymatch.security.entity.ClubMember;
import com.example.trymatch.security.entity.ClubMemberRole;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import java.util.stream.IntStream;

@SpringBootTest
public class ClubMemberTests {

    @Autowired
    private ClubMemberRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // 회원 계정 생성 테스트
    @Test
    public void insertDummies(){
        // 1 - 80 까지는 USER만 지정
        // 81 - 90 까지는 USER,MANAGER
        // 91 - 100 까지는 USER,MANAGER, ADMIN

        IntStream.rangeClosed(1, 100).forEach(i -> {
            ClubMember clubMember = ClubMember.builder()
                    .email("user" + i + "@zerock.org")
                    .name("사용자"+i)
                    .fromSocial(false)
                    .password(passwordEncoder.encode("1111"))
                    .build();

            // default role
            clubMember.addMemberRole(ClubMemberRole.USER);

            if(i > 80)
                clubMember.addMemberRole(ClubMemberRole.MANAGER);
            else if(i > 90)
                clubMember.addMemberRole(ClubMemberRole.ADMIN);

            repository.save(clubMember);
        });
    }

    @Test
    public void testRead(){
        Optional<ClubMember> result = repository.findByEmail("user95@zerock.org", false);

        ClubMember clubMember = result.get();

        System.out.println(clubMember);
    }
}
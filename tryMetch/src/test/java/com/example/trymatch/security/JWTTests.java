package com.example.trymatch.security;

import com.example.trymatch.security.util.JWTUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class JWTTests {

    private JWTUtil jwtUtil;
    @BeforeEach
    public void testBefore(){
        System.out.println("testBefore.......................");
        jwtUtil = new JWTUtil();
    }

    @Test
    public void testEncode() throws Exception{
        String email = "user95@zerock.org";
        String str = jwtUtil.generateToken(email);

        System.out.println(str);
    }
}
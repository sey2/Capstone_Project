package com.example.trymatch.security.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;

import java.io.IOException;

@Log4j2
public class ApiLoginFilter extends AbstractAuthenticationProcessingFilter {

    public ApiLoginFilter(String defaultFilterProcessUrl){
        super(defaultFilterProcessUrl);
    }

//    @Override
//    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
//        throws AuthenticationException, IOException, ServletException{
//        log.info("--------------------ApiLoginFilter---------------------");
//        log.info("attemptAuthentication");
//
//        String email = request.getParameter("email");
//        String pw = "1111";
//
//        if(email == null)
//            throw new BadCredentialsException("email can not be null");
//
//        return null;
//    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
                                                HttpServletResponse response)
            throws AuthenticationException, IOException, ServletException{
        log.info("----------------------ApiLoginFilter-----------------------");
        log.info("attemptAuthentication");

        String email = request.getParameter("email");
        String pw = request.getParameter("pw");

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(email, pw);

        return getAuthenticationManager().authenticate(authToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException{
        log.info("-------------------------ApiLoginFilter----------------");
        log.info("successfulAuthentication: " + authResult);

        log.info(authResult.getPrincipal());
    }


}
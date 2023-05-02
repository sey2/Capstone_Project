package com.example.trymatch.security.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;
import net.minidev.json.JSONObject;
import org.springframework.util.AntPathMatcher;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.io.PrintWriter;



@Log4j2
public class ApiCheckFilter extends OncePerRequestFilter {

    private AntPathMatcher antPathMatcher;
    private String pattern;

    public ApiCheckFilter(String pattern){
        this.antPathMatcher = new AntPathMatcher();
        this.pattern = pattern;
    }

    // 크롬 확장 프로그램으로 GET, POST 보내서 정상으로 응답하는지 확인
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException{
        log.info("REQUEST URI: " + request.getRequestURI());
        log.info(antPathMatcher.match(pattern, request.getRequestURI()));


        if(antPathMatcher.match(pattern, request.getRequestURI())){
            log.info("ApiCheckFilter.................................");
            log.info("ApiCheckFilter.................................");
            log.info("ApiCheckFilter.................................");

            boolean checkHeader = checkAuthHeader(request);

            if(checkHeader) // Authorization 헤더가 성공 적으로 받아지면
                filterChain.doFilter(request, response);
            else{       // 헤더 받기에 실패 했으면
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);

                // json 리턴 및 한글 깨짐 수정.
                response.setContentType("application/json;charset=utf-8");
                JSONObject json = new JSONObject();

                String message = "FAIL CHECK API TOKEN";
                json.put("code","403");
                json.put("message", message);

                PrintWriter out = response.getWriter();
                out.print(json);
                return;
            }

            return;

        }

        filterChain.doFilter(request, response);
    }

    // Authorization이라는 헤더의 값을 확인하고 boolean 타입의 결과를 반환한다.

    private boolean checkAuthHeader(HttpServletRequest request){
        boolean checkResult = false;

        String authHeader = request.getHeader("Authorization");

        if(StringUtils.hasText(authHeader)){
            log.info("Authorization exist: " + authHeader);

            if(authHeader.equals("12345678"))
                checkResult = true;
        }

        return checkResult;
    }

}
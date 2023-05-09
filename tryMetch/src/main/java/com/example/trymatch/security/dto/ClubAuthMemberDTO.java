package com.example.trymatch.security.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Map;

@Log4j2
@Getter
@Setter
@ToString
public class ClubAuthMemberDTO extends User implements OAuth2User {
    public ClubAuthMemberDTO(String username, String password, boolean fromSocial,String mbti, String profile,
                             Collection<? extends GrantedAuthority> authorities, Map<String, Object> attr) {
        this(username,password, fromSocial, mbti, profile, authorities);
        this.attr = attr;
    }

    private String email;

    private String password;
    private String name;
    private boolean fromSocial;

    private String mbti;
    private String profile;

    private Map<String, Object> attr;

    public ClubAuthMemberDTO(
            String username,
            String password,
            boolean fromSocial,
            String mbti,
            String profile,
            Collection<? extends GrantedAuthority> authorities
    ){
        super(username,password,authorities);
        this.email = username;
        this.mbti = mbti;
        this.password = password;
        this.fromSocial = fromSocial;
        this.attr = attr;
    }

    @Override
    public Map<String,Object> getAttributes(){
        return this.attr;
    }
}

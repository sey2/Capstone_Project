package com.example.trymatch.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class PageController {

    @GetMapping("/login")
    public String login(){
        return "sample/login";
    }

    @GetMapping("/SignUp")
    public String signup(){return "sample/SignUp";}
}
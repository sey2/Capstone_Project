package com.example.trymatch.controller;

import com.example.trymatch.gpt.ChatGptResponseDto;
import com.example.trymatch.gpt.ChatGptService;
import com.example.trymatch.gpt.QuestionRequestDto;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:8081/")
@RestController
@RequestMapping("/chat-gpt")
public class ChatGptController {

    private final ChatGptService chatGptService;

    public ChatGptController(ChatGptService chatGptService) {
        this.chatGptService = chatGptService;
    }

    @PostMapping("/question")
    public ChatGptResponseDto sendQuestion(@RequestBody QuestionRequestDto requestDto) {
        return chatGptService.askQuestion(requestDto);
    }
}
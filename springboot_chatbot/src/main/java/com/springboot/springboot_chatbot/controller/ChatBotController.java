package com.springboot.springboot_chatbot.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.springboot_chatbot.dto.PromptRequest;
import com.springboot.springboot_chatbot.service.ChatBotService;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/chat")
public class ChatBotController {
	private final ChatBotService chatBotService;
	
	public ChatBotController(ChatBotService chatBotService) {
		this.chatBotService=chatBotService;
	}
	
	@PostMapping
public String chat(@RequestBody PromptRequest promptRequest) {
	return chatBotService.getChatResponse(promptRequest);
}
}

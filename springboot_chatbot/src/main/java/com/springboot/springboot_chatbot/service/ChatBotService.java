package com.springboot.springboot_chatbot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.springboot.springboot_chatbot.dto.ChatBotRequest;
import com.springboot.springboot_chatbot.dto.ChatBotResponse;
import com.springboot.springboot_chatbot.dto.PromptRequest;

@Service
public class ChatBotService {
	private final RestClient restClient;

	@Autowired
	public ChatBotService(RestClient restClient) {
		this.restClient = restClient;
	}

	@Value("${openapi.api.key}")
	private String apiKey;

	@Value("${openapi.api.model}")
	private String model;

	public String getChatResponse(PromptRequest promptRequest) {
		ChatBotRequest chatBotRequest = new ChatBotRequest(model,
				List.of(new ChatBotRequest.Message("user", promptRequest.prompt())));

		ChatBotResponse response = restClient.post()
				.header("Authorization", "Bearer " + apiKey)
				.header("Content-Type", "application/json")
				.body(chatBotRequest)
				.retrieve()
				.body(ChatBotResponse.class);
		return response.choices().get(0).message().content();
	}

}

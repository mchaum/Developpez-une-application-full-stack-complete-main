package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.repository.TopicRepository;
import com.openclassrooms.mddapi.service.TopicService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.StreamSupport;

@RestController
@SecurityRequirement(name = "bearerAuth")
@RequestMapping("/topics")
public class TopicController {

    private final TopicService topicService;

    public TopicController(TopicService topicService) {
        this.topicService = topicService;
    }
    
    @GetMapping
    public ResponseEntity<List<Topic>> getAllTopics() {
        Iterable<Topic> topicsIterable = topicService.getAllTopics();

        List<Topic> topics = StreamSupport
                .stream(topicsIterable.spliterator(), false)
                .toList();

        return ResponseEntity.ok(topics);
    }
}

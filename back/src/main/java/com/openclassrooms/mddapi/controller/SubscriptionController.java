package com.openclassrooms.mddapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.service.SubscriptionService;

import java.util.List;

@RestController
@RequestMapping("/subscriptions")
public class SubscriptionController {

    @Autowired
    private SubscriptionService subscriptionService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<Topic>> getUserSubscriptions(@PathVariable Long userId) {
        List<Topic> subscriptions = subscriptionService.getSubscriptionsByUserId(userId);
        return ResponseEntity.ok(subscriptions);
    }

    @PostMapping
    public ResponseEntity<Void> subscribeToTheme(
            @RequestParam Long userId,
            @RequestParam Long themeId) {
        subscriptionService.subscribeToTheme(userId, themeId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> unsubscribeFromTheme(
            @RequestParam Long userId,
            @RequestParam Long themeId) {
        subscriptionService.unsubscribeFromTheme(userId, themeId);
        return ResponseEntity.noContent().build();
    }
}


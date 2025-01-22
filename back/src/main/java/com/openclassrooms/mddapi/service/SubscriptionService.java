package com.openclassrooms.mddapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.model.Subscribe;
import com.openclassrooms.mddapi.model.SubscribeId;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.SubscriptionRepository;
import com.openclassrooms.mddapi.repository.TopicRepository;
import com.openclassrooms.mddapi.repository.UserRepository;

import java.util.List;

@Service
public class SubscriptionService {

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TopicRepository topicRepository;

    public List<Topic> getSubscriptionsByUserId(Long userId) {
        return subscriptionRepository.findSubscriptionsByUserId(userId);
    }

    public void subscribeToTheme(Long userId, Long themeId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Topic theme = topicRepository.findById(themeId)
                .orElseThrow(() -> new RuntimeException("Theme not found"));

        Subscribe subscription = new Subscribe(user, theme);
        subscriptionRepository.save(subscription);
    }

    public void unsubscribeFromTheme(Long userId, Long themeId) {
        SubscribeId id = new SubscribeId(userId, themeId);
        subscriptionRepository.deleteById(id);
    }
}

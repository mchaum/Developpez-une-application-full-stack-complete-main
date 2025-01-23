package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.DTO.ArticleDTO;
import com.openclassrooms.mddapi.model.Article;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.ArticleRepository;
import com.openclassrooms.mddapi.repository.TopicRepository;
import com.openclassrooms.mddapi.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ArticleService {
    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;
    private final TopicRepository topicRepository;

    public ArticleService(ArticleRepository articleRepository, UserRepository userRepository, TopicRepository topicRepository) {
        this.articleRepository = articleRepository;
        this.userRepository = userRepository;
        this.topicRepository = topicRepository;
    }

    public List<ArticleDTO> findAll() {
        return articleRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public ArticleDTO getById(Long id) {
        return articleRepository.findById(id)
                .map(this::toDTO)
                .orElse(null);
    }

    public Article create(ArticleDTO articleDTO) {
        Article article = toEntity(articleDTO);
        return articleRepository.save(article);
    }

    public ArticleDTO toDTO(Article article) {
        ArticleDTO dto = new ArticleDTO();
        dto.setId(article.getId());
        dto.setTitle(article.getTitle());
        dto.setDescription(article.getDescription());
        dto.setUserId(article.getUser().getId());
        dto.setThemeId(article.getTheme().getId());
        dto.setThemeName(article.getTheme().getTitle());
        dto.setAuthorName(article.getUser().getUsername()); 
        dto.setCreatedAt(article.getCreatedAt());
        return dto;
    }

    private Article toEntity(ArticleDTO dto) {
        Article article = new Article();
        article.setTitle(dto.getTitle());
        article.setDescription(dto.getDescription());
        article.setCreatedAt(dto.getCreatedAt() != null ? dto.getCreatedAt() : LocalDateTime.now());

        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("Utilisateur avec ID " + dto.getUserId() + " non trouvé"));
        article.setUser(user);

        Topic theme = topicRepository.findById(dto.getThemeId())
                .orElseThrow(() -> new RuntimeException("Thème avec ID " + dto.getThemeId() + " non trouvé"));
        article.setTheme(theme);

        return article;
    }
}

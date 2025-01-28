package com.openclassrooms.mddapi.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.DTO.CommentDTO;
import com.openclassrooms.mddapi.model.Article;
import com.openclassrooms.mddapi.model.Comment;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.ArticleRepository;
import com.openclassrooms.mddapi.repository.CommentRepository;
import com.openclassrooms.mddapi.repository.UserRepository;



@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final ArticleRepository articleRepository;

    public CommentService(CommentRepository commentRepository, UserRepository userRepository, ArticleRepository articleRepository) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.articleRepository = articleRepository;
    }

    public List<CommentDTO> findByArticleId(Long articleId) {
        return commentRepository.findByArticleId(articleId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public Comment create(CommentDTO commentDTO) {
        Comment comment = toEntity(commentDTO);
        return commentRepository.save(comment);
    }

    public CommentDTO toDTO(Comment comment) {
        CommentDTO dto = new CommentDTO();
        dto.setId(comment.getId());
        dto.setDescription(comment.getDescription());
        dto.setCreatedAt(comment.getCreatedAt());
        dto.setUserId(comment.getUser().getId());
        dto.setUsername(comment.getUser().getUsername()); 
        dto.setArticleId(comment.getArticle().getId());
        return dto;
    }

    private Comment toEntity(CommentDTO dto) {
        Comment comment = new Comment();
        comment.setDescription(dto.getDescription());
        comment.setCreatedAt(dto.getCreatedAt() != null ? dto.getCreatedAt() : LocalDateTime.now());

        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("Utilisateur avec ID " + dto.getUserId() + " non trouvé"));
        comment.setUser(user);

        Article article = articleRepository.findById(dto.getArticleId())
                .orElseThrow(() -> new RuntimeException("Article avec ID " + dto.getArticleId() + " non trouvé"));
        comment.setArticle(article);

        return comment;
    }
}

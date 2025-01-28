package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.DTO.ArticleDTO;
import com.openclassrooms.mddapi.model.Article;
import com.openclassrooms.mddapi.service.ArticleService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Sort;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/articles")
public class ArticleController {
    private final ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @GetMapping
    public ResponseEntity<List<ArticleDTO>> findAll(@RequestParam(defaultValue = "desc") String sort) {
        Sort order = sort.equals("asc") ? Sort.by("createdAt").ascending() : Sort.by("createdAt").descending();
        List<ArticleDTO> articles = articleService.findAll(order);
        return ResponseEntity.ok(articles);
    }


    @GetMapping("/{id}")
    public ResponseEntity<ArticleDTO> findById(@PathVariable Long id) {
        ArticleDTO article = articleService.getById(id);
        if (article == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(article);
    }

    @PostMapping
    public ResponseEntity<ArticleDTO> create(@RequestBody ArticleDTO articleDTO) {
        try {
            Article newArticle = articleService.create(articleDTO);
            return ResponseEntity.ok(articleService.toDTO(newArticle));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
    
    
}

package com.openclassrooms.mddapi.DTO;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ArticleDTO {
    private Long id;
    private String title;
    private String description;
    private Long userId;
    private Long themeId;
    private String themeName;
    private String authorName;
    private LocalDateTime createdAt;
}


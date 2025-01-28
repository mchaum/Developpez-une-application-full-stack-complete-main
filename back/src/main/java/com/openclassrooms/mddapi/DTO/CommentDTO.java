package com.openclassrooms.mddapi.DTO;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class CommentDTO {
    private Long id;
    private Long userId;
    private Long articleId;
    private String description;
    private LocalDateTime createdAt;
    private String username;
}

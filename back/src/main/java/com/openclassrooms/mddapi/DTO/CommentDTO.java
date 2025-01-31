package com.openclassrooms.mddapi.DTO;

import lombok.Data;

@Data
public class CommentDTO {
    private Long userId;
    private Long articleId;
    private String description;
    private String username;
}
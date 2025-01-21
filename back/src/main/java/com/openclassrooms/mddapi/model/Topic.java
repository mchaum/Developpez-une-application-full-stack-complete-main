package com.openclassrooms.mddapi.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "THEMES")
public class Topic {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", nullable = false, length = 50)
    private String title;
    
    @Column(name = "description", nullable = false, length = 2000)
    private String description;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

}
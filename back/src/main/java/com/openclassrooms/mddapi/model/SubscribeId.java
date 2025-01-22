package com.openclassrooms.mddapi.model;

import java.io.Serializable;
import jakarta.persistence.*;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.util.Objects;

@Embeddable
public class SubscribeId implements Serializable {

    private static final long serialVersionUID = 1L; 

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "theme_id")
    private Long themeId;

    public SubscribeId() {}

    public SubscribeId(Long userId, Long themeId) {
        this.userId = userId;
        this.themeId = themeId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SubscribeId that = (SubscribeId) o;
        return Objects.equals(userId, that.userId) && Objects.equals(themeId, that.themeId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, themeId);
    }
}



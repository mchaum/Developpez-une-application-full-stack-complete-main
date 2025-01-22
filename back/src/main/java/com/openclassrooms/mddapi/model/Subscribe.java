package com.openclassrooms.mddapi.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "SUBSCRIBE")
public class Subscribe {

    @EmbeddedId
    private SubscribeId id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @MapsId("themeId")
    @JoinColumn(name = "theme_id")
    private Topic theme;

    public Subscribe() {}

    public Subscribe(User user, Topic theme) {
        this.user = user;
        this.theme = theme;
        this.id = new SubscribeId(user.getId(), theme.getId());
    }
}

package com.openclassrooms.mddapi.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.openclassrooms.mddapi.model.Subscribe;
import com.openclassrooms.mddapi.model.SubscribeId;
import com.openclassrooms.mddapi.model.Topic;

import java.util.List;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscribe, SubscribeId> {

    @Query("SELECT s.theme FROM Subscribe s WHERE s.user.id = :userId")
    List<Topic> findSubscriptionsByUserId(@Param("userId") Long userId);

    void deleteById(SubscribeId id);
}

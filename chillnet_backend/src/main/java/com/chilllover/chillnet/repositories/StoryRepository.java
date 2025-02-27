package com.chilllover.chillnet.repositories;

import com.chilllover.chillnet.entities.Story;
import com.chilllover.chillnet.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface StoryRepository extends JpaRepository<Story, Long> {
    List<Story> findByUserInAndCreatedAtAfter(List<User> followedUsers, LocalDateTime time);
    void deleteByCreatedAtBefore(LocalDateTime time);
}

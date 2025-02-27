package com.chilllover.chillnet.repositories;

import com.chilllover.chillnet.entities.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByReceiverIdOrderByCreatedAtDesc(Long receiverId);

    @Query("select n from Notification n where n.receiver.id = :userId and n.isRead = false")
    List<Notification> findUserUnreadNotifications(@Param("userId") Long userId);

    @Transactional
    @Modifying
    void deleteByPostId(Long postId);
}

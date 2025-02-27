package com.chilllover.chillnet.services.notification;

import com.chilllover.chillnet.dtos.NotificationDTO;
import com.chilllover.chillnet.entities.Notification;
import com.chilllover.chillnet.entities.User;

import java.util.List;

public interface NotificationService {
    Notification findById(Long notificationId) throws Exception;
    Notification sendNotification(NotificationDTO notificationDTO) throws Exception;
    List<Notification> getUserNotifications(Long userId);
    Notification markAsRead(Long notificationId) throws Exception;
    List<Notification> markAllAsRead(Long userId);
    void deleteNotification(Long notificationId, User reqUser) throws Exception;
    List<Notification> findUserUnreadNotifications(Long userId);
}

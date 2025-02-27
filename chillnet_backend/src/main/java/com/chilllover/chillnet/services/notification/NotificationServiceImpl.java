package com.chilllover.chillnet.services.notification;

import com.chilllover.chillnet.dtos.NotificationDTO;
import com.chilllover.chillnet.entities.Notification;
import com.chilllover.chillnet.entities.Post;
import com.chilllover.chillnet.entities.User;
import com.chilllover.chillnet.repositories.NotificationRepository;
import com.chilllover.chillnet.services.post.PostService;
import com.chilllover.chillnet.services.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService{
    private final NotificationRepository notificationRepository;
    private final UserService userService;
    private final PostService postService;

    @Override
    public Notification findById(Long notificationId) throws Exception {
        return notificationRepository.findById(notificationId)
                .orElseThrow(() -> new Exception("Notification not found"));
    }

    @Override
    public Notification sendNotification(NotificationDTO notificationDTO) throws Exception {
        User sender = userService.findUserById(notificationDTO.getSenderId());
        User receiver = userService.findUserById(notificationDTO.getReceiverId());
        Notification notification = Notification.builder()
                .sender(sender)
                .receiver(receiver)
                .content(notificationDTO.getContent())
                .createdAt(LocalDateTime.now())
                .type(notificationDTO.getType())
                .build();
        if(notificationDTO.getPostId() != null){
            Post post = postService.findPostById(notificationDTO.getPostId());
            notification.setPost(post);
        }
        return notificationRepository.save(notification);
    }

    @Override
    public List<Notification> getUserNotifications(Long userId) {
        return notificationRepository.findByReceiverIdOrderByCreatedAtDesc(userId);
    }

    @Override
    public Notification markAsRead(Long notificationId) throws Exception {
        Notification notification = findById(notificationId);
        notification.setRead(true);
        return notificationRepository.save(notification);
    }

    @Override
    public List<Notification> markAllAsRead(Long userId) {
        List<Notification> notifications = getUserNotifications(userId);
        for(Notification notification: notifications){
            notification.setRead(true);
        }
        return notificationRepository.saveAll(notifications);
    }

    @Override
    public void deleteNotification(Long notificationId, User reqUser) throws Exception {
        Notification notification = findById(notificationId);
        if(!notification.getReceiver().getId().equals(reqUser.getId())){
            throw new Exception("Cannot delete another user's notification");
        }
        notificationRepository.deleteById(notificationId);
    }
    @Override
    public List<Notification> findUserUnreadNotifications(Long userId) {
        return notificationRepository.findUserUnreadNotifications(userId);
    }
}

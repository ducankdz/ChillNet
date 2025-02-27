package com.chilllover.chillnet.responses;

import com.chilllover.chillnet.entities.Notification;
import com.chilllover.chillnet.entities.NotificationType;
import com.chilllover.chillnet.entities.User;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NotificationResponse {
    Long id;
    UserResponse sender;
    UserResponse receiver;
    PostResponse post;
    String content;
    boolean isRead;
    NotificationType type;

    public static NotificationResponse toNotificationResponse(Notification notification, User reqUser){
        return NotificationResponse.builder()
                .id(notification.getId())
                .type(notification.getType())
                .content(notification.getContent())
                .isRead(notification.isRead())
                .sender(UserResponse.toUserResponse(notification.getSender(),reqUser))
                .receiver(UserResponse.toUserResponse(notification.getReceiver(),reqUser))
                .post(PostResponse.toPostResponse(notification.getPost(),reqUser))
                .build();
    }
    public static List<NotificationResponse> toNotificationResponseList(
            List<Notification> notifications, User reqUser){
        return notifications.stream().map(
                notification -> NotificationResponse
                        .toNotificationResponse(notification,reqUser))
                .collect(Collectors.toList());
    }
}

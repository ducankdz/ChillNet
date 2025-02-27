package com.chilllover.chillnet.dtos;

import com.chilllover.chillnet.entities.NotificationType;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NotificationDTO {
    Long senderId;
    Long receiverId;
    Long postId;
    String content;
    NotificationType type;
}

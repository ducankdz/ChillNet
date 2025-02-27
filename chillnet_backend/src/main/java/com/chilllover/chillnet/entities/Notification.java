package com.chilllover.chillnet.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    User sender;

    @ManyToOne
    User receiver;

    @ManyToOne()
    Post post;

    @Column(nullable = false)
    String content;

    LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    NotificationType type;

    boolean isRead = false;
}

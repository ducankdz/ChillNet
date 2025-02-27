package com.chilllover.chillnet.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "stories")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Story {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    User user;

    String media;
    LocalDateTime createdAt;

    @Transient
    boolean isExpired;

    @ManyToMany
    List<User> watchedUsers = new ArrayList<>();

    @ManyToMany
    List<User> likedUsers = new ArrayList<>();

    public List<User> getLikedUsers(){
        if(likedUsers == null){
            return new ArrayList<>();
        }
        return likedUsers;
    }

    public List<User> getWatchedUsers(){
        if(watchedUsers == null){
            return new ArrayList<>();
        }
        return watchedUsers;
    }
    public boolean isExpired(){
        return createdAt.plusHours(24).isBefore(LocalDateTime.now());
    }
}

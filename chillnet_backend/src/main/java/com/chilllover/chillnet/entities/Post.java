package com.chilllover.chillnet.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "posts")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    User user;

    @ManyToOne
    User sharedBy;

    LocalDateTime sharedAt;
    String content;

    @ElementCollection
    List<String> media;

    @JsonIgnore
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Like> likes = new ArrayList<>();

    @ManyToOne
    Post commentFor;

    @OneToMany(mappedBy = "commentFor", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Post> comments = new ArrayList<>();

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Share> shares = new ArrayList<>();

    @ManyToMany
    List<User> savedUsers = new ArrayList<>();

    boolean isPost;
    boolean isComment;

    LocalDateTime createdAt;

    public List<Share> getShares(){
        if(shares == null){
            shares = new ArrayList<>();
        }
        return shares;
    }
    public List<User> getSavedUsers(){
        if(savedUsers == null){
            savedUsers = new ArrayList<>();
        }
        return savedUsers;
    }
    public List<Like> getLikes(){
        if(likes == null){
            likes = new ArrayList<>();
        }
        return likes;
    }
    public List<Post> getComments(){
        if(comments == null){
            comments = new ArrayList<>();
        }
        return comments;
    }
}

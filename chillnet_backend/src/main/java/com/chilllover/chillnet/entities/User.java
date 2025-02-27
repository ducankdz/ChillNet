package com.chilllover.chillnet.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "email", unique = true, nullable = false)
    String email;

    @Column(name = "username", unique = true, nullable = false)
    String username;

    String fullName;

    @JsonIgnore
    String password;

    String bio;
    String image;
    LocalDate birthDate;
    String location;
    boolean loginWithGoogle;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    List<Post> posts = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    List<Like> likes = new ArrayList<>();

    @Embedded
    Verification verification;

    @JsonIgnore
    @ManyToMany()
    List<User> followers = new ArrayList<>();

    @JsonIgnore
    @ManyToMany()
    List<User> followings = new ArrayList<>();

    String resetToken;
    LocalDateTime resetTokenExpiry;
}

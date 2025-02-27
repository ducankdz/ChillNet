package com.chilllover.chillnet.responses;

import com.chilllover.chillnet.entities.User;
import com.chilllover.chillnet.entities.Verification;
import com.chilllover.chillnet.utils.UserUtil;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {
    Long id;
    String email;
    String username;
    String fullName;
    String bio;
    String image;
    LocalDate birthDate;
    String location;
    boolean loginWithGoogle;
    boolean reqUser;
    boolean followed;
    boolean verified;
    int totalPosts;
    List<UserResponse> followers;
    List<UserResponse> followings;
    int totalFollowers;
    boolean hasNotification;
    Verification verification;
    public static UserResponse toUserResponse(User user, User reqUser){
        if(user == null){
            return null;
        }
        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .bio(user.getBio())
                .image(user.getImage())
                .birthDate(user.getBirthDate())
                .location(user.getLocation())
                .loginWithGoogle(user.isLoginWithGoogle())
                .followed(UserUtil.isFollowedByReqUser(reqUser, user))
                .reqUser(UserUtil.isReqUser(reqUser, user))
                .totalPosts(user.getPosts().size())
                .followers(toUserResponseList(user.getFollowers(),reqUser))
                .totalFollowers(user.getFollowers().size())
                .followings(toUserResponseList(user.getFollowings(),reqUser))
                .verification(user.getVerification())
                .verified(UserUtil.isVerified(user))
                .build();
    }
    public static List<UserResponse> toUserResponseList(List<User> users, User reqUser){
        if (users == null) {
            return List.of();
        }
        return users.stream().map(
                user -> UserResponse.builder()
                        .id(user.getId())
                        .username(user.getUsername())
                        .email(user.getEmail())
                        .fullName(user.getFullName())
                        .bio(user.getBio())
                        .image(user.getImage())
                        .birthDate(user.getBirthDate())
                        .location(user.getLocation())
                        .loginWithGoogle(user.isLoginWithGoogle())
                        .totalPosts(user.getPosts().size())
                        .followed(UserUtil.isFollowedByReqUser(reqUser, user))
                        .reqUser(UserUtil.isReqUser(reqUser, user))
                        .totalFollowers(user.getFollowers().size())
                        .verification(user.getVerification())
                        .verified(UserUtil.isVerified(user))
                        .build()
                )
                .collect(Collectors.toList());
    }
}

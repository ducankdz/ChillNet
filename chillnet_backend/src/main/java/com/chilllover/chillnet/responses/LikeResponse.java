package com.chilllover.chillnet.responses;

import com.chilllover.chillnet.entities.Like;
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
public class LikeResponse {
    Long id;
    UserResponse user;
    PostResponse post;
    public static LikeResponse toLikeResponse(Like like, User reqUser){
        return LikeResponse.builder()
                .id(like.getId())
                .user(UserResponse.toUserResponse(like.getUser(),reqUser))
                .post(PostResponse.toPostResponse(like.getPost(),reqUser))
                .build();
    }
    public static List<LikeResponse> toLikeResponseList(List<Like> likes, User reqUser){
        return likes.stream().map(like -> LikeResponse.toLikeResponse(like,reqUser))
                .collect(Collectors.toList());
    }
}

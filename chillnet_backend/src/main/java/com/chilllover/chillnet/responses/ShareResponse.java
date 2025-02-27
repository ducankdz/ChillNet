package com.chilllover.chillnet.responses;

import com.chilllover.chillnet.entities.Like;
import com.chilllover.chillnet.entities.Share;
import com.chilllover.chillnet.entities.User;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ShareResponse {
    Long id;
    UserResponse user;
    PostResponse post;
    LocalDateTime createdAt;
    public static ShareResponse toShareResponse(Share share, User reqUser){
        return ShareResponse.builder()
                .id(share.getId())
                .user(UserResponse.toUserResponse(share.getUser(),reqUser))
                .post(PostResponse.toPostResponse(share.getPost(),reqUser))
                .createdAt(share.getCreatedAt())
                .build();
    }
    public static List<ShareResponse> toShareResponseList(List<Share> shares, User reqUser){
        return shares.stream().map(share -> ShareResponse.toShareResponse(share,reqUser))
                .collect(Collectors.toList());
    }
}

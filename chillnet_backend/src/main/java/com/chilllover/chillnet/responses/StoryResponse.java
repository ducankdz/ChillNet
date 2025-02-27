package com.chilllover.chillnet.responses;

import com.chilllover.chillnet.entities.Story;
import com.chilllover.chillnet.entities.User;
import com.chilllover.chillnet.utils.StoryUtil;
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
public class StoryResponse {
    Long id;
    UserResponse user;
    String media;
    LocalDateTime createdAt;
    List<UserResponse> watchedUsers;
    boolean isExpired;
    boolean isWatched;
    boolean isLiked;
    int totalWatchers;
    public static StoryResponse toStoryResponse(Story story, User reqUser){
        return StoryResponse.builder()
                .id(story.getId())
                .user(UserResponse.toUserResponse(story.getUser(),reqUser))
                .media(story.getMedia())
                .createdAt(story.getCreatedAt())
                .isExpired(story.isExpired())
                .watchedUsers(story.getWatchedUsers().stream().map(
                        user1 -> UserResponse.toUserResponse(user1,reqUser))
                        .collect(Collectors.toList()))
                .isWatched(StoryUtil.isWatchedByReqUser(story,reqUser))
                .isLiked(StoryUtil.isLikedByReqUser(story, reqUser))
                .totalWatchers(story.getWatchedUsers().size())
                .build();
    }
    public static List<StoryResponse> toStoryResponseList(List<Story> stories, User reqUser){
        return stories.stream().map(story -> StoryResponse.toStoryResponse(story,reqUser))
                .collect(Collectors.toList());
    }
}

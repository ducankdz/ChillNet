package com.chilllover.chillnet.responses;

import com.chilllover.chillnet.entities.Post;
import com.chilllover.chillnet.entities.User;
import com.chilllover.chillnet.utils.PostUtil;
import jakarta.persistence.ManyToOne;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostResponse {
    Long id;
    UserResponse user;
    UserResponse sharedBy;
    String content;
    List<String> media;
    LocalDateTime createdAt;
    LocalDateTime sharedAt;
    int totalLikes;
    int totalComments;
    int totalShares;
    boolean isPost;
    boolean isComment;
    boolean isLiked;
    boolean isShared;
    boolean isSaved;
    PostResponse commentFor;
    List<PostResponse> comments;
    List<UserResponse> sharedUsers;
    List<UserResponse> savedUsers;
    public static PostResponse toPostResponse(Post post, User reqUser){
        if(post == null){
            return null;
        }

        List<UserResponse> savedUsers = post
                .getSavedUsers()
                .stream()
                .map(user1 -> UserResponse.toUserResponse(user1,reqUser))
                .toList();
        return PostResponse.builder()
                .id(post.getId())
                .content(post.getContent())
                .media(post.getMedia())
                .createdAt(post.getCreatedAt())
                .sharedAt(post.getSharedAt())
                .user(UserResponse.toUserResponse(post.getUser(),reqUser))
                .sharedBy(UserResponse.toUserResponse(post.getSharedBy(),reqUser))
                .totalLikes(post.getLikes().size())
                .totalComments(post.getComments().size())
                .totalShares(post.getShares().size())
                .isLiked(PostUtil.isLikedByReqUSer(reqUser, post))
                .isShared(PostUtil.isSharedByReqUSer(reqUser, post))
                .isSaved(PostUtil.isSavedByReqUSer(reqUser, post))
                .isPost(post.isPost())
                .isComment(post.isComment())
                .savedUsers(savedUsers)
                .comments(toPostResponseList(post.getComments(),reqUser))
                .commentFor(post.getCommentFor() != null ?
                        PostResponse.toPostResponse(post.getCommentFor(), reqUser) : null)
                .build();
    }
    public static List<PostResponse> toPostResponseList(List<Post> posts, User reqUser){
        if(posts == null){
            return null;
        }
        return posts.stream().map(
                post -> PostResponse.builder()
                        .id(post.getId())
                        .content(post.getContent())
                        .media(post.getMedia())
                        .createdAt(post.getCreatedAt())
                        .sharedAt(post.getSharedAt())
                        .user(UserResponse.toUserResponse(post.getUser(),reqUser))
                        .sharedBy(UserResponse.toUserResponse(post.getSharedBy(),reqUser))
                        .totalLikes(post.getLikes().size())
                        .totalComments(post.getComments().size())
                        .totalShares(post.getShares().size())
                        .isLiked(PostUtil.isLikedByReqUSer(reqUser, post))
                        .isShared(PostUtil.isSharedByReqUSer(reqUser, post))
                        .isSaved(PostUtil.isSavedByReqUSer(reqUser, post))
                        .isPost(post.isPost())
                        .isComment(post.isComment())
                        .build()
                )
                .collect(Collectors.toList());
    }
}

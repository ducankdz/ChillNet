package com.chilllover.chillnet.services.like;

import com.chilllover.chillnet.entities.Like;
import com.chilllover.chillnet.entities.User;

import java.util.List;

public interface LikeService {
    Like likePost(Long postId, User user) throws Exception;
    List<Like> getPostLikes(Long postId);
}

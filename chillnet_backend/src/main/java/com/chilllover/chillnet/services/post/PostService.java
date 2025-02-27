package com.chilllover.chillnet.services.post;

import com.chilllover.chillnet.dtos.PostDTO;
import com.chilllover.chillnet.entities.Post;
import com.chilllover.chillnet.entities.User;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PostService {
    Post createPost(PostDTO postDTO, User user);
    List<Post> findAllPosts(User user);
    Post findPostById(Long id) throws Exception;
    void deleteById(Long id, User user) throws Exception;
    List<Post> getUserPosts(User user);
    List<Post> getUserLikedPosts(User user);
    List<Post> getUserSavedPosts(User user);
    List<Post> getFollowedUserPosts(User user);
    List<Post> getTrendingPosts(Pageable pageable);
    Post comment(PostDTO postDTO, User user) throws Exception;
    Post savePost(Long postId, User user) throws Exception;
}

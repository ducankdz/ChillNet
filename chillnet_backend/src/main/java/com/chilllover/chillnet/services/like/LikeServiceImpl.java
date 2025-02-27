package com.chilllover.chillnet.services.like;

import com.chilllover.chillnet.entities.Like;
import com.chilllover.chillnet.entities.Post;
import com.chilllover.chillnet.entities.User;
import com.chilllover.chillnet.repositories.LikeRepository;
import com.chilllover.chillnet.repositories.PostRepository;
import com.chilllover.chillnet.services.post.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LikeServiceImpl implements LikeService{
    private final LikeRepository likeRepository;
    private final PostService postService;
    private final PostRepository postRepository;
    @Override
    public Like likePost(Long postId, User user) throws Exception {
        Like like = likeRepository.likeExisted(user.getId(), postId);
        if(like != null){
            likeRepository.deleteById(like.getId());
            return like;
        }
        Post post = postService.findPostById(postId);
        Like newLike = Like.builder()
                .post(post)
                .user(user)
                .build();
        Like savedLike = likeRepository.save(newLike);
        post.getLikes().add(savedLike);
        postRepository.save(post);
        return savedLike;
    }

    @Override
    public List<Like> getPostLikes(Long postId) {
        return likeRepository.findByPostId(postId);
    }
}

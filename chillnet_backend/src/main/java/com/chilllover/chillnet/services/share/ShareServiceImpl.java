package com.chilllover.chillnet.services.share;

import com.chilllover.chillnet.entities.Like;
import com.chilllover.chillnet.entities.Post;
import com.chilllover.chillnet.entities.Share;
import com.chilllover.chillnet.entities.User;
import com.chilllover.chillnet.repositories.PostRepository;
import com.chilllover.chillnet.repositories.ShareRepository;
import com.chilllover.chillnet.services.post.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ShareServiceImpl implements ShareService{
    private final ShareRepository shareRepository;
    private final PostService postService;
    private final PostRepository postRepository;
    @Override
    public Share sharePost(Long postId, User user) throws Exception {
        Share share = shareRepository.shareExisted(user.getId(), postId);
        if(share != null){
            shareRepository.deleteById(share.getId());
            return share;
        }
        Post post = postService.findPostById(postId);
        Share newShare = Share.builder()
                .post(post)
                .user(user)
                .createdAt(LocalDateTime.now())
                .build();
        Share savedShare = shareRepository.save(newShare);
        post.getShares().add(savedShare);
        postRepository.save(post);
        return savedShare;
    }
}

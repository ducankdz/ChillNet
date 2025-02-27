package com.chilllover.chillnet.services.post;

import com.chilllover.chillnet.dtos.PostDTO;
import com.chilllover.chillnet.entities.Post;
import com.chilllover.chillnet.entities.Share;
import com.chilllover.chillnet.entities.User;
import com.chilllover.chillnet.repositories.NotificationRepository;
import com.chilllover.chillnet.repositories.PostRepository;
import com.chilllover.chillnet.repositories.ShareRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService{
    private final PostRepository postRepository;
    private final ShareRepository shareRepository;
    private final NotificationRepository notificationRepository;
    @Override
    public Post createPost(PostDTO postDTO, User user) {
        Post newPost = Post.builder()
                .content(postDTO.getContent())
                .media(postDTO.getMedia())
                .user(user)
                .isPost(true)
                .isComment(false)
                .createdAt(LocalDateTime.now())
                .build();
        return postRepository.save(newPost);
    }
    @Override
    public List<Post> findAllPosts(User user) {
        List<User> followers = user.getFollowers();
        List<Post> originalPosts = postRepository.findAllByIsPostTrueOrderByCreatedAtDesc();

        if (!followers.isEmpty()) {
            List<Share> shares = shareRepository.findSharesByUsers(followers);

            // Dùng Map để lưu post theo ID, chỉ giữ share gần nhất
            Map<Long, Post> sharedPostMap = new HashMap<>();
            for (Share share : shares) {
                Post post = share.getPost();
                post.setSharedBy(share.getUser());
                post.setSharedAt(share.getCreatedAt());

                // Nếu bài viết đã tồn tại, chỉ cập nhật nếu share mới hơn
                sharedPostMap.merge(post.getId(), post, (existing, newPost) ->
                        newPost.getSharedAt().isAfter(existing.getSharedAt()) ? newPost : existing
                );
            }

            // Danh sách bài viết được share (không trùng)
            List<Post> sharedPosts = new ArrayList<>(sharedPostMap.values());

            // Lấy ID của bài viết đã được share để loại khỏi danh sách gốc
            Set<Long> sharedPostIds = sharedPostMap.keySet();
            List<Post> filterOriginalPosts = originalPosts.stream()
                    .filter(post -> !sharedPostIds.contains(post.getId()))
                    .toList();

            // Gộp hai danh sách
            List<Post> allPosts = new ArrayList<>(filterOriginalPosts);
            allPosts.addAll(sharedPosts);

            // Sắp xếp theo thời gian mới nhất (sharedAt nếu có, nếu không thì createdAt)
            allPosts.sort((o1, o2) -> {
                LocalDateTime time1 = o1.getSharedAt() != null ? o1.getSharedAt() : o1.getCreatedAt();
                LocalDateTime time2 = o2.getSharedAt() != null ? o2.getSharedAt() : o2.getCreatedAt();
                return -time1.compareTo(time2); // Sắp xếp giảm dần
            });

            return allPosts;
        }

        return originalPosts;
    }


    @Override
    public Post findPostById(Long id) throws Exception {
        return postRepository.findById(id)
                .orElseThrow(() -> new Exception("Post not found with id = " + id));
    }

    @Override
    @Transactional
    public void deleteById(Long id, User user) throws Exception {
        Post post = findPostById(id);
        if(!post.getUser().getId().equals(user.getId())){
            throw new Exception("Cannot delete another user's post");
        }
        notificationRepository.deleteByPostId(id);
        postRepository.deleteById(id);
    }

    @Override
    public List<Post> getUserPosts(User user) {
        return postRepository.findUserPosts(user);
    }

    @Override
    public List<Post> getUserLikedPosts(User user) {
        return postRepository.findUserLikedPosts(user.getId());
    }

    @Override
    public List<Post> getUserSavedPosts(User user) {
        return postRepository.findUserSavedPosts(user);
    }
    @Override
    public List<Post> getFollowedUserPosts(User user) {
        return postRepository.findFollowedUserPosts(user.getId());
    }
    @Override
    public List<Post> getTrendingPosts(Pageable pageable) {
        return postRepository.findTrendingPosts(pageable)
                .stream()
                .filter(post -> post.getCreatedAt().isAfter(LocalDateTime.now().minusDays(7)))
                .collect(Collectors.toList());
    }
    @Override
    public Post comment(PostDTO postDTO, User user) throws Exception {
        Post post = findPostById(postDTO.getPostId());
        Post comment = Post.builder()
                .content(postDTO.getContent())
                .media(postDTO.getMedia())
                .user(user)
                .isPost(false)
                .isComment(true)
                .commentFor(post)
                .createdAt(LocalDateTime.now())
                .build();
        post.getComments().add(comment);
        postRepository.save(comment);
        return postRepository.save(post);
    }

    @Override
    public Post savePost(Long postId, User user) throws Exception {
        Post post = findPostById(postId);
        if(post.getSavedUsers().contains(user)){
            post.getSavedUsers().remove(user);
        }
        else{
            post.getSavedUsers().add(user);
        }
        return postRepository.save(post);
    }
}

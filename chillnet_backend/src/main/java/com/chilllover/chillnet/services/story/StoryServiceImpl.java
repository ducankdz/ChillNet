package com.chilllover.chillnet.services.story;

import com.chilllover.chillnet.dtos.StoryDTO;
import com.chilllover.chillnet.entities.Story;
import com.chilllover.chillnet.entities.User;
import com.chilllover.chillnet.repositories.StoryRepository;
import com.chilllover.chillnet.services.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StoryServiceImpl implements StoryService {

    private final StoryRepository storyRepository;
    private final UserService userService;

    @Override
    @Transactional
    public Story createStory(StoryDTO storyDTO, User user) {
        Story story = Story.builder()
                .user(user)
                .media(storyDTO.getMedia())
                .createdAt(LocalDateTime.now())
                .build();
        return storyRepository.save(story);
    }

    @Override
    @Transactional
    public Story findStoryById(Long storyId, User reqUser) {
        Optional<Story> storyOpt = storyRepository.findById(storyId);
        if (storyOpt.isEmpty()) {
            throw new RuntimeException("Story not found with ID: " + storyId);
        }
        Story story = storyOpt.get();
        List<User> watchedUsers = story.getWatchedUsers();
        if (!watchedUsers.contains(reqUser)) {
            watchedUsers.add(reqUser);
            story.setWatchedUsers(watchedUsers);
            storyRepository.save(story);
        }

        return story;
    }

    @Override
    public List<Story> findFollowedUsersStories(User user) {
        List<User> users = user.getFollowings();
        users.add(user);
        List<Story> stories = storyRepository.findByUserInAndCreatedAtAfter(users, LocalDateTime.now().minusHours(24));
        stories.sort((o1, o2) -> -o1.getCreatedAt().compareTo(o2.getCreatedAt()));
        return stories;
    }

    @Override
    public List<User> getWatchedUsers(Long storyId, User reqUser) {
        Optional<Story> storyOpt = storyRepository.findById(storyId);
        if (storyOpt.isEmpty()) {
            throw new RuntimeException("Story not found with ID: " + storyId);
        }
        if (!storyOpt.get().getUser().getId().equals(reqUser.getId())) {
            throw new RuntimeException("Cannot see watched users of another user's story.");
        }
        return storyOpt.get().getWatchedUsers();
    }

    @Override
    @Transactional
    public void deleteStory(Long storyId, User reqUser) {
        Optional<Story> storyOpt = storyRepository.findById(storyId);
        if (storyOpt.isEmpty()) {
            throw new RuntimeException("Story not found with ID: " + storyId);
        }
        if (!storyOpt.get().getUser().getId().equals(reqUser.getId())) {
            throw new RuntimeException("Cannot delete another user's story.");
        }
        storyRepository.delete(storyOpt.get());
    }

    @Override
    @Transactional
    @Scheduled(fixedRate = 3600000)
    public void deleteExpiredStories() {
        storyRepository.deleteByCreatedAtBefore(LocalDateTime.now().minusHours(24));
    }

    @Override
    @Transactional
    public Story likeStory(Long storyId, User user) {
        Optional<Story> storyOpt = storyRepository.findById(storyId);
        if (storyOpt.isEmpty()) {
            throw new RuntimeException("Story not found with ID: " + storyId);
        }
        Story story = storyOpt.get();
        List<User> likedUsers = story.getLikedUsers();
        if (!likedUsers.contains(user)) {
            likedUsers.add(user);
            story.setLikedUsers(likedUsers);
        }
        else{
            likedUsers.remove(user);
            story.setLikedUsers(likedUsers);
        }
        return storyRepository.save(story);
    }

    @Override
    public List<User> getLikedUsers(Long storyId,User reqUser) {
        Optional<Story> storyOpt = storyRepository.findById(storyId);
        if (storyOpt.isEmpty()) {
            throw new RuntimeException("Story not found with ID: " + storyId);
        }
        Story story = storyOpt.get();
        if(!story.getUser().getId().equals(reqUser.getId())){
            throw new RuntimeException("Cannot get another user story's liked users");
        }
        return story.getLikedUsers();
    }
}
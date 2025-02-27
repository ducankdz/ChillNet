package com.chilllover.chillnet.services.story;

import com.chilllover.chillnet.dtos.StoryDTO;
import com.chilllover.chillnet.entities.Story;
import com.chilllover.chillnet.entities.User;

import java.util.List;

public interface StoryService {
    Story createStory(StoryDTO storyDTO, User user);
    Story findStoryById(Long storyId, User reqUser);
    List<Story> findFollowedUsersStories(User user);
    List<User> getWatchedUsers(Long storyId, User reqUser);
    void deleteStory(Long storyId, User reqUser);
    void deleteExpiredStories();
    Story likeStory(Long storyId, User reqUser);
    List<User> getLikedUsers(Long storyId, User reqUser);
}

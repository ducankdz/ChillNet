package com.chilllover.chillnet.utils;

import com.chilllover.chillnet.entities.Story;
import com.chilllover.chillnet.entities.User;

import java.util.List;

public class StoryUtil {
    public static boolean isWatchedByReqUser(Story story, User reqUser){
        List<User> watchedUsers = story.getWatchedUsers();
        if(watchedUsers == null || watchedUsers.isEmpty()){
            return false;
        }
        for(User user : watchedUsers){
            if(user.getId().equals(reqUser.getId())){
                return true;
            }
        }
        return false;
    }
    public static boolean isLikedByReqUser(Story story, User reqUser){
        List<User> likedUsers = story.getLikedUsers();
        if(likedUsers == null || likedUsers.isEmpty()){
            return false;
        }
        for(User user : likedUsers){
            if(user.getId().equals(reqUser.getId())){
                return true;
            }
        }
        return false;
    }
}

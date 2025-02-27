package com.chilllover.chillnet.utils;

import com.chilllover.chillnet.entities.User;

import java.time.LocalDateTime;

public class UserUtil {
    public static boolean isVerified(User reqUser) {
        return reqUser.getVerification() != null && reqUser.getVerification().getEndsAt() != null
                && LocalDateTime.now().isBefore(reqUser.getVerification().getEndsAt());
    }

    public static boolean isReqUser(User reqUser, User user){
        return reqUser.getId().equals(user.getId());
    }
    public static boolean isFollowedByReqUser(User reqUser, User user){
        return user.getFollowers().contains(reqUser);
    }
}

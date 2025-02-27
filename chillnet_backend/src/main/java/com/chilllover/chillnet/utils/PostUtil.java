package com.chilllover.chillnet.utils;

import com.chilllover.chillnet.entities.Like;
import com.chilllover.chillnet.entities.Post;
import com.chilllover.chillnet.entities.Share;
import com.chilllover.chillnet.entities.User;

import java.util.List;

public class PostUtil {
    public static boolean isLikedByReqUSer(User reqUser, Post post){
        List<Like> likes = post.getLikes();
        if(likes == null || likes.isEmpty() ){
            return false;
        }
        for(Like like : likes){
            if(like.getUser().getId().equals(reqUser.getId())){
                return true;
            }
        }
        return false;
    }
    public static boolean isSharedByReqUSer(User reqUser, Post post){
        List<Share> shares = post.getShares();
        if(shares == null ||shares.isEmpty()){
            return false;
        }
        for(Share share : shares){
            if(share.getUser().getId().equals(reqUser.getId())){
                return true;
            }
        }
        return false;
    }
    public static boolean isSavedByReqUSer(User reqUser, Post post){
        List<User> users = post.getSavedUsers();
        if(users == null ||users.isEmpty()){
            return false;
        }
        for(User user : users){
            if(user.getId().equals(reqUser.getId())){
                return true;
            }
        }
        return false;
    }

}

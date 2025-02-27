package com.chilllover.chillnet.services.share;

import com.chilllover.chillnet.entities.Share;
import com.chilllover.chillnet.entities.User;

import java.util.List;

public interface ShareService {
    Share sharePost(Long postId, User user) throws Exception;
}

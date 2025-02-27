package com.chilllover.chillnet.controllers;

import com.chilllover.chillnet.entities.Like;
import com.chilllover.chillnet.entities.Share;
import com.chilllover.chillnet.entities.User;
import com.chilllover.chillnet.responses.LikeResponse;
import com.chilllover.chillnet.responses.ShareResponse;
import com.chilllover.chillnet.services.share.ShareService;
import com.chilllover.chillnet.services.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/share")
@RequiredArgsConstructor
public class ShareController {
    private final ShareService shareService;
    private final UserService userService;

    @PostMapping("/post/{postId}")
    public ResponseEntity<?> sharePost(@RequestHeader("Authorization") String jwt,
                                      @PathVariable("postId") Long postId){
        try {
            User reqUser = userService.findUserByJwt(jwt);
            Share share = shareService.sharePost(postId, reqUser);
            ShareResponse shareResponse = ShareResponse.toShareResponse(share,reqUser);
            return new ResponseEntity<>(shareResponse, HttpStatus.CREATED);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

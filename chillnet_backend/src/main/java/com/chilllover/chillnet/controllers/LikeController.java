package com.chilllover.chillnet.controllers;

import com.chilllover.chillnet.entities.Like;
import com.chilllover.chillnet.entities.User;
import com.chilllover.chillnet.responses.LikeResponse;
import com.chilllover.chillnet.services.like.LikeService;
import com.chilllover.chillnet.services.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/like")
@RequiredArgsConstructor
public class LikeController {
    private final LikeService likeService;
    private final UserService userService;

    @PostMapping("/post/{postId}")
    public ResponseEntity<?> likePost(@RequestHeader("Authorization") String jwt,
                                      @PathVariable("postId") Long postId){
        try {
            User reqUser = userService.findUserByJwt(jwt);
            Like like = likeService.likePost(postId, reqUser);
            LikeResponse likeResponse = LikeResponse.toLikeResponse(like, reqUser);
            return new ResponseEntity<>(likeResponse, HttpStatus.CREATED);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<?> getPostLikes(@RequestHeader("Authorization") String jwt,
                                      @PathVariable("postId") Long postId){
        try {
            User reqUser = userService.findUserByJwt(jwt);
            List<Like> likes = likeService.getPostLikes(postId);
            List<LikeResponse> likeResponses = LikeResponse.toLikeResponseList(likes,reqUser);
            return new ResponseEntity<>(likeResponses, HttpStatus.OK);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

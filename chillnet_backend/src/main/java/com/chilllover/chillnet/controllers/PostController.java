package com.chilllover.chillnet.controllers;

import com.chilllover.chillnet.dtos.PostDTO;
import com.chilllover.chillnet.entities.Post;
import com.chilllover.chillnet.entities.User;
import com.chilllover.chillnet.responses.MessageResponse;
import com.chilllover.chillnet.responses.PostResponse;
import com.chilllover.chillnet.services.post.PostService;
import com.chilllover.chillnet.services.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/post")
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;
    private final UserService userService;

    @PostMapping("/create")
    public ResponseEntity<?> createPost(@RequestHeader("Authorization") String jwt,
                                        @RequestBody PostDTO postDTO){
        try {
            User reqUser = userService.findUserByJwt(jwt);
            Post post = postService.createPost(postDTO,reqUser);
            PostResponse postResponse = PostResponse.toPostResponse(post,reqUser);
            return new ResponseEntity<>(postResponse, HttpStatus.CREATED);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("")
    public ResponseEntity<?> getAllPosts(@RequestHeader("Authorization") String jwt){
        try {
            User reqUser = userService.findUserByJwt(jwt);
            List<Post> posts = postService.findAllPosts(reqUser);
            List<PostResponse> postResponses = PostResponse.toPostResponseList(posts,reqUser);
            return new ResponseEntity<>(postResponses, HttpStatus.OK);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> findPostById(@RequestHeader("Authorization") String jwt,
                                          @PathVariable("id") Long id){
        try {
            User reqUser = userService.findUserByJwt(jwt);
            Post post = postService.findPostById(id);
            PostResponse postResponse = PostResponse.toPostResponse(post,reqUser);
            return new ResponseEntity<>(postResponse, HttpStatus.OK);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> findUserPosts(@RequestHeader("Authorization") String jwt,
                                          @PathVariable("userId") Long userId){
        try {
            User reqUser = userService.findUserByJwt(jwt);
            User user = userService.findUserById(userId);
            List<Post> posts = postService.getUserPosts(user);
            List<PostResponse> postResponses = PostResponse.toPostResponseList(posts,reqUser);
            return new ResponseEntity<>(postResponses, HttpStatus.OK);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/user/{userId}/likes")
    public ResponseEntity<?> findUserLikedPosts(@RequestHeader("Authorization") String jwt,
                                           @PathVariable("userId") Long userId){
        try {
            User reqUser = userService.findUserByJwt(jwt);
            User user = userService.findUserById(userId);
            List<Post> posts = postService.getUserLikedPosts(user);
            List<PostResponse> postResponses = PostResponse.toPostResponseList(posts,reqUser);
            return new ResponseEntity<>(postResponses, HttpStatus.OK);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/user/{userId}/saves")
    public ResponseEntity<?> findUserSavedPosts(@RequestHeader("Authorization") String jwt,
                                                @PathVariable("userId") Long userId){
        try {
            User reqUser = userService.findUserByJwt(jwt);
            User user = userService.findUserById(userId);
            List<Post> posts = postService.getUserSavedPosts(user);
            List<PostResponse> postResponses = PostResponse.toPostResponseList(posts,reqUser);
            return new ResponseEntity<>(postResponses, HttpStatus.OK);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/following")
    public ResponseEntity<?> findFollowedUserPosts(@RequestHeader("Authorization") String jwt){
        try {
            User reqUser = userService.findUserByJwt(jwt);
            List<Post> posts = postService.getFollowedUserPosts(reqUser);
            List<PostResponse> postResponses = PostResponse.toPostResponseList(posts,reqUser);
            return new ResponseEntity<>(postResponses, HttpStatus.OK);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/trending")
    public ResponseEntity<?> findTrendingPosts(@RequestHeader("Authorization") String jwt,
                                               Pageable pageable){
        try {
            User reqUser = userService.findUserByJwt(jwt);
            List<Post> posts = postService.getTrendingPosts(pageable);
            List<PostResponse> postResponses = PostResponse.toPostResponseList(posts,reqUser);
            return new ResponseEntity<>(postResponses, HttpStatus.OK);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping("/comment")
    public ResponseEntity<?> comment(@RequestHeader("Authorization") String jwt,
                                     @RequestBody PostDTO postDTO){
        try {
            User reqUser = userService.findUserByJwt(jwt);
            Post post = postService.comment(postDTO,reqUser);
            PostResponse postResponse = PostResponse.toPostResponse(post,reqUser);
            return new ResponseEntity<>(postResponse, HttpStatus.OK);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(@RequestHeader("Authorization") String jwt,
                                       @PathVariable("id") Long id){
        try {
            User reqUser = userService.findUserByJwt(jwt);
            postService.deleteById(id, reqUser);
            return new ResponseEntity<>(MessageResponse
                    .builder()
                    .message("Delete post successfully")
                    .build(), HttpStatus.OK);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PutMapping("/{id}/save")
    public ResponseEntity<?> savePost(@RequestHeader("Authorization") String jwt,
                                        @PathVariable("id") Long id){
        try {
            User reqUser = userService.findUserByJwt(jwt);
            Post post = postService.savePost(id, reqUser);
            PostResponse postResponse = PostResponse.toPostResponse(post,reqUser);
            return new ResponseEntity<>(postResponse, HttpStatus.OK);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

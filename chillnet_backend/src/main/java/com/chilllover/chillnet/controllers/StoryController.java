package com.chilllover.chillnet.controllers;

import com.chilllover.chillnet.dtos.StoryDTO;
import com.chilllover.chillnet.entities.Story;
import com.chilllover.chillnet.entities.User;
import com.chilllover.chillnet.responses.MessageResponse;
import com.chilllover.chillnet.responses.StoryResponse;
import com.chilllover.chillnet.responses.UserResponse;
import com.chilllover.chillnet.services.story.StoryService;
import com.chilllover.chillnet.services.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/story")
@RequiredArgsConstructor
public class StoryController {

    private final StoryService storyService;
    private final UserService userService;

    // Create a new story
    @PostMapping
    public ResponseEntity<?> createStory(@RequestHeader("Authorization") String jwt,
                                             @RequestBody StoryDTO storyDTO) {
        try {
            User currentUser = userService.findUserByJwt(jwt);
            Story createdStory = storyService.createStory(storyDTO, currentUser);
            StoryResponse storyResponse = StoryResponse.toStoryResponse(createdStory,currentUser);
            return new ResponseEntity<>(storyResponse, HttpStatus.CREATED);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // View a story by ID (also marks it as watched if not the owner's)
    @GetMapping("/{storyId}")
    public ResponseEntity<?> viewStory(@RequestHeader("Authorization") String jwt,
                                           @PathVariable Long storyId) {
        try {
            User currentUser = userService.findUserByJwt(jwt);
            Story story = storyService.findStoryById(storyId,currentUser);
            StoryResponse storyResponse = StoryResponse.toStoryResponse(story,currentUser);
            return new ResponseEntity<>(storyResponse, HttpStatus.OK);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Get stories from followed users
    @GetMapping("/followed")
    public ResponseEntity<?> getFollowedUsersStories(@RequestHeader("Authorization") String jwt) {
        try {
            User currentUser = userService.findUserByJwt(jwt);
            List<Story> stories = storyService.findFollowedUsersStories(currentUser);
            List<StoryResponse> storyResponses = StoryResponse.toStoryResponseList(stories, currentUser);
            return new ResponseEntity<>(storyResponses, HttpStatus.OK);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Get users who watched a specific story
    @GetMapping("/{storyId}/watched")
    public ResponseEntity<?> getWatchedUsers(@PathVariable Long storyId,
                                                      @RequestHeader("Authorization") String jwt) {
        try {
            User currentUser = userService.findUserByJwt(jwt);
            List<User> watchedUsers = storyService.getWatchedUsers(storyId, currentUser);
            List<UserResponse> userResponses = UserResponse.toUserResponseList(watchedUsers,currentUser);
            return new ResponseEntity<>(userResponses, HttpStatus.OK);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    // Delete a story
    @DeleteMapping("/{storyId}")
    public ResponseEntity<?> deleteStory(@PathVariable Long storyId,
                                            @RequestHeader("Authorization") String jwt) {
        try {
            User currentUser = userService.findUserByJwt(jwt);
            storyService.deleteStory(storyId,currentUser);
            return new ResponseEntity<>(MessageResponse.builder()
                    .message("Deleted story successfully.").build(), HttpStatus.OK);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping("/{storyId}/like")
    public ResponseEntity<?> likeStory(@PathVariable Long storyId,
                                          @RequestHeader("Authorization") String jwt) {
        try {
            User currentUser = userService.findUserByJwt(jwt);
            Story story = storyService.likeStory(storyId,currentUser);
            StoryResponse storyResponse = StoryResponse.toStoryResponse(story,currentUser);
            return new ResponseEntity<>(storyResponse,HttpStatus.OK);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/{storyId}/liked")
    public ResponseEntity<?> getLikedUsers(@PathVariable Long storyId,
                                                    @RequestHeader("Authorization") String jwt) {
        try {
            User currentUser = userService.findUserByJwt(jwt);
            List<User> users = storyService.getLikedUsers(storyId,currentUser);
            List<UserResponse> userResponses = UserResponse.toUserResponseList(users,currentUser);
            return new ResponseEntity<>(userResponses,HttpStatus.OK);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
package com.chilllover.chillnet.controllers;

import com.chilllover.chillnet.dtos.UserDTO;
import com.chilllover.chillnet.entities.User;
import com.chilllover.chillnet.repositories.UserRepository;
import com.chilllover.chillnet.responses.UserResponse;
import com.chilllover.chillnet.services.user.UserService;
import com.chilllover.chillnet.utils.UserUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(@RequestHeader("Authorization") String jwt){
        try {
            User reqUser = userService.findUserByJwt(jwt);
            return ResponseEntity.ok(UserResponse.toUserResponse(reqUser,reqUser));
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@RequestHeader("Authorization") String jwt,
                                         @PathVariable("id") Long id){
        try {
            User reqUser = userService.findUserByJwt(jwt);
            User user = userService.findUserById(id);
            UserResponse userResponse = UserResponse.toUserResponse(user, reqUser);
            return ResponseEntity.ok(userResponse);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/search")
    public ResponseEntity<?> searchUser(@RequestHeader("Authorization") String jwt,
                                         @RequestParam String keyword){
        try {
            User reqUser = userService.findUserByJwt(jwt);
            List<User> users = userService.searchUser(keyword);
            List<UserResponse> userResponses = UserResponse.toUserResponseList(users,reqUser);
            return ResponseEntity.ok(userResponses);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/suggest")
    public ResponseEntity<?> suggestUsers(@RequestHeader("Authorization") String jwt){
        try {
            User reqUser = userService.findUserByJwt(jwt);
            List<User> users = userService.suggestUser(reqUser.getId());
            List<UserResponse> userResponses = UserResponse.toUserResponseList(users,reqUser);
            return ResponseEntity.ok(userResponses);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/{userId}/followers")
    public ResponseEntity<?> getUserFollowers(@RequestHeader("Authorization") String jwt,
                                              @PathVariable("userId") Long userId){
        try {
            User reqUser = userService.findUserByJwt(jwt);
            List<User> users = userService.getUserFollowers(userId);
            List<UserResponse> userResponses = UserResponse.toUserResponseList(users,reqUser);
            return ResponseEntity.ok(userResponses);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/{userId}/followings")
    public ResponseEntity<?> getUserFollowings(@RequestHeader("Authorization") String jwt,
                                              @PathVariable("userId") Long userId){
        try {
            User reqUser = userService.findUserByJwt(jwt);
            List<User> users = userService.getUserFollowings(userId);
            List<UserResponse> userResponses = UserResponse.toUserResponseList(users,reqUser);
            return ResponseEntity.ok(userResponses);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PutMapping("/update")
    public ResponseEntity<?> updateProfile(@RequestHeader("Authorization") String jwt,
                                           @RequestBody UserDTO userDTO){
        try {
            User reqUser = userService.findUserByJwt(jwt);
            User user = userService.updateUser(reqUser.getId(), userDTO);
            return ResponseEntity.ok(UserResponse.toUserResponse(user,reqUser));
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PutMapping("/follow/{userId}")
    public ResponseEntity<?> followUser(@RequestHeader("Authorization") String jwt,
                                        @PathVariable("userId") Long userId){
        try {
            User reqUser = userService.findUserByJwt(jwt);
            User followToUser = userService.followUser(userId, reqUser);
            UserResponse userResponse = UserResponse.toUserResponse(followToUser, reqUser);
            return ResponseEntity.ok(userResponse);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PutMapping("/password/change")
    public ResponseEntity<?> changePassword(@RequestHeader("Authorization") String jwt,
                                           @RequestBody UserDTO userDTO){
        try {
            User reqUser = userService.findUserByJwt(jwt);
            User user = userService.changePassword(reqUser.getId(), userDTO);
            return ResponseEntity.ok(UserResponse.toUserResponse(user,reqUser));
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PutMapping("/upgrade")
    public ResponseEntity<?> upgradeToPremium(@RequestHeader("Authorization") String jwt,
                                            @RequestParam("planType") String planType){
        try {
            User reqUser = userService.findUserByJwt(jwt);
            User user = userService.upgradeToPremium(reqUser, planType);
            return ResponseEntity.ok(UserResponse.toUserResponse(user,reqUser));
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

package com.chilllover.chillnet.controllers;

import com.chilllover.chillnet.dtos.NotificationDTO;
import com.chilllover.chillnet.entities.Notification;
import com.chilllover.chillnet.entities.User;
import com.chilllover.chillnet.responses.MessageResponse;
import com.chilllover.chillnet.responses.NotificationResponse;
import com.chilllover.chillnet.services.notification.NotificationService;
import com.chilllover.chillnet.services.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notification")
@RequiredArgsConstructor
public class NotificationController {
    private final NotificationService notificationService;
    private final UserService userService;

    @PostMapping("/send")
    public ResponseEntity<?> sendNotification(@RequestHeader("Authorization") String jwt,
                                              @RequestBody NotificationDTO notificationDTO){
        try {
            User reqUser = userService.findUserByJwt(jwt);
            Notification notification = notificationService.sendNotification(notificationDTO);
            NotificationResponse notificationResponse = NotificationResponse.toNotificationResponse(notification,reqUser);
            return new ResponseEntity<>(notificationResponse, HttpStatus.CREATED);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/user")
    public ResponseEntity<?> getUserNotifications(@RequestHeader("Authorization") String jwt){
        try {
            User reqUser = userService.findUserByJwt(jwt);
            List<Notification> notifications = notificationService.getUserNotifications(reqUser.getId());
            List<NotificationResponse> notificationResponses = NotificationResponse
                    .toNotificationResponseList(notifications,reqUser);
            return new ResponseEntity<>(notificationResponses, HttpStatus.OK);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PutMapping("/{id}/read")
    public ResponseEntity<?> markNotificationAsRead(@RequestHeader("Authorization") String jwt,
                                              @PathVariable("id") Long id){
        try {
            User reqUser = userService.findUserByJwt(jwt);
            Notification notification = notificationService.markAsRead(id);
            NotificationResponse notificationResponse = NotificationResponse.toNotificationResponse(notification,reqUser);
            return new ResponseEntity<>(notificationResponse, HttpStatus.OK);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PutMapping("/user/{userId}/read")
    public ResponseEntity<?> markAllNotificationAsRead(@RequestHeader("Authorization") String jwt,
                                                    @PathVariable("userId") Long userId){
        try {
            User reqUser = userService.findUserByJwt(jwt);
            List<Notification> notifications = notificationService.markAllAsRead(userId);
            List<NotificationResponse> notificationResponses = NotificationResponse
                    .toNotificationResponseList(notifications,reqUser);
            return new ResponseEntity<>(notificationResponses, HttpStatus.OK);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNotification(@RequestHeader("Authorization") String jwt,
                                                       @PathVariable("id") Long id){
        try {
            User reqUser = userService.findUserByJwt(jwt);
            notificationService.deleteNotification(id, reqUser);
            return new ResponseEntity<>(MessageResponse
                    .builder()
                    .message("Notification deleted")
                    .build(), HttpStatus.OK);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/user/unread")
    public ResponseEntity<?> getUserUnreadNotifications(@RequestHeader("Authorization") String jwt){
        try {
            User reqUser = userService.findUserByJwt(jwt);
            List<Notification> notifications = notificationService.findUserUnreadNotifications(reqUser.getId());
            List<NotificationResponse> notificationResponses = NotificationResponse.toNotificationResponseList(notifications,reqUser);
            return new ResponseEntity<>(notificationResponses, HttpStatus.OK);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

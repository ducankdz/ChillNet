package com.chilllover.chillnet.services.user;

import com.chilllover.chillnet.configurations.JwtUtil;
import com.chilllover.chillnet.dtos.UserDTO;
import com.chilllover.chillnet.entities.User;
import com.chilllover.chillnet.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    @Override
    public User findUserById(Long id) throws Exception {
        return userRepository.findById(id)
                .orElseThrow(() -> new Exception("Cannot find user with id = " + id));
    }

    @Override
    public User findUserByJwt(String jwt) {
        String email = jwtUtil.getEmailFromToken(jwt);
        return userRepository.findByEmail(email);
    }

    @Override
    public User updateUser(Long id, UserDTO user) throws Exception {
        User existingUser = findUserById(id);
        String username = user.getUsername();
        if (username != null && !username.equals(existingUser.getUsername())) {
            if (userRepository.existsByUsername(username)) {
                throw new Exception("Username already existed");
            }
            existingUser.setUsername(user.getUsername());
        }
        if (user.getFullName() != null) {
            existingUser.setFullName(user.getFullName());
        }
        if (user.getImage() != null) {
            existingUser.setImage(user.getImage());
        }
        if (user.getBirthDate() != null) {
            existingUser.setBirthDate(user.getBirthDate());
        }
        if (user.getLocation() != null) {
            existingUser.setLocation(user.getLocation());
        }
        if (user.getBio() != null) {
            existingUser.setBio(user.getBio());
        }
        return userRepository.save(existingUser);
    }

    @Override
    public User followUser(Long id, User currentUser) throws Exception {
        if (currentUser.getId().equals(id)) {
            throw new Exception("Cannot follow yourself");
        }

        User followToUser = findUserById(id);
        if (followToUser == null) {
            throw new Exception("User not found");
        }

        // Follow hoặc Unfollow
        boolean isFollowing = currentUser.getFollowings().contains(followToUser);

        if (isFollowing) {
            // Hủy follow
            currentUser.getFollowings().removeIf(user -> user.getId().equals(followToUser.getId()));
            followToUser.getFollowers().removeIf(user -> user.getId().equals(currentUser.getId()));
        } else {
            // Thực hiện follow
            currentUser.getFollowings().add(followToUser);
            followToUser.getFollowers().add(currentUser);
        }

        // Lưu cả hai user trong cùng một transaction
        userRepository.saveAll(List.of(currentUser, followToUser));

        return followToUser;
    }


    @Override
    public List<User> searchUser(String keyword) {
        return userRepository.searchUser(keyword);
    }

    @Override
    public User changePassword(Long id, UserDTO userDTO) throws Exception {
        User existingUser = findUserById(id);
        String oldPassword = userDTO.getPassword();
        String newPassword = userDTO.getNewPassword();
        String retypePassword = userDTO.getRetypePassword();
        if(!passwordEncoder.matches(oldPassword, existingUser.getPassword())){
            throw new Exception("Old password incorrect");
        }
        if(passwordEncoder.matches(newPassword, existingUser.getPassword())){
            throw new Exception("New password need to be different");
        }
        if(!newPassword.equals(retypePassword)){
            throw new Exception("Password doesn't match");
        }
        existingUser.setPassword(passwordEncoder.encode(newPassword));
        return userRepository.save(existingUser);
    }

    @Override
    public List<User> suggestUser(Long userId) {
        List<User> users = userRepository.suggestUsers(userId);
        if(users.size()<5){
            List<User> topFollowers = userRepository.getUserWithMostFollowers(userId);

            Set<User> uniqueUsers = new LinkedHashSet<>(topFollowers);
            uniqueUsers.addAll(users);
            return uniqueUsers.stream().limit(5).collect(Collectors.toList());
        }
        return users;
    }

    @Override
    public List<User> getUserFollowers(Long userId) {
        return userRepository.getUserFollowers(userId);
    }

    @Override
    public List<User> getUserFollowings(Long userId) {
        return userRepository.getUserFollowings(userId);
    }

    @Override
    public User upgradeToPremium(User user, String planType) {
        user.getVerification().setStatus(true);
        user.getVerification().setPlanType(planType);
        user.getVerification().setCreatedAt(LocalDateTime.now());
        if(planType.equals("Monthly")){
            user.getVerification().setEndsAt(LocalDateTime.now().plusMonths(1));
        } else if (planType.equals("Annually")) {
            user.getVerification().setEndsAt(LocalDateTime.now().plusMonths(12));
        }
        else{
            throw new RuntimeException("Plan type doesn't exist.");
        }
        return userRepository.save(user);
    }
}

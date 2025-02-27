package com.chilllover.chillnet.services.user;

import com.chilllover.chillnet.dtos.UserDTO;
import com.chilllover.chillnet.entities.User;
import com.chilllover.chillnet.entities.Verification;

import java.util.List;

public interface UserService {
    User findUserById(Long id) throws Exception;
    User findUserByJwt(String jwt);
    User updateUser(Long id, UserDTO userDTO) throws Exception;
    User followUser(Long id, User currentUser) throws Exception;
    List<User> searchUser(String keyword);
    User changePassword(Long id, UserDTO userDTO) throws Exception;
    List<User> suggestUser(Long userId);
    List<User> getUserFollowers(Long userId);
    List<User> getUserFollowings(Long userId);
    User upgradeToPremium(User user, String planType);
}

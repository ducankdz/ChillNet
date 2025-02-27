package com.chilllover.chillnet.repositories;

import com.chilllover.chillnet.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    boolean existsByUsername(String username);
    @Query("select distinct u from User u " +
            "where u.username like %:keyword% " +
            "or u.fullName like %:keyword%")
    List<User> searchUser(@Param("keyword") String keyword);

    @Query("SELECT DISTINCT u FROM User u " +
            "JOIN u.followers f1 " + // Người B được follow bởi Người A
            "JOIN f1.followers f2 " + // Người A được bạn follow
            "WHERE f2.id = :userId " + // Người đang đăng nhập
            "AND u.id NOT IN (SELECT f.id FROM User f JOIN f.followers me WHERE me.id = :userId) " + // Chưa follow
            "AND u.id != :userId " + // Không gợi ý chính mình
            "ORDER BY SIZE(u.followers) DESC")
    List<User> suggestUsers(@Param("userId") Long userId);

    @Query("select u from User u " +
            "left join u.followers f "+
            "where u.id != :userId " +
            "and u.id not in (SELECT f.id FROM User f JOIN f.followers me WHERE me.id = :userId) " +
            "group by u.id " +
            "order by count(f) desc")
    List<User> getUserWithMostFollowers(@Param("userId") Long userId);

    @Query("select u from User u " +
            "join u.followings f " +
            "where f.id = :userId")
    List<User> getUserFollowers(@Param("userId") Long userId);

    @Query("select u from User u " +
            "join u.followers f " +
            "where f.id = :userId")
    List<User> getUserFollowings(@Param("userId") Long userId);
    Optional<User> findByResetToken(String resetToken);
}

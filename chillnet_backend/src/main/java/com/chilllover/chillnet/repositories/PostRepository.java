package com.chilllover.chillnet.repositories;

import com.chilllover.chillnet.entities.Post;
import com.chilllover.chillnet.entities.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostRepository extends JpaRepository<Post,Long> {
    List<Post> findAllByIsPostTrueOrderByCreatedAtDesc();
    @Query("select s.post from Share s where s.user in :followedUsers order by s.createdAt desc")
    List<Post> findSharedPostsByFollowedUsers(@Param("followedUsers") List<User> followedUsers);
    @Query("select distinct p from Post p " +
            "where p.user = :user " +
            "and p.isPost = true " +
            "order by p.createdAt desc")
    List<Post> findUserPosts(@Param("user") User user);

    @Query("select p from Post p join p.likes l " +
            "where l.user.id = :id " +
            "and p.isPost = true " +
            "order by p.createdAt desc")
    List<Post> findUserLikedPosts(@Param("id") Long id);

    @Query("select p from Post p where :user member of p.savedUsers order by p.createdAt desc")
    List<Post> findUserSavedPosts(@Param("user") User user);

    @Query("SELECT p FROM Post p " +
            "JOIN p.user u " +
            "JOIN u.followers f " +
            "WHERE f.id = :userId " +
            "AND p.isPost = true " +
            "ORDER BY p.createdAt DESC")
    List<Post> findFollowedUserPosts(@Param("userId") Long userId);

    @Query("SELECT p FROM Post p " +
            "LEFT JOIN p.likes l " +
            "LEFT JOIN p.comments c " +
            "LEFT JOIN p.shares sh " +
            "LEFT JOIN p.savedUsers s " +
            "WHERE p.isPost = true " +
            "GROUP BY p " +
            "ORDER BY (COUNT(c) + COUNT(s) + COUNT(sh) + COUNT(l)) DESC, p.createdAt DESC")
    List<Post> findTrendingPosts(Pageable pageable);
}

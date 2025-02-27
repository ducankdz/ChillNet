package com.chilllover.chillnet.repositories;

import com.chilllover.chillnet.entities.Share;
import com.chilllover.chillnet.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ShareRepository extends JpaRepository<Share, Long> {
    @Query("select s from Share s " +
            "where s.user.id = :userId " +
            "and s.post.id = :postId")
    Share shareExisted(@Param("userId") Long userId,
                       @Param("postId") Long postId);
    @Query("select s from Share s where s.user in :followers")
    List<Share> findSharesByUsers(@Param("followers") List<User> followers);
}

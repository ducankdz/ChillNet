package com.chilllover.chillnet.repositories;

import com.chilllover.chillnet.entities.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LikeRepository extends JpaRepository<Like, Long> {
    @Query("select l from Like l " +
            "where :userId = l.user.id " +
            "and :postId = l.post.id")
    Like likeExisted(@Param("userId") Long userId,
                    @Param("postId") Long postId);
    List<Like> findByPostId(Long postId);
}

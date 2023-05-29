package com.socialnetwork.demo.repositories;

import com.socialnetwork.demo.models.Post;
import com.socialnetwork.demo.models.User;
import com.socialnetwork.demo.models.Vote;
import com.socialnetwork.demo.utils.VoteType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Integer> {
  Integer countByPostAndType(Post post, VoteType type);
  Optional<Vote> findByUserAndPost(User user, Post post);}


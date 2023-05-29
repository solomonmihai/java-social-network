package com.socialnetwork.demo.repositories;

import com.socialnetwork.demo.models.Comment;
import com.socialnetwork.demo.models.Post;
import com.socialnetwork.demo.utils.VoteType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {
  List<Comment> findByPost(Post post);
  Integer countByPost(Post post);
}

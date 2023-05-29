package com.socialnetwork.demo.services;

import com.socialnetwork.demo.dto.CommentDto;
import com.socialnetwork.demo.exceptions.NotFoundException;
import com.socialnetwork.demo.models.Comment;
import com.socialnetwork.demo.models.Post;
import com.socialnetwork.demo.models.User;
import com.socialnetwork.demo.repositories.CommentRepository;
import com.socialnetwork.demo.repositories.PostRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService extends AuthenticatedService {
  public final CommentRepository commentRepository;
  public final PostRepository postRepository;
  public final ModelMapper modelMapper;

  private List<CommentDto> findCommentsByPostToDto(Post post) {
    List<Comment> comments = commentRepository.findByPost(post);
    return comments.stream().map(comment -> modelMapper.map(comment, CommentDto.class)).toList();
  }

  public List<CommentDto> getCommentsForPost(Integer postId) {
    Optional<Post> optionalPost = postRepository.findById(postId);
    if (optionalPost.isEmpty()) {
      throw new NotFoundException("post not found");
    }

    Post post = optionalPost.get();

    return findCommentsByPostToDto(post);
  }

  public List<CommentDto> newComment(Comment comment) {
    Optional<Post> optionalPost = postRepository.findById(comment.getPost().getId());
    if (optionalPost.isEmpty()) {
      throw new NotFoundException("post not found");
    }

    Post post = optionalPost.get();

    User user = getAuthenticatedUser();

    comment.setPost(post);
    comment.setUser(user);
    comment.setDate(new Date());

    commentRepository.save(comment);

    return findCommentsByPostToDto(post);
  }

  public List<CommentDto> deleteComment(Integer commentId) {
    Optional<Comment> optionalComment = commentRepository.findById(commentId);
    if (optionalComment.isEmpty()) {
      throw new NotFoundException("comment not found");
    }

    Comment comment = optionalComment.get();

    Optional<Post> optionalPost = postRepository.findById(comment.getPost().getId());
    if (optionalPost.isEmpty()) {
      throw new NotFoundException("post not found");
    }

    Post post = optionalPost.get();

    User user = getAuthenticatedUser();

    if (Objects.equals(user.getId(), comment.getUser().getId())) {
      commentRepository.delete(comment);
    }

    return findCommentsByPostToDto(post);
  }

  public Integer getCommentCount(Integer postId) {
    Optional<Post> optionalPost = postRepository.findById(postId);
    if (optionalPost.isEmpty()) {
      throw new NotFoundException("post not found");
    }

    Post post = optionalPost.get();

    return commentRepository.countByPost(post);
  }
}

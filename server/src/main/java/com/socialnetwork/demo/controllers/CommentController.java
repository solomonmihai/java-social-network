package com.socialnetwork.demo.controllers;

import com.socialnetwork.demo.dto.CommentDto;
import com.socialnetwork.demo.exceptions.NotFoundException;
import com.socialnetwork.demo.models.Comment;
import com.socialnetwork.demo.services.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/comments")
@RequiredArgsConstructor
public class CommentController {
  public final CommentService commentService;
  @PostMapping("/new")
  public ResponseEntity<List<CommentDto>> newComment(@RequestBody Comment comment) {
    try {
      return ResponseEntity.ok(commentService.newComment(comment));
    } catch (NotFoundException exception) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }

  @RequestMapping(path = "/delete/{commentId}", method = RequestMethod.DELETE)
  public ResponseEntity<List<CommentDto>> deleteComment(@PathVariable Integer commentId) {
    try {
      return ResponseEntity.ok(commentService.deleteComment(commentId));
    } catch (NotFoundException exception) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }

  @GetMapping("/post/{postId}")
  public ResponseEntity<List<CommentDto>> getCommentsForPost(@PathVariable Integer postId) {
    try {
      return ResponseEntity.ok(commentService.getCommentsForPost(postId));
    } catch (NotFoundException exception) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }

  @GetMapping("/post/{postId}/count")
  public ResponseEntity<Integer> getCommentCountForPost(@PathVariable Integer postId) {
    try {
      return ResponseEntity.ok(commentService.getCommentCount(postId));
    } catch (NotFoundException exception) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }
}

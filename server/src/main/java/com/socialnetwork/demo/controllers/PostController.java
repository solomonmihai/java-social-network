package com.socialnetwork.demo.controllers;

import com.socialnetwork.demo.dto.PostDto;
import com.socialnetwork.demo.exceptions.NotFoundException;
import com.socialnetwork.demo.models.Post;
import com.socialnetwork.demo.services.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.DELETE;

@RestController
@RequestMapping(path = "/api/posts")
@RequiredArgsConstructor
public class PostController {
  private final PostService postService;
  @PostMapping("/new")
  public ResponseEntity<PostDto> newPost(@RequestBody Post post) {
    return ResponseEntity.ok(postService.newPost(post));
  }

  @GetMapping("/all")
  public ResponseEntity<List<PostDto>> allPosts() {
    return ResponseEntity.ok(postService.getAllPosts());
  }

  @GetMapping("/{postId}")
  public ResponseEntity<PostDto> getPost(@PathVariable("postId") Integer postId) {
    try {
      return ResponseEntity.ok(postService.getPost(postId));
    } catch (NotFoundException exception) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }

  @GetMapping("/user/{userId}")
  public ResponseEntity<List<PostDto>> getUserPosts(@PathVariable("userId") Integer userId) {
    try {
      return ResponseEntity.ok(postService.getUserPosts(userId));
    } catch (NotFoundException exception) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }

  @RequestMapping(value = "/delete/{postId}", method = DELETE)
  public ResponseEntity<Boolean> deletePost(@PathVariable("postId") Integer postId) {
    return ResponseEntity.ok(postService.deletePost(postId));
  }
}

package com.socialnetwork.demo.controllers.account;

import com.socialnetwork.demo.dto.PostDto;
import com.socialnetwork.demo.models.Post;
import com.socialnetwork.demo.services.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
}

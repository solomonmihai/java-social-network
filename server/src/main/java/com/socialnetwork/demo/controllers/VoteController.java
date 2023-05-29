package com.socialnetwork.demo.controllers;

import com.socialnetwork.demo.dto.PostScoreDto;
import com.socialnetwork.demo.dto.VoteRequestDto;
import com.socialnetwork.demo.exceptions.NotFoundException;
import com.socialnetwork.demo.services.VoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/votes")
@RequiredArgsConstructor
public class VoteController {
  private final VoteService voteService;

  @GetMapping("/post/{postId}/score")
  public ResponseEntity<PostScoreDto> getPostScore(@PathVariable("postId") Integer postId) {
    try {
      return ResponseEntity.ok(voteService.getPostScore(postId));
    } catch (NotFoundException exception) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }

  @PostMapping("/vote")
  public ResponseEntity<PostScoreDto> votePost(@RequestBody VoteRequestDto voteRequest) {
    try {
      return ResponseEntity.ok(voteService.votePost(voteRequest));
    } catch (NotFoundException exception) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }
}

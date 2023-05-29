package com.socialnetwork.demo.services;

import com.socialnetwork.demo.dto.PostScoreDto;
import com.socialnetwork.demo.dto.VoteRequestDto;
import com.socialnetwork.demo.exceptions.NotFoundException;
import com.socialnetwork.demo.models.Post;
import com.socialnetwork.demo.models.User;
import com.socialnetwork.demo.models.Vote;
import com.socialnetwork.demo.repositories.PostRepository;
import com.socialnetwork.demo.repositories.VoteRepository;
import com.socialnetwork.demo.utils.VoteType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VoteService extends AuthenticatedService {
  private final VoteRepository voteRepository;
  private final PostRepository postRepository;

  public PostScoreDto getPostScore(Integer postId) {
    Optional<Post> optionalPost = postRepository.findById(postId);
    if (optionalPost.isEmpty()) {
      throw new NotFoundException("post not found");
    }

    Post post = optionalPost.get();
    User user = getAuthenticatedUser();

    Integer upVotes = voteRepository.countByPostAndType(post, VoteType.UP);
    Integer downVotes = voteRepository.countByPostAndType(post, VoteType.DOWN);
    Integer score = upVotes - downVotes;

    Optional<Vote> optionalOwnVote = voteRepository.findByUserAndPost(user, post);
    VoteType ownVote = null;
    if (optionalOwnVote.isPresent()) {
      ownVote = optionalOwnVote.get().getType();
    }

    return PostScoreDto.builder().score(score).ownVote(ownVote).postId(postId).build();
  }

  public PostScoreDto votePost(VoteRequestDto voteRequest) {
    Optional<Post> optionalPost = postRepository.findById(voteRequest.getPostId());
    if (optionalPost.isEmpty()) {
      throw new NotFoundException("post not found");
    }

    User user = getAuthenticatedUser();
    Post post = optionalPost.get();

    Optional<Vote> optionalOldVote = voteRepository.findByUserAndPost(user, post);

    if (optionalOldVote.isPresent()) {
      Vote oldVote = optionalOldVote.get();
      if (voteRequest.getVoteType() == oldVote.getType()) {
        voteRepository.delete(oldVote);
      } else {
        oldVote.setType(voteRequest.getVoteType());
        voteRepository.save(oldVote);
      }
      return getPostScore(voteRequest.getPostId());
    }

    Vote vote = Vote.builder()
        .post(post)
        .user(user)
        .type(voteRequest.getVoteType())
        .build();

    voteRepository.save(vote);

    return getPostScore(voteRequest.getPostId());
  }
}

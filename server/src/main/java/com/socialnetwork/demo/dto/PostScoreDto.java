package com.socialnetwork.demo.dto;

import com.socialnetwork.demo.utils.VoteType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Component
public class PostScoreDto {
  Integer postId;
  Integer score;
  VoteType ownVote;
}

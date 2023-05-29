package com.socialnetwork.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Component
public class CommentDto {
  Integer id;
  AccountDto user;
  PostDto post;
  String content;
  Date date;
}

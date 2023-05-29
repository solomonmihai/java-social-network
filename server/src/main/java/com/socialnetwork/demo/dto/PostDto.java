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
public class PostDto {
  private Integer id;
  private AccountDto user;
  private String title;
  private String content;
  private Date date;
}

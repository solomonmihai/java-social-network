package com.socialnetwork.demo.controllers;

import com.socialnetwork.demo.dto.AccountDto;
import com.socialnetwork.demo.exceptions.NotFoundException;
import com.socialnetwork.demo.services.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class AccountController {
  public final AccountService accountService;
  @GetMapping("/me")
  public AccountDto getOwnData() {
    return accountService.getOwnData();
  }

  @GetMapping("/{userId}")
  public ResponseEntity<AccountDto> getUserData(@PathVariable("userId") Integer userId) {
    try {
      return ResponseEntity.ok(accountService.getUserData(userId));
    } catch (NotFoundException exception) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }
}

package com.socialnetwork.demo.controllers.account;

import com.socialnetwork.demo.dto.AccountDto;
import com.socialnetwork.demo.services.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/account")
@RequiredArgsConstructor
public class AccountController {
  public final AccountService accountService;
  @GetMapping("/me")
  public AccountDto getUserData() {
    return accountService.getUserData();
  }
}

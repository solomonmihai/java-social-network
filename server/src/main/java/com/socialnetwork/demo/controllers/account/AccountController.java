package com.socialnetwork.demo.account;

import com.socialnetwork.demo.user.User;
import com.socialnetwork.demo.user.UserRepository;
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
  public User getUserData() {
    return accountService.getUserData();
  }
}

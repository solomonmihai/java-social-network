package com.socialnetwork.demo.account;

import com.socialnetwork.demo.user.User;
import com.socialnetwork.demo.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountService {

  private final UserRepository userRepository;
  public User getUserData() {
    String email = SecurityContextHolder.getContext().getAuthentication().getName();

    User user = userRepository.findByEmail(email).orElseThrow();

    return user;
  }
}

package com.socialnetwork.demo.services;

import com.socialnetwork.demo.models.User;
import com.socialnetwork.demo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;

public abstract class AuthenticatedService {

  @Autowired
  private UserRepository userRepository;

  protected User getAuthenticatedUser() {
    String email = SecurityContextHolder.getContext().getAuthentication().getName();
    return userRepository.findByEmail(email).orElseThrow();
  }

  // Other common methods or functionality for authenticated services
}
package com.socialnetwork.demo.services;

import com.socialnetwork.demo.dto.AccountDto;
import com.socialnetwork.demo.exceptions.NotFoundException;
import com.socialnetwork.demo.models.User;
import com.socialnetwork.demo.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AccountService extends AuthenticatedService {

  private final UserRepository userRepository;
  private final ModelMapper modelMapper;
  public AccountDto getOwnData() {
    User user = getAuthenticatedUser();

    return modelMapper.map(user, AccountDto.class);
  }

  public AccountDto getUserData(Integer userId) {
    Optional<User> optionalUser = userRepository.findById(userId);

    if (optionalUser.isEmpty()) {
      throw new NotFoundException("user not found");
    }

    return modelMapper.map(optionalUser.get(), AccountDto.class);
  }
}

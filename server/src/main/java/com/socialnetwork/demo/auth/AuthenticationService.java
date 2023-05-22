package com.socialnetwork.demo.auth;

import com.socialnetwork.demo.config.JwtService;
import com.socialnetwork.demo.user.Role;
import com.socialnetwork.demo.user.User;
import com.socialnetwork.demo.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authManager;

  private boolean validateEmail(String email) {
    String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
    return email.matches(emailRegex);
  }

  private boolean validateLength(String field, int min, int max) {
    return field.length() >= min && field.length() <= max;
  }

  public AuthenticationResponse register(RegisterRequest request) {
    if (!validateLength(request.getFirstName().trim(), 1, 16)) {
      return AuthenticationResponse.builder().error(
          AuthenticationResponseError.builder().firstName("1 <= firstName.length <= 16").build()
      ).build();
    }

    if (!validateLength(request.getLastName().trim(), 1, 16)) {
      return AuthenticationResponse.builder().error(
          AuthenticationResponseError.builder().lastName("1 <= lastName.length <= 16").build()
      ).build();
    }

    if (!validateEmail(request.getEmail().trim())) {
      return AuthenticationResponse.builder().error(
          AuthenticationResponseError.builder().email("email is not valid").build()
      ).build();
    }

    if (!validateLength(request.getPassword().trim(), 8, 16)) {
      return AuthenticationResponse.builder().error(
          AuthenticationResponseError.builder().email("password must be between 8 and 16 characters").build()
      ).build();
    }

    User user = User.builder()
        .firstName(request.getFirstName().trim())
        .lastName(request.getLastName().trim())
        .email(request.getEmail().trim())
        .password(passwordEncoder.encode(request.getPassword().trim()))
        .role(Role.USER)
        .build();

    userRepository.save(user);

    String token = jwtService.generateToken(user);

    return AuthenticationResponse.builder()
        .token(token)
        .build();
  }

  public AuthenticationResponse login(LoginRequest request) {
    authManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            request.getEmail(), request.getPassword()
        )
    );

    User user = userRepository.findByEmail(request.getEmail()).orElseThrow();

    String token = jwtService.generateToken(user);

    return AuthenticationResponse.builder()
        .token(token)
        .build();
  }
}

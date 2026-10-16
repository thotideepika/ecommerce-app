package com.ecommerce.service;

import com.ecommerce.dto.AuthRequest;
import com.ecommerce.dto.AuthResponse;
import com.ecommerce.entity.User;
import com.ecommerce.repository.UserRepository;
import com.ecommerce.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthResponse register(AuthRequest req) {
        if (req.getUsername() == null || req.getUsername().isBlank())
            throw new RuntimeException("Username required");
        if (req.getEmail() == null || req.getEmail().isBlank())
            throw new RuntimeException("Email required");
        if (req.getPassword() == null || req.getPassword().length() < 4)
            throw new RuntimeException("Password too short");

        if (userRepository.existsByUsername(req.getUsername()))
            throw new RuntimeException("Username already exists");
        if (userRepository.existsByEmail(req.getEmail()))
            throw new RuntimeException("Email already exists");

        User user = User.builder()
                .username(req.getUsername().trim())
                .email(req.getEmail().trim())
                .password(passwordEncoder.encode(req.getPassword()))
                .phone(req.getPhone() != null ? req.getPhone() : "")
                .address(req.getAddress() != null ? req.getAddress() : "")
                .role(User.Role.CUSTOMER)
                .build();

        user = userRepository.save(user);

        String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name());
        return new AuthResponse(token, user.getUsername(), user.getRole().name());
    }

    public AuthResponse login(AuthRequest req) {
        User user = userRepository.findByUsername(req.getUsername())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));
        if (!passwordEncoder.matches(req.getPassword(), user.getPassword()))
            throw new RuntimeException("Invalid credentials");
        String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name());
        return new AuthResponse(token, user.getUsername(), user.getRole().name());
    }

    public User getCurrentUser(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
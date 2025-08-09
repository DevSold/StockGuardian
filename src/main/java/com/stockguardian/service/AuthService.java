package com.stockguardian.service;

import com.stockguardian.dto.AuthResponse;
import com.stockguardian.dto.LoginRequest;
import com.stockguardian.dto.RegisterRequest;
import com.stockguardian.model.Role;
import com.stockguardian.model.User;
import com.stockguardian.repository.UserRepository;
import com.stockguardian.security.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JWTUtil jwtUtil;

    // Registro
    public AuthResponse register(RegisterRequest req) {
        // valida duplicidade (cobre username OU email numa tacada só)
        if (userRepository.existsByUsernameOrEmail(req.getUsername(), req.getEmail())) {
            throw new IllegalArgumentException("Usuário ou e-mail já em uso");
        }

        User user = new User();
        user.setUsername(req.getUsername());
        user.setEmail(req.getEmail());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.getRoles().add(Role.USER);
        user.setEnabled(true);

        User saved = userRepository.save(user);
        String token = jwtUtil.generateToken(saved.getUsername());

        return new AuthResponse(token, saved.getUsername(), saved.getEmail());
    }

    // Login
    public AuthResponse login(LoginRequest req) {
        // tenta por username OU por email usando o mesmo valor
        User user = userRepository
                .findByUsernameOrEmail(req.getUsernameOrEmail(), req.getUsernameOrEmail())
                .orElseThrow(() -> new IllegalArgumentException("Credenciais inválidas"));

        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Credenciais inválidas");
        }

        String token = jwtUtil.generateToken(user.getUsername());
        return new AuthResponse(token, user.getUsername(), user.getEmail());
    }
}

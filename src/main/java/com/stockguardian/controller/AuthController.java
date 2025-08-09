package com.stockguardian.controller;

import com.stockguardian.dto.AuthResponse;
import com.stockguardian.dto.LoginRequest;
import com.stockguardian.dto.RegisterRequest;
import com.stockguardian.model.Role;
import com.stockguardian.model.User;
import com.stockguardian.repository.UserRepository;
import com.stockguardian.security.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JWTUtil jwtUtil;
    private final AuthenticationManager authenticationManager; // 👈 injeta aqui

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        if (req.getUsername() == null || req.getEmail() == null || req.getPassword() == null) {
            return ResponseEntity.badRequest().body("Informe username, email e password.");
        }
        if (userRepo.existsByUsernameOrEmail(req.getUsername(), req.getEmail())) {
            return ResponseEntity.badRequest().body("Usuário ou e-mail já em uso.");
        }

        User u = new User();
        u.setUsername(req.getUsername());
        u.setEmail(req.getEmail());
        u.setPassword(passwordEncoder.encode(req.getPassword()));
        u.getRoles().add(Role.USER);
        u.setEnabled(true);
        userRepo.save(u);

        String token = jwtUtil.generateToken(u.getUsername());
        return ResponseEntity.ok(new AuthResponse(token, u.getUsername(), u.getEmail()));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        if (req.getUsernameOrEmail() == null || req.getPassword() == null) {
            return ResponseEntity.badRequest().body("Informe usernameOrEmail e password.");
        }
        try {
            var auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(req.getUsernameOrEmail(), req.getPassword())
            );

            var principal = (UserDetails) auth.getPrincipal();
            var dbUser = userRepo.findByUsernameOrEmail(principal.getUsername(), principal.getUsername())
                    .orElseThrow(); // deve existir
            String token = jwtUtil.generateToken(principal.getUsername());
            return ResponseEntity.ok(new AuthResponse(token, dbUser.getUsername(), dbUser.getEmail()));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).body("Credenciais inválidas.");
        }
    }
}

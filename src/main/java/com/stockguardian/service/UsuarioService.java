package com.stockguardian.service;

import com.stockguardian.model.User;
import com.stockguardian.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UserRepository userRepository;
    public UsuarioService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> buscarPorEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User salvar(User user) {
        return userRepository.save(user);
    }

    public Optional<User> buscarPorId(Long id) {
        return userRepository.findById(id);
    }
}

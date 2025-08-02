package com.stockguardian.config;

import com.stockguardian.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            String emailAdmin = "admin@stockguardian.com";
            if (usuarioRepository.findByEmail(emailAdmin).isEmpty()) {
                Usuario admin = new Usuario();
                admin.setNome("Administrador");
                admin.setEmail(emailAdmin);
                admin.setSenha(passwordEncoder.encode("123456"));

                usuarioRepository.save(admin);
                System.out.println("✅ Usuário admin criado com sucesso: " + emailAdmin + " / 123456");
            } else {
                System.out.println("ℹ️ Usuário admin já existe: " + emailAdmin);
            }
        };
    }
}

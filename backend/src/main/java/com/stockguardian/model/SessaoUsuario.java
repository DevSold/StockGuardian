// Entidade SessaoUsuario.java
package com.stockguardian.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class SessaoUsuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private LocalDateTime loginAt;
    private LocalDateTime logoutAt;

    public SessaoUsuario() {}

    public SessaoUsuario(String email, LocalDateTime loginAt) {
        this.email = email;
        this.loginAt = loginAt;
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDateTime getLoginAt() {
        return loginAt;
    }

    public void setLoginAt(LocalDateTime loginAt) {
        this.loginAt = loginAt;
    }

    public LocalDateTime getLogoutAt() {
        return logoutAt;
    }

    public void setLogoutAt(LocalDateTime logoutAt) {
        this.logoutAt = logoutAt;
    }
}

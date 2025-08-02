package com.stockguardian.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class SenhaEncoder {
    public static void main(String[] args) {
        String senhaCriptografada = new BCryptPasswordEncoder().encode("123456");
        System.out.println("Senha criptografada: " + senhaCriptografada);
    }
}

package com.stockguardian.controller;

import com.stockguardian.model.SessaoUsuario;
import com.stockguardian.repository.SessaoUsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/sessoes")
public class SessaoUsuarioController {

    @Autowired
    private SessaoUsuarioRepository sessaoRepo;

    @PostMapping("/login")
    public SessaoUsuario registrarLogin(@RequestBody String email) {
        SessaoUsuario sessao = new SessaoUsuario(email, LocalDateTime.now());
        return sessaoRepo.save(sessao);
    }

    @PostMapping("/logout/{id}")
    public ResponseEntity<SessaoUsuario> registrarLogout(@PathVariable Long id) {
        return sessaoRepo.findById(id).map(sessao -> {
            sessao.setLogoutAt(LocalDateTime.now());
            return ResponseEntity.ok(sessaoRepo.save(sessao));
        }).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<SessaoUsuario> listarSessoes() {
        return sessaoRepo.findAll();
    }

    @GetMapping("/usuario/{email}")
    public List<SessaoUsuario> listarSessoesPorEmail(@PathVariable String email) {
        return sessaoRepo.findByEmail(email);
    }
}

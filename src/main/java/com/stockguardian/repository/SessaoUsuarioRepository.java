package com.stockguardian.repository;

import com.stockguardian.model.SessaoUsuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SessaoUsuarioRepository extends JpaRepository<SessaoUsuario, Long> {
    List<SessaoUsuario> findByEmail(String email);
}

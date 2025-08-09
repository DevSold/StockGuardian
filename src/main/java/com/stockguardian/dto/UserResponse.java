package com.stockguardian.dto;

import lombok.Builder;
import lombok.Data;
import java.time.Instant;
import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class UserResponse {
    private Long id;
    private String username;
    private String email;
    private Set<String> roles;
    private Instant createdAt;
}

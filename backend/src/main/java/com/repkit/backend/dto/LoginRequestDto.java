package com.repkit.backend.dto;

public record LoginRequestDto(
        String username,
        String password
) {
}

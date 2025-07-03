package com.repkit.backend.dto;

public record LoginResponseDto(
        String accessToken,
        String refreshToken,
        String tokenType,
        UserInfoDto user
) {
    public LoginResponseDto(String accessToken, String refreshToken, UserInfoDto user) {
        this(accessToken, refreshToken, "Bearer", user);
    }
}

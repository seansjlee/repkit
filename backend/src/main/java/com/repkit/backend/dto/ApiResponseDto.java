package com.repkit.backend.dto;

public record ApiResponseDto<T>(
        boolean success,
        String message,
        T data
) {
    public static <T> ApiResponseDto success(T data) {
        return new ApiResponseDto<>(true, "Success", data);
    }

    public static <T> ApiResponseDto success(String message, T data) {
        return new ApiResponseDto<>(true, message, data);
    }

    public static <T> ApiResponseDto error(String message) {
        return new ApiResponseDto<>(false, message, null);
    }
}

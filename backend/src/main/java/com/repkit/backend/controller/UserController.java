package com.repkit.backend.controller;

import com.repkit.backend.domain.entity.User;
import com.repkit.backend.dto.ApiResponseDto;
import com.repkit.backend.dto.UserDto;
import com.repkit.backend.dto.UserInfoDto;
import com.repkit.backend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/api/user")
    public ResponseEntity<ApiResponseDto<Void>> signUp(@RequestBody UserDto userDto) {
        try {
            userService.saveUser(userDto);
            return ResponseEntity.ok(ApiResponseDto.success("User registered successfully", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponseDto.error("Registration failed: " + e.getMessage()));
        }
    }

    @GetMapping("/api/user/me")
    public ResponseEntity<ApiResponseDto<UserInfoDto>> getCurrentUser(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401)
                    .body(ApiResponseDto.error("User not autenticated"));
        }

        try {
            User user = userService.findByUsername(authentication.getName());
            UserInfoDto userInfo = new UserInfoDto(user.getId(), user.getUsername());
            return ResponseEntity.ok(ApiResponseDto.success(userInfo));
        } catch (Exception e) {
            return ResponseEntity.status(404)
                    .body(ApiResponseDto.error("User not found"));
        }
    }
}

package com.repkit.backend.controller;

import com.repkit.backend.config.jwt.JwtUtil;
import com.repkit.backend.domain.entity.User;
import com.repkit.backend.dto.*;
import com.repkit.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;
    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponseDto<LoginResponseDto>> login(@RequestBody LoginRequestDto loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.username(),
                            loginRequest.password()
                    )
            );

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            User user = userService.findByUsername(userDetails.getUsername());

            String accessToken = jwtUtil.generateAccessToken(userDetails);
            String refreshToken = jwtUtil.generateRefreshToken(userDetails);

            UserInfoDto userInfo = new UserInfoDto(user.getId(), user.getUsername());
            LoginResponseDto loginResponse = new LoginResponseDto(accessToken, refreshToken, userInfo);

            log.info("User {} successfully logged in", loginRequest.username());

            return ResponseEntity.ok(ApiResponseDto.success("Login successful", loginResponse));
        } catch (BadCredentialsException e) {
            log.warn("Failed login attempt for user: {}", loginRequest.username());
            return ResponseEntity.badRequest()
                    .body(ApiResponseDto.error("Invalid username or password"));
        } catch (Exception e) {
            log.error("Login error for user {}: {}", loginRequest.username(), e.getMessage());
            return ResponseEntity.internalServerError()
                    .body(ApiResponseDto.error("Login failed. Please try again."));
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponseDto<LoginResponseDto>> refresh(@RequestBody RefreshTokenRequestDto refreshRequest) {
        try {
            String refreshToken = refreshRequest.refreshToken();

            if (!jwtUtil.validateToken(refreshToken)) {
                return ResponseEntity.badRequest()
                        .body(ApiResponseDto.error("Invalid refresh token"));
            }

            String username = jwtUtil.getUsernameFromToken(refreshToken);
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            User user = userService.findByUsername(username);

            String newAccessToken = jwtUtil.generateAccessToken(userDetails);
            String newRefreshToken = jwtUtil.generateRefreshToken(userDetails);

            UserInfoDto userInfo = new UserInfoDto(user.getId(), user.getUsername());
            LoginResponseDto loginResponse = new LoginResponseDto(newAccessToken, newRefreshToken, userInfo);

            return ResponseEntity.ok(ApiResponseDto.success("Token refreshed successfully", loginResponse));
        } catch (Exception e) {
            log.error("Token refresh error: {}", e.getMessage());
            return ResponseEntity.badRequest()
                    .body(ApiResponseDto.error("Failed to refresh token"));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponseDto<Void>> logout() {
        return ResponseEntity.ok(ApiResponseDto.success("Logout successful", null));
    }
}

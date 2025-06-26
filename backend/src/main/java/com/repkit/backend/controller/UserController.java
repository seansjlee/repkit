package com.repkit.backend.controller;

import com.repkit.backend.dto.UserDto;
import com.repkit.backend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/api/user")
    public ResponseEntity<Void> signUp(@RequestBody UserDto userDto) {
        userService.saveUser(userDto);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/api/logout")
    public ResponseEntity<Void> logout(HttpServletRequest request, HttpServletResponse response) {
        new SecurityContextLogoutHandler().logout(
                request,
                response,
                SecurityContextHolder.getContext().getAuthentication()
        );

        return ResponseEntity.ok().build();
    }
}

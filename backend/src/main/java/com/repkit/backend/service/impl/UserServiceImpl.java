package com.repkit.backend.service.impl;

import com.repkit.backend.domain.entity.User;
import com.repkit.backend.domain.repository.UserRepository;
import com.repkit.backend.dto.UserDto;
import com.repkit.backend.mapper.UserMapper;
import com.repkit.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final UserMapper userMapper;

    @Override
    public UserDto saveUser(UserDto userDto) {
        User user = userMapper.fromDto(userDto);
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));

        User savedUser = userRepository.save(user);

        return userMapper.toDto(savedUser);
    }
}

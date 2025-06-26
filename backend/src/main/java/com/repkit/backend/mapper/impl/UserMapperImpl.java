package com.repkit.backend.mapper.impl;

import com.repkit.backend.domain.entity.User;
import com.repkit.backend.dto.UserDto;
import com.repkit.backend.mapper.UserMapper;
import org.springframework.stereotype.Component;

@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public User fromDto(UserDto userDto) {
        return User.builder()
                .username(userDto.username())
                .password(userDto.password())
                .build();
    }

    @Override
    public UserDto toDto(User user) {
        return new UserDto(user.getUsername(), null);
    }
}

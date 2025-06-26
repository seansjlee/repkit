package com.repkit.backend.mapper;

import com.repkit.backend.domain.entity.User;
import com.repkit.backend.dto.UserDto;

public interface UserMapper {

    User fromDto(UserDto userDto);
    UserDto toDto(User user);
}

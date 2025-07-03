package com.repkit.backend.service;

import com.repkit.backend.domain.entity.User;
import com.repkit.backend.dto.UserDto;

public interface UserService {

    UserDto saveUser(UserDto userDto);
    User findByUsername(String username);
}

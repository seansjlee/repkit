package com.repkit.backend.mapper;

import com.repkit.backend.domain.entity.User;
import com.repkit.backend.domain.entity.WorkoutSession;
import com.repkit.backend.dto.WorkoutSessionDto;

public interface WorkoutSessionMapper {

    WorkoutSession fromDto(WorkoutSessionDto workoutSessionDto, User user);
    WorkoutSessionDto toDto(WorkoutSession workoutSession);
}

package com.repkit.backend.mapper;

import com.repkit.backend.domain.entity.WorkoutSession;
import com.repkit.backend.dto.WorkoutSessionDto;

public interface WorkoutSessionMapper {

    WorkoutSession fromDto(WorkoutSessionDto workoutSessionDto);

    WorkoutSessionDto toDto(WorkoutSession workoutSession);
}

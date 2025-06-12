package com.repkit.backend.dto;

import com.repkit.backend.domain.entity.ExerciseSet;

import java.util.List;
import java.util.UUID;

public record ExerciseDto(
        UUID id,
        String name,
        int restSeconds,
        List<ExerciseSetDto> exerciseSets
) {
}

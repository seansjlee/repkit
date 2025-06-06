package com.repkit.backend.dto;

import java.util.List;
import java.util.UUID;

public record WorkoutSessionDto(
        UUID id,
        String name,
        List<ExerciseDto> exercises
) {
}

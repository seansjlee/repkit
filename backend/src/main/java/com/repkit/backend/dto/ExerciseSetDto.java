package com.repkit.backend.dto;

import java.util.UUID;

public record ExerciseSetDto(
        UUID id,
        int setNumber,
        double weight,
        int reps
) {
}

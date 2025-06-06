package com.repkit.backend.dto;

import java.util.UUID;

public record ExerciseDto(
        UUID id,
        String name,
        int sets,
        int reps,
        int restSeconds
) {
}

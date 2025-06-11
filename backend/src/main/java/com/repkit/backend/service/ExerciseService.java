package com.repkit.backend.service;

import com.repkit.backend.dto.ExerciseDto;

import java.util.List;
import java.util.UUID;

public interface ExerciseService {

    List<ExerciseDto> getAllExercises(UUID sessionId);
    ExerciseDto createExercise(UUID sessionId, ExerciseDto exerciseDto);
}

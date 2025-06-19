package com.repkit.backend.service;

import com.repkit.backend.dto.ExerciseDto;

import java.util.List;
import java.util.UUID;

public interface ExerciseService {

    List<ExerciseDto> getAllExercises(UUID sessionId);
    ExerciseDto createExercise(UUID sessionId, ExerciseDto exerciseDto);
    ExerciseDto getExerciseById(UUID sessionId, UUID exerciseId);
    ExerciseDto updateExercise(UUID sessionId, UUID exerciseId, ExerciseDto exerciseDto);
    void deleteExerciseById(UUID sessionId, UUID exerciseId);
}

package com.repkit.backend.controller;

import com.repkit.backend.dto.ExerciseDto;
import com.repkit.backend.service.ExerciseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/workout-sessions/{session_id}/exercises")
public class ExerciseController {

    private final ExerciseService exerciseService;

    public ExerciseController(ExerciseService exerciseService) {
        this.exerciseService = exerciseService;
    }

    @GetMapping
    public List<ExerciseDto> getAllExercises(@PathVariable("session_id")UUID sessionId) {
        return exerciseService.getAllExercises(sessionId);
    }

    @PostMapping
    public ExerciseDto createExercise(
            @PathVariable("session_id") UUID sessionId,
            @RequestBody ExerciseDto exerciseDto
    ) {
        return exerciseService.createExercise(sessionId, exerciseDto);
    }

    @GetMapping("/{exercise_id}")
    public ExerciseDto getExerciseById(
            @PathVariable("session_id") UUID sessionId,
            @PathVariable("exercise_id") UUID exerciseId
    ) {
        return exerciseService.getExerciseById(sessionId, exerciseId);
    }

    @PutMapping("/{exercise_id}")
    public ExerciseDto updateExercise(
            @PathVariable("session_id") UUID sessionId,
            @PathVariable("exercise_id") UUID exerciseId,
            @RequestBody ExerciseDto exerciseDto
    ) {
        return exerciseService.updateExercise(sessionId, exerciseId, exerciseDto);
    }

    @DeleteMapping("/{exercise_id}")
    public void deleteExerciseById(
            @PathVariable("session_id") UUID sessionId,
            @PathVariable("exercise_id") UUID exerciseId
    ) {
        exerciseService.deleteExerciseById(sessionId, exerciseId);
    }
}

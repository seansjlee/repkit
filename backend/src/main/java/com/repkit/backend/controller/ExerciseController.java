package com.repkit.backend.controller;

import com.repkit.backend.dto.ExerciseDto;
import com.repkit.backend.service.ExerciseService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}

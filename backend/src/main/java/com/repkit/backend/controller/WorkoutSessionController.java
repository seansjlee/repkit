package com.repkit.backend.controller;

import com.repkit.backend.dto.WorkoutSessionDto;
import com.repkit.backend.mapper.WorkoutSessionMapper;
import com.repkit.backend.service.WorkoutSessionService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/workout-sessions")
public class WorkoutSessionController {

    private final WorkoutSessionService workoutSessionService;
    private final WorkoutSessionMapper workoutSessionMapper;

    public WorkoutSessionController(WorkoutSessionService workoutSessionService, WorkoutSessionMapper workoutSessionMapper) {
        this.workoutSessionService = workoutSessionService;
        this.workoutSessionMapper = workoutSessionMapper;
    }

    @GetMapping
    public List<WorkoutSessionDto> listWorkoutSessions() {
        return workoutSessionService.listWorkoutSessions()
                .stream()
                .map(workoutSessionMapper::toDto)
                .toList();
    }
}

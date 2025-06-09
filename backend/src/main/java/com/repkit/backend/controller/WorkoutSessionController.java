package com.repkit.backend.controller;

import com.repkit.backend.dto.WorkoutSessionDto;
import com.repkit.backend.service.WorkoutSessionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workout-sessions")
public class WorkoutSessionController {

    private final WorkoutSessionService workoutSessionService;

    public WorkoutSessionController(WorkoutSessionService workoutSessionService) {
        this.workoutSessionService = workoutSessionService;
    }

    @GetMapping
    public List<WorkoutSessionDto> getWorkoutSessions() {
        return workoutSessionService.getAllWorkoutSessions();
    }

    @PostMapping
    public WorkoutSessionDto createWorkoutSession(@RequestBody WorkoutSessionDto workoutSessionDto) {
        return workoutSessionService.createWorkoutSession(workoutSessionDto);
    }
}

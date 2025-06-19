package com.repkit.backend.controller;

import com.repkit.backend.dto.WorkoutSessionDto;
import com.repkit.backend.service.WorkoutSessionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

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

    @GetMapping("/{session_id}")
    public WorkoutSessionDto getWorkoutSession(@PathVariable("session_id") UUID sessionId) {
        return workoutSessionService.getWorkoutSession(sessionId);
    }

    @PostMapping
    public WorkoutSessionDto createWorkoutSession(@RequestBody WorkoutSessionDto workoutSessionDto) {
        return workoutSessionService.createWorkoutSession(workoutSessionDto);
    }

    @PutMapping("/{session_id}")
    public WorkoutSessionDto updateWorkoutSession(
            @PathVariable("session_id") UUID sessionId,
            @RequestBody WorkoutSessionDto workoutSessionDto
    ) {
        return workoutSessionService.updateWorkoutSession(sessionId, workoutSessionDto);
    }

}

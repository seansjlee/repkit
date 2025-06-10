package com.repkit.backend.service;

import com.repkit.backend.dto.WorkoutSessionDto;

import java.util.List;
import java.util.UUID;

public interface WorkoutSessionService {

    List<WorkoutSessionDto> getAllWorkoutSessions();
    WorkoutSessionDto createWorkoutSession(WorkoutSessionDto workoutSessionDto);
    WorkoutSessionDto getWorkoutSession(UUID id);
    WorkoutSessionDto updateWorkoutSession(UUID id, WorkoutSessionDto workoutSessionDto);
    void deleteWorkoutSession(UUID id);
}

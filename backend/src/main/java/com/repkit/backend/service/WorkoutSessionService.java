package com.repkit.backend.service;

import com.repkit.backend.dto.WorkoutSessionDto;

import java.util.List;

public interface WorkoutSessionService {

    List<WorkoutSessionDto> getAllWorkoutSessions();
    WorkoutSessionDto createWorkoutSession(WorkoutSessionDto workoutSessionDto);
}

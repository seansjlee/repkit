package com.repkit.backend.service.impl;

import com.repkit.backend.domain.entity.WorkoutSession;
import com.repkit.backend.domain.repository.WorkoutSessionRepository;
import com.repkit.backend.service.WorkoutSessionService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkoutSessionServiceImpl implements WorkoutSessionService {

    private final WorkoutSessionRepository workoutSessionRepository;

    public WorkoutSessionServiceImpl(WorkoutSessionRepository workoutSessionRepository) {
        this.workoutSessionRepository = workoutSessionRepository;
    }

    @Override
    public List<WorkoutSession> getAllWorkoutSessions() {
        return workoutSessionRepository.findAll();
    }
}

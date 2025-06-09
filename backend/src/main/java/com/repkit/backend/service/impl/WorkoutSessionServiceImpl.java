package com.repkit.backend.service.impl;

import com.repkit.backend.domain.entity.WorkoutSession;
import com.repkit.backend.domain.repository.WorkoutSessionRepository;
import com.repkit.backend.dto.WorkoutSessionDto;
import com.repkit.backend.mapper.WorkoutSessionMapper;
import com.repkit.backend.service.WorkoutSessionService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkoutSessionServiceImpl implements WorkoutSessionService {

    private final WorkoutSessionRepository workoutSessionRepository;
    private final WorkoutSessionMapper workoutSessionMapper;

    public WorkoutSessionServiceImpl(WorkoutSessionRepository workoutSessionRepository, WorkoutSessionMapper workoutSessionMapper) {
        this.workoutSessionRepository = workoutSessionRepository;
        this.workoutSessionMapper = workoutSessionMapper;
    }

    @Override
    public List<WorkoutSessionDto> getAllWorkoutSessions() {
        return workoutSessionRepository.findAll()
                .stream()
                .map(workoutSessionMapper::toDto)
                .toList();
    }

    @Override
    public WorkoutSessionDto createWorkoutSession(WorkoutSessionDto workoutSessionDto) {
        if (null != workoutSessionDto.id()) {
            throw new IllegalArgumentException("Workout session already has an ID!");
        }
        if (null == workoutSessionDto.name() || workoutSessionDto.name().isBlank()) {
            throw new IllegalArgumentException("Workout session name cannot be empty!");
        }

        WorkoutSession createdWorkoutSession = workoutSessionRepository.save(new WorkoutSession(
                null,
                workoutSessionDto.name(),
                null
        ));

        return workoutSessionMapper.toDto(createdWorkoutSession);
    }
}

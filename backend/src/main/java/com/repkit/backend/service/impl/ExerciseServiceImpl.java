package com.repkit.backend.service.impl;

import com.repkit.backend.domain.entity.Exercise;
import com.repkit.backend.domain.entity.WorkoutSession;
import com.repkit.backend.domain.repository.ExerciseRepository;
import com.repkit.backend.domain.repository.WorkoutSessionRepository;
import com.repkit.backend.dto.ExerciseDto;
import com.repkit.backend.mapper.ExerciseMapper;
import com.repkit.backend.service.ExerciseService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ExerciseServiceImpl implements ExerciseService {

    private final ExerciseRepository exerciseRepository;
    private final ExerciseMapper exerciseMapper;
    private final WorkoutSessionRepository workoutSessionRepository;

    public ExerciseServiceImpl(ExerciseRepository exerciseRepository, ExerciseMapper exerciseMapper, WorkoutSessionRepository workoutSessionRepository) {
        this.exerciseRepository = exerciseRepository;
        this.exerciseMapper = exerciseMapper;
        this.workoutSessionRepository = workoutSessionRepository;
    }

    @Override
    public List<ExerciseDto> getAllExercises(UUID sessionId) {
        return exerciseRepository.findAllByWorkoutSessionId(sessionId)
                .stream()
                .map(exerciseMapper::toDto)
                .toList();
    }

    @Override
    public ExerciseDto createExercise(UUID sessionId, ExerciseDto exerciseDto) {
        if (null != exerciseDto.id()) {
            throw new IllegalArgumentException("Exercise already has an ID!");
        }
        if (null == exerciseDto.name() || exerciseDto.name().isBlank()) {
            throw new IllegalArgumentException("Exercise name cannot be empty!");
        }

        WorkoutSession workoutSession = workoutSessionRepository.findById(sessionId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Workout Session ID provided!"));

        Exercise createdExercise = exerciseRepository.save(new Exercise(
                null,
                exerciseDto.name(),
                exerciseDto.sets(),
                exerciseDto.reps(),
                exerciseDto.restSeconds(),
                workoutSession
        ));

        return exerciseMapper.toDto(createdExercise);
    }
}

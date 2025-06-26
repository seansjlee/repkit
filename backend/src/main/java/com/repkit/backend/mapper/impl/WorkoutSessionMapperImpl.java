package com.repkit.backend.mapper.impl;

import com.repkit.backend.domain.entity.User;
import com.repkit.backend.domain.entity.WorkoutSession;
import com.repkit.backend.dto.WorkoutSessionDto;
import com.repkit.backend.mapper.ExerciseMapper;
import com.repkit.backend.mapper.WorkoutSessionMapper;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class WorkoutSessionMapperImpl implements WorkoutSessionMapper {

    private final ExerciseMapper exerciseMapper;

    public WorkoutSessionMapperImpl(ExerciseMapper exerciseMapper) {
        this.exerciseMapper = exerciseMapper;
    }

    @Override
    public WorkoutSession fromDto(WorkoutSessionDto workoutSessionDto, User user) {
        return new WorkoutSession(
                workoutSessionDto.id(),
                workoutSessionDto.name(),
                Optional.ofNullable(workoutSessionDto.exercises())
                        .map(exercises -> exercises.stream().map(exerciseMapper::fromDto).toList())
                        .orElse(null),
                user
        );
    }

    @Override
    public WorkoutSessionDto toDto(WorkoutSession workoutSession) {
        return new WorkoutSessionDto(
                workoutSession.getId(),
                workoutSession.getName(),
                Optional.ofNullable(workoutSession.getExercises())
                        .map(exercises -> exercises.stream().map(exerciseMapper::toDto).toList())
                        .orElse(null)
        );
    }
}

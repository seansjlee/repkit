package com.repkit.backend.mapper.impl;

import com.repkit.backend.domain.entity.Exercise;
import com.repkit.backend.dto.ExerciseDto;
import com.repkit.backend.mapper.ExerciseMapper;
import com.repkit.backend.mapper.ExerciseSetMapper;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class ExerciseMapperImpl implements ExerciseMapper {

    private final ExerciseSetMapper exerciseSetMapper;

    public ExerciseMapperImpl(ExerciseSetMapper exerciseSetMapper) {
        this.exerciseSetMapper = exerciseSetMapper;
    }

    @Override
    public Exercise fromDto(ExerciseDto exerciseDto) {
        return new Exercise(
                exerciseDto.id(),
                exerciseDto.name(),
                exerciseDto.restSeconds(),
                null,
                Optional.ofNullable(exerciseDto.exerciseSets())
                        .map(exerciseSets -> exerciseSets.stream().map(exerciseSetMapper::fromDto).toList())
                        .orElse(null)
        );
    }

    @Override
    public ExerciseDto toDto(Exercise exercise) {
        return new ExerciseDto(
                exercise.getId(),
                exercise.getName(),
                exercise.getRestSeconds(),
                Optional.ofNullable(exercise.getExerciseSets())
                        .map(exerciseSets -> exerciseSets.stream().map(exerciseSetMapper::toDto).toList())
                        .orElse(null)
        );
    }
}

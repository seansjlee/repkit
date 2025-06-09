package com.repkit.backend.mapper.impl;

import com.repkit.backend.domain.entity.Exercise;
import com.repkit.backend.dto.ExerciseDto;
import com.repkit.backend.mapper.ExerciseMapper;
import org.springframework.stereotype.Component;

@Component
public class ExerciseMapperImpl implements ExerciseMapper {

    @Override
    public Exercise fromDto(ExerciseDto exerciseDto) {
        return new Exercise(
                exerciseDto.id(),
                exerciseDto.name(),
                exerciseDto.sets(),
                exerciseDto.reps(),
                exerciseDto.restSeconds(),
                null
        );
    }

    @Override
    public ExerciseDto toDto(Exercise exercise) {
        return new ExerciseDto(
                exercise.getId(),
                exercise.getName(),
                exercise.getSets(),
                exercise.getReps(),
                exercise.getRestSeconds()
        );
    }
}

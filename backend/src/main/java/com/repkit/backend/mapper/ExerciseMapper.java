package com.repkit.backend.mapper;

import com.repkit.backend.domain.entity.Exercise;
import com.repkit.backend.dto.ExerciseDto;

public interface ExerciseMapper {

    Exercise fromDto(ExerciseDto exerciseDto);

    ExerciseDto toDto(Exercise exercise);
}

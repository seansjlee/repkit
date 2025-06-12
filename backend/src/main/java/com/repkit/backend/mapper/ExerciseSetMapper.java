package com.repkit.backend.mapper;

import com.repkit.backend.domain.entity.ExerciseSet;
import com.repkit.backend.dto.ExerciseSetDto;

public interface ExerciseSetMapper {

    ExerciseSet fromDto(ExerciseSetDto exerciseSetDto);
    ExerciseSetDto toDto(ExerciseSet exerciseSet);
}

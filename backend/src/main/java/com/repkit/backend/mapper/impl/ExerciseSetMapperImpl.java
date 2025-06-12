package com.repkit.backend.mapper.impl;

import com.repkit.backend.domain.entity.ExerciseSet;
import com.repkit.backend.dto.ExerciseSetDto;
import com.repkit.backend.mapper.ExerciseSetMapper;
import org.springframework.stereotype.Component;

@Component
public class ExerciseSetMapperImpl implements ExerciseSetMapper {

    @Override
    public ExerciseSet fromDto(ExerciseSetDto exerciseSetDto) {
        return new ExerciseSet(
                exerciseSetDto.id(),
                exerciseSetDto.setNumber(),
                exerciseSetDto.weight(),
                exerciseSetDto.reps(),
                null
        );
    }

    @Override
    public ExerciseSetDto toDto(ExerciseSet exerciseSet) {
        return new ExerciseSetDto(
                exerciseSet.getId(),
                exerciseSet.getSetNumber(),
                exerciseSet.getWeight(),
                exerciseSet.getReps()
        );
    }
}

package com.repkit.backend.service.impl;

import com.repkit.backend.domain.repository.ExerciseRepository;
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

    public ExerciseServiceImpl(ExerciseRepository exerciseRepository, ExerciseMapper exerciseMapper) {
        this.exerciseRepository = exerciseRepository;
        this.exerciseMapper = exerciseMapper;
    }

    @Override
    public List<ExerciseDto> getAllExercises(UUID sessionId) {
        return exerciseRepository.findAllByWorkoutSessionId(sessionId)
                .stream()
                .map(exerciseMapper::toDto)
                .toList();
    }
}

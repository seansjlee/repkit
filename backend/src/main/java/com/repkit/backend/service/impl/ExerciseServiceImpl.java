package com.repkit.backend.service.impl;

import com.repkit.backend.domain.entity.Exercise;
import com.repkit.backend.domain.entity.ExerciseSet;
import com.repkit.backend.domain.entity.WorkoutSession;
import com.repkit.backend.domain.repository.ExerciseRepository;
import com.repkit.backend.domain.repository.WorkoutSessionRepository;
import com.repkit.backend.dto.ExerciseDto;
import com.repkit.backend.dto.ExerciseSetDto;
import com.repkit.backend.mapper.ExerciseMapper;
import com.repkit.backend.service.ExerciseService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

        Exercise exercise = new Exercise(
                null,
                exerciseDto.name(),
                exerciseDto.restSeconds(),
                new ArrayList<>(),
                workoutSession
        );

        Exercise createdExercise = exerciseRepository.save(exercise);

        List<ExerciseSet> exerciseSets = new ArrayList<>();
        List<ExerciseSetDto> exerciseSetsDto = exerciseDto.exerciseSets();

        for (int i = 0; i < exerciseSetsDto.size(); i++) {
            ExerciseSetDto exerciseSetDto = exerciseSetsDto.get(i);
            ExerciseSet exerciseSet = new ExerciseSet();
            exerciseSet.setSetNumber(i + 1);
            exerciseSet.setWeight(exerciseSetDto.weight());
            exerciseSet.setReps(exerciseSetDto.reps());
            exerciseSet.setExercise(createdExercise);
            exerciseSets.add(exerciseSet);
        }

        createdExercise.getExerciseSets().clear();
        createdExercise.getExerciseSets().addAll(exerciseSets);
        exerciseRepository.save(createdExercise);

        return exerciseMapper.toDto(createdExercise);
    }
}

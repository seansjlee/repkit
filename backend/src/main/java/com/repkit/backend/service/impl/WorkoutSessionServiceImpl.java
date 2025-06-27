package com.repkit.backend.service.impl;

import com.repkit.backend.domain.entity.User;
import com.repkit.backend.domain.entity.WorkoutSession;
import com.repkit.backend.domain.repository.UserRepository;
import com.repkit.backend.domain.repository.WorkoutSessionRepository;
import com.repkit.backend.dto.WorkoutSessionDto;
import com.repkit.backend.mapper.WorkoutSessionMapper;
import com.repkit.backend.service.WorkoutSessionService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class WorkoutSessionServiceImpl implements WorkoutSessionService {

    private final WorkoutSessionRepository workoutSessionRepository;
    private final WorkoutSessionMapper workoutSessionMapper;
    private final UserRepository userRepository;

    @Override
    public List<WorkoutSessionDto> getAllWorkoutSessions() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        List<WorkoutSession> sessions = workoutSessionRepository.findAllByUserUsername(username);

        return sessions.stream()
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

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        WorkoutSession createdWorkoutSession = workoutSessionRepository.save(
                WorkoutSession.builder()
                .name(workoutSessionDto.name())
                .user(user)
                .build()
        );

        return workoutSessionMapper.toDto(createdWorkoutSession);
    }

    @Override
    public WorkoutSessionDto getWorkoutSession(UUID id) {
        return workoutSessionMapper.toDto(workoutSessionRepository.findById(id).orElse(null));
    }

    @Transactional
    @Override
    public WorkoutSessionDto updateWorkoutSession(UUID id, WorkoutSessionDto workoutSessionDto) {
        if (null == workoutSessionDto.id()) {
            throw new IllegalArgumentException("Workout session id must be present!");
        }
        if (null == workoutSessionDto.name() || workoutSessionDto.name().isBlank()) {
            throw new IllegalArgumentException("Workout session name cannot be empty!");
        }
        if (!Objects.equals(workoutSessionDto.id(), id)) {
            throw new IllegalArgumentException("Attempting to change workout session ID, this is not permitted");
        }

        WorkoutSession workoutSession = workoutSessionRepository.findById(id).orElseThrow(() ->
                new IllegalArgumentException("Workout session not found"));

        workoutSession.setName(workoutSessionDto.name());

        return workoutSessionMapper.toDto(workoutSessionRepository.save(workoutSession));
    }

    @Override
    public void deleteWorkoutSession(UUID id) {
        workoutSessionRepository.deleteById(id);
    }
}

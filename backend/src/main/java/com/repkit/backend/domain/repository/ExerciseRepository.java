package com.repkit.backend.domain.repository;

import com.repkit.backend.domain.entity.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ExerciseRepository extends JpaRepository<Exercise, UUID> {
    List<Exercise> findAllByWorkoutSessionId(UUID sessionId);
}

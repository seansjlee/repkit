package com.repkit.backend.domain.repository;

import com.repkit.backend.domain.entity.WorkoutSession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface WorkoutSessionRepository extends JpaRepository<WorkoutSession, UUID> {
    List<WorkoutSession> findAllByUserUsername(String username);
}

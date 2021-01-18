package com.example.springboot;

import com.example.model.Workshop;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkshopRepository extends JpaRepository<Workshop, Integer> {
    List<Workshop> findAllById(Integer id);
}

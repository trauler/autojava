package com.example.repositore;

import com.example.model.AutoPart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AutoPartsRepository extends JpaRepository<AutoPart, Integer> {
}

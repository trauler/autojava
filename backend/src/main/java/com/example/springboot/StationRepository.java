package com.example.springboot;

import com.example.model.Station;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StationRepository extends JpaRepository<Station, Integer> {
//    List<WorkshopStation> findAllById(Integer id);
}

package com.example.repositore;

import com.example.model.Service;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceRepository  extends JpaRepository<Service, Integer> {
}

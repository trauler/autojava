package com.example.repositore;

import com.example.model.OrderService;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderServiceRepository extends JpaRepository<OrderService, Integer> {
}

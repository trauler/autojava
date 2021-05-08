package com.example.repositore;

import com.example.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
      User findByEmail(String email);
      User findByName(String name);
}

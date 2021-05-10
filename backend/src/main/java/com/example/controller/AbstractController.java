package com.example.controller;

import com.example.config.CustomUserDetails;
import com.example.model.User;
import com.example.repositore.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;

@Controller
public class AbstractController {

    private final UserRepository userRepository;

    public AbstractController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public int getUserIdFromAuth(Authentication auth) {
        CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
        User user = userRepository.findByName(userDetails.getUsername());
        int userId = user.getId();
        return userId;
    }
}

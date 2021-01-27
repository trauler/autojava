package com.example.controller;

import com.example.dto.GetUserResponseDto;
import com.example.dto.PostUserRequestDto;
import com.example.dto.PutUserRequestDto;
import com.example.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {
    private final Logger log = LoggerFactory.getLogger(UserController.class);

    private final UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public List<GetUserResponseDto> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/user")
    public GetUserResponseDto createUser(@Valid @RequestBody PostUserRequestDto userDetails) {
        log.info("Request to create user: {}", userDetails);
        return userService.createUser(userDetails.getName(), userDetails.getEmail());
    }

    @PutMapping("/user/{id}")
    public GetUserResponseDto updateUser(@PathVariable(value = "id") int userId,
                                         @Valid @RequestBody PutUserRequestDto userDetails) {
        return userService.updateUser(userId, userDetails.getName(), userDetails.getEmail());
    }

    @DeleteMapping("/user/{id}")
    public void deleteUser(@PathVariable int id) {
        log.info("Request to delete user: {}", id);
        userService.deleteUser(id);
    }

}

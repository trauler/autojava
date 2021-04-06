package com.example.controller;

import com.example.config.JwtTokenProvider;
import com.example.dto.PostRegistrationUserRequestDto;
import com.example.dto.UserAuthLogPasRequestDto;
import com.example.model.User;
import com.example.repositore.UserRepository;
import com.example.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
public class AuthController {

    private final JwtTokenProvider jwtTokenProvider;
    private final UserService userService;

    public AuthController(JwtTokenProvider jwtTokenProvider, UserService userService) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.userService = userService;
    }

    @PostMapping("/register")
    public String registerUser(@RequestBody @Valid PostRegistrationUserRequestDto postRegistrationUserRequestDto) {
        userService.createUser(postRegistrationUserRequestDto.getName(), postRegistrationUserRequestDto.getEmail(), postRegistrationUserRequestDto.getPassword());
        return "OK";
    }

    @PostMapping("/login")
    public String auth(@RequestBody UserAuthLogPasRequestDto userAuthLogPasRequestDto) {
        User user = userService.findByLoginAndPassword(userAuthLogPasRequestDto.getEmail(), userAuthLogPasRequestDto.getPassword());
        String token = jwtTokenProvider.createToken(user.getEmail());
        return token;
    }

//    @GetMapping("/login")
//    public String userLogin()
}
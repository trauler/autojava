package com.example.service;

import com.example.dto.GetUserResponseDto;
import com.example.model.User;
import com.example.repositore.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<GetUserResponseDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::convertToGetUserResponseDto).collect(Collectors.toList());
    }

    public GetUserResponseDto updateUser(Integer id, String name, String email) {
        User user = userRepository.findById(id).orElseThrow();
        user.setName(name);
        user.setEmail(email);
        return convertToGetUserResponseDto(userRepository.save(user));
    }

    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }

    public GetUserResponseDto createUser(String name, String email) {
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        return convertToGetUserResponseDto(userRepository.save(user));
    }

    private GetUserResponseDto convertToGetUserResponseDto(User user) {
        GetUserResponseDto getUserResponseDto = new GetUserResponseDto();
        getUserResponseDto.setName(user.getName());
        getUserResponseDto.setEmail(user.getEmail());
        return getUserResponseDto;
    }
}
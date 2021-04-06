package com.example.service;

import com.example.dto.GetUserResponseDto;
import com.example.dto.PostRegistrationUserRequestDto;
import com.example.dto.UserAuthLogPasRequestDto;
import com.example.model.User;
import com.example.repositore.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
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

    //TODO add dto
    public User findByLogin(String email) {
        return userRepository.findByEmail(email);
    }

    public PostRegistrationUserRequestDto createUser(String name, String email, String password) {
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setEncryptedPassword(passwordEncoder.encode(password));
        return convertToPostRegistrationUserRequestDto(userRepository.save(user));
    }

    public User findByLoginAndPassword(String name, String password) {
        User user = findByLogin(name);
        if (user != null) {
            if (passwordEncoder.matches(password, user.getEncryptedPassword())) {
                return user;
            }
        }
        return null;
    }

    private GetUserResponseDto convertToGetUserResponseDto(User user) {
        GetUserResponseDto getUserResponseDto = new GetUserResponseDto();
        getUserResponseDto.setName(user.getName());
        getUserResponseDto.setEmail(user.getEmail());
        return getUserResponseDto;
    }

    private PostRegistrationUserRequestDto convertToPostRegistrationUserRequestDto(User user) {
        PostRegistrationUserRequestDto postRegistrationUserRequestDto = new PostRegistrationUserRequestDto();
        postRegistrationUserRequestDto.setName(user.getName());
        postRegistrationUserRequestDto.setEmail(user.getEmail());
        postRegistrationUserRequestDto.setPassword(passwordEncoder.encode(user.getEncryptedPassword()));
        return postRegistrationUserRequestDto;
    }

//    private FindUserByNameRequestDto convertToFindUserByNameRequestDto(User user) {
//        FindUserByNameRequestDto findUserByNameRequestDto = new FindUserByNameRequestDto();
//        findUserByNameRequestDto.setName(user.getName());
//        return findUserByNameRequestDto;
//    }

//    private UserAuthLogPasRequestDto convertToUserAuthLogPasRequestDto(User user) {
//        UserAuthLogPasRequestDto userAuthLogPasRequestDto = new UserAuthLogPasRequestDto();
//        userAuthLogPasRequestDto.setName(user.getName());
//        userAuthLogPasRequestDto.setPassword(user.getEncryptedPassword());
//        return userAuthLogPasRequestDto;
//    }


}
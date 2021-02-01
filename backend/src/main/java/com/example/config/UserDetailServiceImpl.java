package com.example.config;

import com.example.model.User;
import com.example.repositore.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailServiceImpl implements UserDetailsService {
    
    private final UserRepository userRepository;

    public UserDetailServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email).orElseThrow();
        String temporaryRole = "ROLE_USER";

        UserDetails userDetails = org.springframework.security.core.userdetails.User.builder()
                .username(email)
                .password(user.getEncryptedPassword())
                .authorities(temporaryRole)
                .build();
        return new UserInfo(user.getId(), userDetails);
    }
}
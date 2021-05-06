package com.example.config;

import com.example.model.User;
import com.example.repositore.UserRepository;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    
    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public CustomUserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);
        return CustomUserDetails.fromUserToCustomUserDetails(user);

//        UserDetails userDetails = org.springframework.security.core.userdetails.User.builder()
//                .username(name)
//                .password(user.getEncryptedPassword())
//                .authorities(UserRole.USER.getName())
//                .build();
//        return new UserInfo(user.getId(), userDetails);
    }
}
package com.example.config;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

public class UserInfo extends User {
    private final Integer id;

    public UserInfo(Integer id, UserDetails user) {
        super(user.getUsername(), user.getPassword(), user.isEnabled(), user.isAccountNonExpired(), user.isCredentialsNonExpired(), user.isAccountNonLocked(), user.getAuthorities());
        this.id = id;
    }

    public Integer getId() {
        return id;
    }
}
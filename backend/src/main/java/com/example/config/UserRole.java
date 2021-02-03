package com.example.config;

public enum UserRole {
    USER("USER_ROLE");

    private final String name;

    UserRole(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
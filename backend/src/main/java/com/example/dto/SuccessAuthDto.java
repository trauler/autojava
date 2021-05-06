package com.example.dto;

public class SuccessAuthDto {
    private final String token;

    public SuccessAuthDto(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }
}

package com.example.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

public class PostUserRequestDto {
    @NotNull
    private String name;
    @NotNull
    @Email
    private String email;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}

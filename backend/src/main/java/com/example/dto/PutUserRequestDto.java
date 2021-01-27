package com.example.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

public class PutUserRequestDto {
    @NotNull
    private Integer id;
    @NotNull
    private String name;
    @NotNull
    @Email
    private String email;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

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

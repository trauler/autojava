package com.example.dto;

import javax.validation.constraints.NotNull;

public class PostWorkshopRequestDto {
    @NotNull
    private String name;
    @NotNull
    private Integer userId;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
}

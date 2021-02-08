package com.example.dto;

import javax.validation.constraints.NotNull;

public class PostWorkshopRequestDto {
    @NotNull
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

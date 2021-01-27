package com.example.dto;

import javax.validation.constraints.NotNull;

public class WorkshopDto {
    @NotNull
    private String workshopName;

    public String getWorkshopName() {
        return workshopName;
    }

    public void setWorkshopName(String workshopName) {
        this.workshopName = workshopName;
    }
}

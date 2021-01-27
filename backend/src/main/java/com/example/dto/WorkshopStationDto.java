package com.example.dto;

import javax.validation.constraints.NotNull;

public class WorkshopStationDto {
    @NotNull
    private String workshopName;
    @NotNull
    private String stationName;

    public String getWorkshopName() {
        return workshopName;
    }

    public void setWorkshopName(String workshopName) {
        this.workshopName = workshopName;
    }

    public String getStationName() {
        return stationName;
    }

    public void setStationName(String stationName) {
        this.stationName = stationName;
    }
}
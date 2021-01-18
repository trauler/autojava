package com.example.springboot;

import com.example.model.Workshop;
import com.example.model.Station;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StationService {

    private final StationRepository stationRepository;
    private final WorkshopRepository workshopRepository;

    public StationService(StationRepository stationRepository, WorkshopRepository workshopRepository) {
        this.stationRepository = stationRepository;
        this.workshopRepository = workshopRepository;
    }

    public List<WorkshopStationDto> getAllStationsFromWorkshop(Integer id) {
        Workshop workshop = workshopRepository.findById(id).orElseThrow();
        return workshop.getStationsList().stream()
                .map(this::convertToWorkshopStationDTO)
                .collect(Collectors.toList());
    }

    private WorkshopStationDto convertToWorkshopStationDTO(Station station) {
        WorkshopStationDto workshopStationDTO = new WorkshopStationDto();
        workshopStationDTO.setStationName(station.getName());
        Workshop workshop = station.getWorkshop();
        workshopStationDTO.setWorkshopName(workshop.getName());
        return workshopStationDTO;
    }

}

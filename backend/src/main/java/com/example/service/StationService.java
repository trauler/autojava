package com.example.service;

import com.example.dto.PostWorkshopStationRequestDto;
import com.example.model.Workshop;
import com.example.model.Station;
import com.example.repositore.StationRepository;
import com.example.repositore.WorkshopRepository;
import com.example.dto.WorkshopStationDto;
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

    public void deleteStation(Integer workshopId, Integer stationId) {
        Station station = new Station();
        Workshop workshop = new Workshop();
        workshop.setId(workshopId);
        station.setWorkshop(workshop);
        workshop.setStationsList(workshop.getStationsList().stream().filter(s -> !s.getId().equals(stationId)).collect(Collectors.toList()));
        workshopRepository.save(workshop);
    }
    public PostWorkshopStationRequestDto createStation(Integer id, String name) {
        Station station = new Station();
        Workshop workshop = new Workshop();
        workshop.setId(id);
        station.setName(name);
        station.setWorkshop(workshop);
        return convertToWorkshopStationRequestDto(stationRepository.save(station));
    }

    public PostWorkshopStationRequestDto updateStation(Integer workshopId, Integer stationId, String name) {
        Workshop workshop = workshopRepository.findById(workshopId).orElseThrow();
        Station station = stationRepository.findById(stationId).orElseThrow();
        station.setWorkshop(workshop);
        station.setId(stationId);
        station.setName(name);
        return convertToWorkshopStationRequestDto(stationRepository.save(station));
    }

    public List<WorkshopStationDto> getAllStationsFromWorkshop(Integer id) {
        return workshopRepository.findById(id)
                .map(Workshop::getStationsList)
                .map(sl -> sl.stream().map(this::convertToWorkshopStationDTO).collect(Collectors.toList()))
                .orElseThrow();
    }

    private PostWorkshopStationRequestDto convertToWorkshopStationRequestDto(Station station) {
        PostWorkshopStationRequestDto postWorkshopStationRequestDto = new PostWorkshopStationRequestDto();
        postWorkshopStationRequestDto.setName(station.getName());
        return postWorkshopStationRequestDto;
    }

    private WorkshopStationDto convertToWorkshopStationDTO(Station station) {
        WorkshopStationDto workshopStationDTO = new WorkshopStationDto();
        workshopStationDTO.setStationName(station.getName());
        Workshop workshop = station.getWorkshop();
        workshopStationDTO.setWorkshopName(workshop.getName());
        return workshopStationDTO;
    }

}

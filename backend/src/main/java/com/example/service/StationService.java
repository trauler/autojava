package com.example.service;

import com.example.dto.PostWorkshopStationRequestDto;
import com.example.model.User;
import com.example.model.Workshop;
import com.example.model.Station;
import com.example.repositore.StationRepository;
import com.example.repositore.UserRepository;
import com.example.repositore.WorkshopRepository;
import com.example.dto.WorkshopStationDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StationService {

    private final StationRepository stationRepository;
    private final WorkshopRepository workshopRepository;
    private final UserRepository userRepository;

    public StationService(StationRepository stationRepository, WorkshopRepository workshopRepository, UserRepository userRepository) {
        this.stationRepository = stationRepository;
        this.workshopRepository = workshopRepository;
        this.userRepository = userRepository;
    }

    public List<WorkshopStationDto> getAllStationsFromWorkshop(int userId, int workshopId) {
        Workshop workshop = workshopRepository.findById(workshopId).orElseThrow();
        if (workshop.getUser().getId() != userId) {
            throw new RuntimeException(userId + " cannot view this stations");
        }
        return workshopRepository.findById(workshopId)
                .map(Workshop::getStationsList)
                .map(sl -> sl.stream().map(this::convertToWorkshopStationDTO).collect(Collectors.toList()))
                .orElseThrow();
    }

    public PostWorkshopStationRequestDto createStation(int userId, int workshopId, String name) {
        Workshop workshop = workshopRepository.findById(workshopId).orElseThrow();
        if (workshop.getUser().getId() != userId) {
            throw new RuntimeException(userId + " cannot create stations at this workshop");
        }
        Station station = new Station();
        station.setWorkshop(workshop);
        station.setName(name);
        station.setWorkshop(workshop);
        return convertToWorkshopStationRequestDto(stationRepository.save(station));
    }

    public PostWorkshopStationRequestDto updateStation(int userId, int workshopId, int stationId, String name) {
        Workshop workshop = workshopRepository.findById(workshopId).orElseThrow();
        if (workshop.getUser().getId() != userId) {
            throw new RuntimeException(userId + " cannot update station at this workshop");
        }
        Station station = stationRepository.findById(stationId).orElseThrow();
        station.setWorkshop(workshop);
        station.setId(stationId);
        station.setName(name);
        return convertToWorkshopStationRequestDto(stationRepository.save(station));
    }
//TODO wtf
    public void deleteStation(int userId, int workshopId, int stationId) {
        Station station = new Station();
        Workshop workshop = workshopRepository.findById(workshopId).orElseThrow();
        if (workshop.getUser().getId() != userId) {
            throw new RuntimeException(userId + " cannot delete station at this workshop");
        }
        station.setWorkshop(workshop);
        workshop.setStationsList(workshop.getStationsList().stream().filter(s -> !s.getId().equals(stationId)).collect(Collectors.toList()));
        workshopRepository.save(workshop);
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

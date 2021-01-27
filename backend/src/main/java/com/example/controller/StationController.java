package com.example.controller;

import com.example.dto.PostWorkshopStationRequestDto;
import com.example.model.Station;
import com.example.springboot.ResourceNotFoundException;
import com.example.repositore.StationRepository;
import com.example.service.StationService;
import com.example.dto.WorkshopStationDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class StationController {
    private final Logger log = LoggerFactory.getLogger(StationRepository.class);

    private StationRepository stationRepository;
    private final StationService stationService;

    public StationController(StationRepository stationRepository, StationService stationService) {
        this.stationRepository = stationRepository;
        this.stationService = stationService;
    }

    @GetMapping("/workshop/{id}/stations")
    public List<WorkshopStationDto> getAllStationsByWorkshopId(@PathVariable (value = "id") Integer id)  {
        List<WorkshopStationDto> workshopStation = stationService.getAllStationsFromWorkshop(id);
        return workshopStation;
    }

    @PostMapping("/workshop/{id}/station")
    public PostWorkshopStationRequestDto createWorkshopStations(@Valid @RequestBody PostWorkshopStationRequestDto stationDetails,
                                                                @PathVariable("id") Integer id) throws URISyntaxException {
        return stationService.createStation(id, stationDetails.getName());
    }

    @PutMapping("/workshop/{id}/station/{id}")
    public PostWorkshopStationRequestDto updateWorkshopStation(@Valid @PathVariable(value ="id") Integer workshopId,
                                                         @Valid @RequestBody PostWorkshopStationRequestDto stationDetails,
                                                         @Valid @PathVariable(value = "id") Integer stationId) throws ResourceNotFoundException {
        return stationService.updateStation(workshopId, stationId, stationDetails.getName());
    }

    @DeleteMapping("/workshop/{id}/station{id}")
    public ResponseEntity<?> deleteWorkshopStation(@PathVariable Integer id) {
        log.info("Request to delete station: {}", id);
        stationRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
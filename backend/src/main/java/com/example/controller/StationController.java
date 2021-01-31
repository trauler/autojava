package com.example.controller;

import com.example.dto.PostWorkshopStationRequestDto;
import com.example.springboot.ResourceNotFoundException;
import com.example.repositore.StationRepository;
import com.example.service.StationService;
import com.example.dto.WorkshopStationDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class StationController {
    private final Logger log = LoggerFactory.getLogger(StationRepository.class);

    private final StationService stationService;

    public StationController(StationService stationService) {
        this.stationService = stationService;
    }

    @GetMapping("/workshop/{id}/stations")
    public List<WorkshopStationDto> getAllStationsByWorkshopId(@PathVariable(value = "id") Integer id) {
        return stationService.getAllStationsFromWorkshop(id);
    }

    @PostMapping("/workshop/{id}/station")
    public PostWorkshopStationRequestDto createWorkshopStations(@Valid @RequestBody PostWorkshopStationRequestDto stationDetails,
                                                                @PathVariable("id") Integer id) {
        return stationService.createStation(id, stationDetails.getName());
    }

    @PutMapping("/workshop/{id}/station/{id1}")
    public PostWorkshopStationRequestDto updateWorkshopStation(@Valid @PathVariable(value = "id") Integer workshopId,
                                                               @Valid @RequestBody PostWorkshopStationRequestDto stationDetails,
                                                               @Valid @PathVariable(value = "id1") Integer stationId) throws ResourceNotFoundException {
        return stationService.updateStation(workshopId, stationId, stationDetails.getName());
    }

    @DeleteMapping("/workshop/{workshopId}/station{stationId}")
    public void deleteWorkshopStation(@PathVariable Integer workshopId,
                                      @PathVariable Integer stationId) {
        log.info("Request to delete station: {}", workshopId);
        stationService.deleteStation(workshopId, stationId);
    }
}
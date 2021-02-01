package com.example.controller;

import com.example.config.UserInfo;
import com.example.dto.PostWorkshopStationRequestDto;
import com.example.springboot.ResourceNotFoundException;
import com.example.repositore.StationRepository;
import com.example.service.StationService;
import com.example.dto.WorkshopStationDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
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

    @GetMapping("/workshop/{workshopId}/stations")
    public List<WorkshopStationDto> getAllStationsByWorkshopId(Authentication auth,
                                                               @PathVariable(value = "workshopId") int workshopId) {
        log.info(auth + " request to get all workshops stations");
        Integer userId = ((UserInfo)auth.getPrincipal()).getId();
        return stationService.getAllStationsFromWorkshop(userId, workshopId);
    }

    @PostMapping("/workshop/{workshopId}/station")
    public PostWorkshopStationRequestDto createWorkshopStations(Authentication auth,
                                                                @Valid @RequestBody PostWorkshopStationRequestDto stationDetails,
                                                                @PathVariable("workshopId") int workshopId) {
        log.info(auth + " request to create station");
        Integer userId = ((UserInfo)auth.getPrincipal()).getId();
        return stationService.createStation(userId, workshopId, stationDetails.getName());
    }

    @PutMapping("/workshop/{workshopId}/station/{stationId}")
    public PostWorkshopStationRequestDto updateWorkshopStation(Authentication auth,
                                                               @PathVariable(value = "workshopId") int workshopId,
                                                               @Valid @RequestBody PostWorkshopStationRequestDto stationDetails,
                                                               @PathVariable(value = "stationId") int stationId) throws ResourceNotFoundException {
        log.info(auth + " request to update station");
        Integer userId = ((UserInfo)auth.getPrincipal()).getId();
        return stationService.updateStation(userId, workshopId, stationId, stationDetails.getName());
    }

    @DeleteMapping("/workshop/{workshopId}/station{stationId}")
    public void deleteWorkshopStation(Authentication auth,
                                      @PathVariable Integer workshopId,
                                      @PathVariable Integer stationId) {
        log.info(auth + " request to delete station ");
        Integer userId = ((UserInfo)auth.getPrincipal()).getId();
        stationService.deleteStation(userId, workshopId, stationId);
    }
}
package com.example.springboot;

import com.example.model.Station;
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
public class StationsController {
    private final Logger log = LoggerFactory.getLogger(StationRepository.class);
    private StationRepository stationRepository;

    private final StationService stationService;

    public StationsController(StationRepository stationRepository, StationService stationService) { this.stationRepository = stationRepository;
        this.stationService = stationService;
    }

    @GetMapping("/workshop/{id}/stations")
    public List<WorkshopStationDto> getAllStationsByWorkshopId(@PathVariable (value = "id") Integer id)  {
        List<WorkshopStationDto> workshopStation = stationService.getAllStationsFromWorkshop(id);
        return workshopStation;
    }

    @PostMapping("/workshop/{id}/station")
    public ResponseEntity<Station> createWorkshopStations(@Valid @RequestBody Station stationDetails,
                                                          @PathVariable("id") Integer id) throws URISyntaxException {
        Station result = stationRepository.save(stationDetails);
        return ResponseEntity.created(new URI("/api/workshop/" + id + "/station" +result.getId())).body(result);
    }

    @PutMapping("/workshop/{id}/station/{id}")
    public ResponseEntity<Station> updateWorkshopStation(@Valid @PathVariable(value ="id") Integer workshopId,
                                                         @Valid @RequestBody Station stationDetails,
                                                         @Valid @PathVariable(value = "id") Integer stationId) throws ResourceNotFoundException {
        Station station = stationRepository.findById(stationId).orElseThrow(()
                -> new ResourceNotFoundException("Workshop station ot found for this ID: " + stationId));
        station.setName(station.getName());
        final Station updatedStation = stationRepository.save(station);
        return ResponseEntity.ok(updatedStation);
    }

}

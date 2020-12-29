package com.example.springboot;

import com.example.model.Workshop;
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
public class WorkshopsController {
    private final Logger log = LoggerFactory.getLogger(WorkshopsController.class);
    private WorkshopRepository workshopRepository;

    public WorkshopsController(WorkshopRepository workshopRepository) {
        this.workshopRepository = workshopRepository;
    }

    @GetMapping("/workshops")
    public List<Workshop> getAllWorkshops() {
        return workshopRepository.findAll();
    }

    @PostMapping("/workshop")
    public ResponseEntity<Workshop> createWorkshop(@Valid @RequestBody Workshop workshopDetails) throws URISyntaxException {
        log.info("Request to create workshop: {}", workshopDetails);
        Workshop result = workshopRepository.save(workshopDetails);
        return ResponseEntity.created(new URI("/api/workshop/" + result.getId())).body(result);
    }

    @PutMapping("/workshop/{id}")
    public ResponseEntity<Workshop> updateWorkshop(@Valid @PathVariable(value = "id") Integer workshopId, @Valid @RequestBody Workshop workshopDetails) throws ResourceNotFoundException {
        Workshop workshop = workshopRepository.findById(workshopId).orElseThrow(() -> new ResourceNotFoundException("Workshop not found for this id: " + workshopId));
        workshop.setName(workshopDetails.getName());
        //dopilit` update time
        final Workshop updatedWorkshop = workshopRepository.save(workshop);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/workshop/{id}")
    public ResponseEntity<?> deleteWorkshop(@PathVariable Integer id) {
        log.info("Request to delete workshop: {}", id);
        workshopRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
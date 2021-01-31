package com.example.controller;

import com.example.dto.PostWorkshopRequestDto;
import com.example.dto.WorkshopDto;
import com.example.dto.UserWorkshopDto;
import com.example.service.WorkshopService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class WorkshopController {
    private final Logger log = LoggerFactory.getLogger(WorkshopController.class);

    private final WorkshopService workshopService;

    public WorkshopController(WorkshopService workshopService) {
        this.workshopService = workshopService;
    }

    @GetMapping("/workshops")
    public List<UserWorkshopDto> getAllUsersWorkshops(Authentication auth) {
        String username = ((User)auth.getPrincipal()).getUsername();
        List<UserWorkshopDto> userWorkshop = workshopService.getAllUsersWorkshops(username);
        return userWorkshop;
    }

    @PostMapping("/workshop")
    public WorkshopDto createWorkshop(@Valid @RequestBody PostWorkshopRequestDto workshopDetails) {
        log.info("Request to create workshop: {}", workshopDetails);
        return workshopService.createWorkshop(workshopDetails.getName(), workshopDetails.getUserId());
    }

    @PutMapping("/workshop/{id}")
    public WorkshopDto updateWorkshop(@PathVariable(value = "id") int id,
                                      @Valid @RequestBody WorkshopDto workshopDetails) {
        return workshopService.updateWorkshop(id, workshopDetails.getWorkshopName());
    }

    @DeleteMapping("/workshop/{id}")
    public void deleteWorkshop(@PathVariable int id) {
        log.info("Request to delete workshop: {}", id);
        workshopService.deleteWorkshop(id);
    }
}
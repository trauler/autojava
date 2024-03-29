package com.example.controller;

import com.example.config.UserInfo;
import com.example.dto.PostWorkshopRequestDto;
import com.example.dto.WorkshopDto;
import com.example.dto.UserWorkshopDto;
import com.example.service.WorkshopService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
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
        log.info("{} request to get all workshops", auth);
        Integer userId = ((UserInfo)auth.getPrincipal()).getId();
        return workshopService.getAllUsersWorkshops(userId);
    }

    @PostMapping("/workshop")
    public WorkshopDto createWorkshop(Authentication auth,
                                      @Valid @RequestBody PostWorkshopRequestDto workshopDetails) {
        log.info("{} request to create workshop: ", auth);
        Integer id = ((UserInfo)auth.getPrincipal()).getId();
        return workshopService.createWorkshop(workshopDetails.getName(), id);
    }

    @PutMapping("/workshop/{workshopId}")
    public WorkshopDto updateWorkshop(Authentication auth,
                                      @PathVariable(value = "workshopId") int workshopId,
                                      @Valid @RequestBody WorkshopDto workshopDetails) {
        Integer userId = ((UserInfo)auth.getPrincipal()).getId();
        return workshopService.updateWorkshop(userId, workshopId, workshopDetails.getWorkshopName());
    }

    @DeleteMapping("/workshop/{workshopId}")
    public void deleteWorkshop(Authentication auth, @PathVariable(value = "workshopId") int workshopId) {
        log.info("{} request to delete workshop", auth);
        Integer id = ((UserInfo)auth.getPrincipal()).getId();
        workshopService.deleteWorkshop(id, workshopId);
    }
}
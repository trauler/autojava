package com.example.controller;

import com.example.config.UserInfo;
import com.example.dto.AutoPartDto;
import com.example.service.AutoPartService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class AutoPartController {
    private final Logger log = LoggerFactory.getLogger(AutoPartController.class);

    private final AutoPartService autoPartService;

    public AutoPartController(AutoPartService autoPartService) {
        this.autoPartService = autoPartService;
    }

    @GetMapping("/parts")
    public List<AutoPartDto> getAllUsersParts(Authentication auth) {
        log.info(auth + " request to get all parts");
        Integer userId = ((UserInfo)auth.getPrincipal()).getId();
        return autoPartService.getAllUsersAutoParts(userId);
    }

    @PostMapping("/part")
    public AutoPartDto createUsersPart(Authentication auth,
                                       @Valid @RequestBody AutoPartDto autoPartDetails) {
        log.info(auth + " request to update a part");
        Integer userId = ((UserInfo)auth.getPrincipal()).getId();
        return autoPartService.createAutoPart(userId, autoPartDetails.getName(), autoPartDetails.getDescription(),
                autoPartDetails.getPurchasePrice(), autoPartDetails.getRetailPrice(), autoPartDetails.getQuantity());
    }

    @PutMapping("/part/{partId}")
    public AutoPartDto updateUsersPart(Authentication auth,
                                       @PathVariable (value = "partId") int partId,
                                       @Valid @RequestBody AutoPartDto autoPartDetails) {
        log.info(auth + " request to update a part");
        Integer userId = ((UserInfo)auth.getPrincipal()).getId();
        return autoPartService.updateAutoPart(userId, partId, autoPartDetails.getName(), autoPartDetails.getDescription(),
                autoPartDetails.getPurchasePrice(), autoPartDetails.getRetailPrice(), autoPartDetails.getQuantity());
    }

    @DeleteMapping("/part/{partId}")
    public void deletePart(Authentication auth,
                           @PathVariable (value = "partId") int partId) {
        log.info(auth + " request to delete a part");
        Integer userId = ((UserInfo)auth.getPrincipal()).getId();
        autoPartService.deleteAutoPart(userId, partId);
    }
}
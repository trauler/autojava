package com.example.controller;

import com.example.dto.AutoPartDto;
import com.example.service.AutoPartService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AutoPartController {

    private final AutoPartService autoPartService;

    public AutoPartController(AutoPartService autoPartService) {
        this.autoPartService = autoPartService;
    }

    @GetMapping("/user/{id}/parts")
    public List<AutoPartDto> getAllUsersParts(@PathVariable(value = "id") int userId) {
        return autoPartService.getAllUsersAutoParts(userId);
    }

//    @PostMapping("/")
}

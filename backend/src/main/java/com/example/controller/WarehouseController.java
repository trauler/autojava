package com.example.controller;

import com.example.dto.WarehouseDto;
import com.example.repositore.WarehouseRepository;
import com.example.service.WarehouseService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class WarehouseController {
    private final Logger log = LoggerFactory.getLogger(WarehouseController.class);

    private final WarehouseRepository warehouseRepository;
    private final WarehouseService warehouseService;

    public WarehouseController(WarehouseRepository warehouseRepository, WarehouseService warehouseService) {
        this.warehouseRepository = warehouseRepository;
        this.warehouseService = warehouseService;
    }

    @GetMapping("/user/{id}/warehouse/")
    public List<WarehouseDto> getAllUsersWarehouses(@PathVariable (value = "id") Integer id) {
        List<WarehouseDto> userWarehouse = warehouseService.getAllUsersWarehouses(id);
        return userWarehouse;
    }
}

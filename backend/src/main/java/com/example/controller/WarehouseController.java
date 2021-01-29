package com.example.controller;

import com.example.dto.PostWarehouseRequestDto;
import com.example.dto.PostWarehouseResponseDto;
import com.example.dto.WarehouseDto;
import com.example.service.WarehouseService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class WarehouseController {
    private final Logger log = LoggerFactory.getLogger(WarehouseController.class);

    private final WarehouseService warehouseService;

    public WarehouseController(WarehouseService warehouseService) {
        this.warehouseService = warehouseService;
    }

    @GetMapping("/user/{id}/warehouse/")
    public List<WarehouseDto> getAllUsersWarehouses(@PathVariable (value = "id") Integer id) {
        List<WarehouseDto> userWarehouse = warehouseService.getAllUsersWarehouses(id);
        return userWarehouse;
    }

    @PostMapping("/user/{id}/warehouse")
    public PostWarehouseResponseDto createWarehouse(@Valid @PathVariable (value = "id") Integer userId,
                                                    @Valid @RequestBody PostWarehouseRequestDto warehouseDetails) {
        return warehouseService.createWarehouse(userId, warehouseDetails.getName(), warehouseDetails.getAddress());
    }

    @PutMapping("/user/{id}/warehouse/{id1}")
    public PostWarehouseResponseDto updateWarehouse(@Valid @PathVariable (value = "id") Integer userId,
                                                    @Valid @PathVariable (value = "id1") Integer warehouseId,
                                                    @Valid @RequestBody PostWarehouseRequestDto warehouseDetails) {
        return warehouseService.updateWarehouse(userId, warehouseId, warehouseDetails.getName(), warehouseDetails.getAddress());
    }

    @DeleteMapping("/user/{id}/warehouse/{id1}")
    public void deleteWarehouse(@PathVariable (value = "id") Integer userId,
                                @PathVariable (value = "id1") Integer warehouseId) {
        warehouseService.deleteWarehouse(userId, warehouseId);
    }
}

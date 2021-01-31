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

    @PostMapping("/user/{userId}/warehouse")
    public PostWarehouseResponseDto createWarehouse(@PathVariable (value = "userId") Integer userId,
                                                    @Valid @RequestBody PostWarehouseRequestDto warehouseDetails) {
        return warehouseService.createWarehouse(userId, warehouseDetails.getName(), warehouseDetails.getAddress());
    }

    @PutMapping("/user/{userId}/warehouse/{warehouseId}")
    public PostWarehouseResponseDto updateWarehouse(@PathVariable (value = "userId") Integer userId,
                                                    @PathVariable (value = "warehouseId") Integer warehouseId,
                                                    @Valid @RequestBody PostWarehouseRequestDto warehouseDetails) {
        return warehouseService.updateWarehouse(userId, warehouseId, warehouseDetails.getName(), warehouseDetails.getAddress());
    }

    @DeleteMapping("/user/{userId}/warehouse/{warehouseId}")
    public void deleteWarehouse(@PathVariable (value = "userId") Integer userId,
                                @PathVariable (value = "warehouseId") Integer warehouseId) {
        warehouseService.deleteWarehouse(userId, warehouseId);
    }
}

package com.example.controller;

import com.example.config.UserInfo;
import com.example.dto.PostWarehouseRequestDto;
import com.example.dto.PostWarehouseResponseDto;
import com.example.dto.WarehouseDto;
import com.example.service.WarehouseService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
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

    @GetMapping("/warehouses")
    public List<WarehouseDto> getAllUsersWarehouses(Authentication auth) {
        log.info("{} request to get all warehouses", auth);
        Integer userId = ((UserInfo)auth.getPrincipal()).getId();
        return warehouseService.getAllUsersWarehouses(userId);
    }

    @PostMapping("/warehouse")
    public PostWarehouseResponseDto createWarehouse(Authentication auth,
                                                    @Valid @RequestBody PostWarehouseRequestDto warehouseDetails) {
        Integer userId = ((UserInfo)auth.getPrincipal()).getId();
        return warehouseService.createWarehouse(userId, warehouseDetails.getName(), warehouseDetails.getAddress());
    }

    @PutMapping("/warehouse/{warehouseId}")
    public PostWarehouseResponseDto updateWarehouse(Authentication auth,
                                                    @PathVariable (value = "warehouseId") int warehouseId,
                                                    @Valid @RequestBody PostWarehouseRequestDto warehouseDetails) {
        Integer userId = ((UserInfo)auth.getPrincipal()).getId();
        return warehouseService.updateWarehouse(userId, warehouseId, warehouseDetails.getName(), warehouseDetails.getAddress());
    }

    @DeleteMapping("/warehouse/{warehouseId}")
    public void deleteWarehouse(Authentication auth,
                                @PathVariable (value = "warehouseId") int warehouseId) {
        Integer userId = ((UserInfo)auth.getPrincipal()).getId();
        warehouseService.deleteWarehouse(userId, warehouseId);
    }
}

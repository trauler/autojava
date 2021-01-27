package com.example.service;

import com.example.dto.WarehouseDto;
import com.example.model.User;
import com.example.model.Warehouse;
import com.example.repositore.UserRepository;
import com.example.repositore.WarehouseRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class WarehouseService {

    private final WarehouseRepository warehouseRepository;
    private final UserRepository userRepository;

    public WarehouseService(WarehouseRepository warehouseRepository, UserRepository userRepository) {
        this.warehouseRepository = warehouseRepository;
        this.userRepository = userRepository;
    }

    public List<WarehouseDto> getAllUsersWarehouses(Integer id) {
        return userRepository.findById(id)
                .map(User::getWarehouseList)
                .map(wl -> wl.stream().map(this::convertToWarehouseDto).collect(Collectors.toList()))
                .orElseThrow();
    }
    private WarehouseDto convertToWarehouseDto(Warehouse warehouse) {
        WarehouseDto warehouseDto = new WarehouseDto();
        warehouseDto.setName(warehouse.getName());
        return warehouseDto;
    }
}

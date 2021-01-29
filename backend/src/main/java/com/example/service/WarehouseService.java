package com.example.service;

import com.example.dto.PostWarehouseRequestDto;
import com.example.dto.PostWarehouseResponseDto;
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

    public PostWarehouseResponseDto createWarehouse(Integer userId, String name, String address) {
        Warehouse warehouse = new Warehouse();
        warehouse.setUser(userRepository.findById(userId).orElseThrow());
        warehouse.setName(name);
        warehouse.setAddress(address);
        return convertToPostWarehouseResponseDto(warehouseRepository.save(warehouse));
    }

    public List<WarehouseDto> getAllUsersWarehouses(Integer id) {
        return userRepository.findById(id)
                .map(User::getWarehouseList)
                .map(wl -> wl.stream().map(this::convertToWarehouseDto).collect(Collectors.toList()))
                .orElseThrow();
    }
    //fix it redundant userID
    public void deleteWarehouse(Integer userId, Integer warehouseId) {
        Warehouse warehouse = warehouseRepository.findById(warehouseId).orElseThrow();
        warehouseRepository.delete(warehouse);
    }
    //fix it redundant userID
    public PostWarehouseResponseDto updateWarehouse(Integer userId, Integer warehouseId, String name, String address) {
        Warehouse warehouse = warehouseRepository.findById(warehouseId).orElseThrow();
        warehouse.setName(name);
        warehouse.setAddress(address);
        return convertToPostWarehouseResponseDto(warehouseRepository.save(warehouse));
    }

    private PostWarehouseResponseDto convertToPostWarehouseResponseDto(Warehouse warehouse) {
        PostWarehouseResponseDto postWarehouseResponseDto = new PostWarehouseResponseDto();
        postWarehouseResponseDto.setName(warehouse.getName());
        postWarehouseResponseDto.setAddress(warehouse.getAddress());
        return postWarehouseResponseDto;
    }


    private WarehouseDto convertToWarehouseDto(Warehouse warehouse) {
        WarehouseDto warehouseDto = new WarehouseDto();
        warehouseDto.setName(warehouse.getName());
        return warehouseDto;
    }
}

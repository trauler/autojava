package com.example.controller;

import com.example.config.UserInfo;
import com.example.dto.GetCarResponseDto;
import com.example.service.CarService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
//TODO car to vehicle
@RestController
@RequestMapping("/api")
public class CarController {
    private final CarService carService;

    public CarController(CarService carService) {
        this.carService = carService;
    }

    @GetMapping("/client/{clientId}/cars")
    public List<GetCarResponseDto> getAllClientsCar(Authentication auth,
                                                    @PathVariable(value = "clientId") int clientId) {
        Integer userId = ((UserInfo)auth.getPrincipal()).getId();
        return carService.getAllClientsCars(userId, clientId);
    }

    @PostMapping("/client/{id}/car")
    public GetCarResponseDto createCar(Authentication auth,
                                       @PathVariable(value = "clientId") int clientId,
                                       @Valid @RequestBody GetCarResponseDto carDetails) {
        Integer userId = ((UserInfo)auth.getPrincipal()).getId();
        return carService.createCar(userId, clientId, carDetails.getBrand(),
                carDetails.getModel(), carDetails.getVin(), carDetails.getPlate());
    }

    @PutMapping("/client/{clientId}/car/{carId}")
    public GetCarResponseDto updateCar(Authentication auth,
                                       @PathVariable(value = "clientId") int clientId,
                                       @Valid @RequestBody GetCarResponseDto carDetails,
                                       @PathVariable(value = "carId") int carId) {
        Integer userId = ((UserInfo)auth.getPrincipal()).getId();
        return carService.updateCar(userId, clientId, carId, carDetails.getBrand(),
                carDetails.getModel(), carDetails.getVin(), carDetails.getPlate());
    }

    //TODO fix it
    @DeleteMapping("/client/{clientId}/car/{carId}")
    public void deleteCar(Authentication auth,
                          @PathVariable(value = "clientId") int clientId,
                          @PathVariable(value = "carId") int carId) {
        Integer userId = ((UserInfo)auth.getPrincipal()).getId();
        carService.deleteCar(userId, carId);
    }
}
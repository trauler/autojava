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
//@RequestMapping("/api")
public class CarController {
    private final CarService carService;

    public CarController(CarService carService) {
        this.carService = carService;
    }

    @GetMapping("/clients/{clientId}/cars")
    public List<GetCarResponseDto> getAllClientsCar(Authentication auth,
                                                    @PathVariable(value = "clientId") int clientId) {
        return carService.getAllClientsCars(auth, clientId);
    }

    @PostMapping("/clients/{clientId}/cars")
    public GetCarResponseDto createCar(Authentication auth,
                                       @PathVariable(value = "clientId") int clientId,
                                       @Valid @RequestBody GetCarResponseDto carDetails) {
        return carService.createCar(auth, clientId, carDetails.getBrand(),
                carDetails.getModel(), carDetails.getVin(), carDetails.getPlate());
    }

    @PutMapping("/clients/{clientId}/cars/{carId}")
    public GetCarResponseDto updateCar(Authentication auth,
                                       @PathVariable(value = "clientId") int clientId,
                                       @Valid @RequestBody GetCarResponseDto carDetails,
                                       @PathVariable(value = "carId") int carId) {
        return carService.updateCar(auth, clientId, carId, carDetails.getBrand(),
                carDetails.getModel(), carDetails.getVin(), carDetails.getPlate());
    }

    @DeleteMapping("/clients/{clientId}/cars/{carId}")
    public void deleteCar(Authentication auth,
                          @PathVariable(value = "clientId") int clientId,
                          @PathVariable(value = "carId") int carId) {
        carService.deleteCar(auth, carId);
    }
}
package com.example.controller;

import com.example.dto.GetCarResponseDto;
import com.example.service.CarService;
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

    @GetMapping("/client/{id}/cars")
    public List<GetCarResponseDto> getAllClientsCar(@PathVariable(value = "id") int id) {
        return carService.getAllClientsCars(id);
    }

    @PostMapping("/client/{id}/car")
    public GetCarResponseDto createCar(@PathVariable(value = "id") int id,
                                       @Valid @RequestBody GetCarResponseDto carDetails) {
        return carService.createCar(id, carDetails.getBrand(), carDetails.getModel(), carDetails.getVin(), carDetails.getPlate());
    }

    @PutMapping("/client/{clientId}/car/{carId}")
    public GetCarResponseDto updateCar(@PathVariable(value = "clientId") int clientId,
                                       @Valid @RequestBody GetCarResponseDto carDetails,
                                       @PathVariable(value = "carId") int carId) {
        return carService.updateCar(clientId, carId, carDetails.getBrand(),
                carDetails.getModel(), carDetails.getVin(), carDetails.getPlate());
    }

    //TODO fix it
    @DeleteMapping("/client/{clientId}/car/{carId}")
    public void deleteCar(@PathVariable(value = "clientId") int clientId,
                          @PathVariable(value = "carId") int carId) {
        carService.deleteCar(carId);
    }
}
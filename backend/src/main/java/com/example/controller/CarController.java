package com.example.controller;

import com.example.dto.GetCarResponseDto;
import com.example.service.CarService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

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

    @PutMapping("/client/{id}/car/{id1}")
    public GetCarResponseDto updateCar(@PathVariable(value = "id") int clientId,
                                       @Valid @RequestBody GetCarResponseDto carDetails,
                                       @PathVariable(value = "id1") int carId) {
        return carService.updateCar(clientId, carId, carDetails.getBrand(),
                carDetails.getModel(), carDetails.getVin(), carDetails.getPlate());
    }

    @DeleteMapping("/client/{id}/car/{id1}")
    public void deleteCar(@PathVariable(value = "id") int clientId,
                          @PathVariable(value = "id1") int carId) {
        carService.deleteCar(carId);
    }
}
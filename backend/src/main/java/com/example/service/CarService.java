package com.example.service;

import com.example.controller.AbstractController;
import com.example.dto.GetCarResponseDto;
import com.example.model.Car;
import com.example.model.Client;
import com.example.repositore.CarRepository;
import com.example.repositore.ClientRepository;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CarService {

    private final ClientRepository clientRepository;
    private final CarRepository carRepository;
    private final AbstractController abstractController;

    public CarService(ClientRepository clientRepository, CarRepository carRepository, AbstractController abstractController) {
        this.clientRepository = clientRepository;
        this.carRepository = carRepository;
        this.abstractController = abstractController;
    }

    public List<GetCarResponseDto> getAllClientsCars(Authentication auth, int clientId) {
        Client client = clientRepository.findById(clientId).orElseThrow();
        int userId = abstractController.getUserIdFromAuth(auth);
        if (client.getUser().getId() != userId) {
            throw new RuntimeException(userId + " cannot view these cars");
        }
        return clientRepository.findById(clientId)
                .map(Client::getCarList)
                .map(cl -> cl.stream().map(this::convertToGetCarResponseDto).collect(Collectors.toList()))
                .orElseThrow();
    }

    public GetCarResponseDto createCar(Authentication auth, int clientId, String brand, String model, String vin, String plate) {
        Client client = clientRepository.findById(clientId).orElseThrow();
        int userId = abstractController.getUserIdFromAuth(auth);
        if (client.getUser().getId() != userId) {
            throw new RuntimeException(userId + " cannot create car here");
        }
        Car car = new Car();
        car.setClient(client);
        car.setBrand(brand);
        car.setModel(model);
        car.setVin(vin);
        car.setPlate(plate);
        return convertToGetCarResponseDto(carRepository.save(car));
    }

    public GetCarResponseDto updateCar(Authentication auth, int clientId, int carId, String brand, String model, String vin, String plate) {
        Client client = clientRepository.findById(clientId).orElseThrow();
        Car car = carRepository.findById(carId).orElseThrow();
        int userId = abstractController.getUserIdFromAuth(auth);
        if (client.getUser().getId() != userId) {
            throw new RuntimeException(userId + " cannot update this car");
        }
        car.setId(carId);
        car.setClient(client);
        car.setBrand(brand);
        car.setModel(model);
        car.setVin(vin);
        car.setPlate(plate);
        return convertToGetCarResponseDto(carRepository.save(car));
    }

    public void deleteCar(Authentication auth, int carId) {
        int userId = abstractController.getUserIdFromAuth(auth);
        carRepository.deleteById(carId);
    }

    private GetCarResponseDto convertToGetCarResponseDto(Car car) {
        GetCarResponseDto getCarResponseDto = new GetCarResponseDto();
        getCarResponseDto.setId(car.getId());
        getCarResponseDto.setBrand(car.getBrand());
        getCarResponseDto.setModel(car.getModel());
        getCarResponseDto.setVin(car.getVin());
        getCarResponseDto.setPlate(car.getPlate());
        return getCarResponseDto;
    }
}

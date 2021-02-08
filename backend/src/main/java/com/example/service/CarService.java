package com.example.service;

import com.example.dto.GetCarResponseDto;
import com.example.model.Car;
import com.example.model.Client;
import com.example.repositore.CarRepository;
import com.example.repositore.ClientRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CarService {

    private final ClientRepository clientRepository;
    private final CarRepository carRepository;

    public CarService(ClientRepository clientRepository, CarRepository carRepository) {
        this.clientRepository = clientRepository;
        this.carRepository = carRepository;
    }

    public List<GetCarResponseDto> getAllClientsCars(int userId, int clientId) {
        Client client = clientRepository.findById(clientId).orElseThrow();
        if (client.getUser().getId() != userId) {
            throw new RuntimeException(userId + " cannot view these cars");
        }
        return clientRepository.findById(clientId)
                .map(Client::getCarList)
                .map(cl -> cl.stream().map(this::convertToGetCarResponseDto).collect(Collectors.toList()))
                .orElseThrow();
    }

    public GetCarResponseDto createCar(int userId, int clientId, String brand, String model, String vin, String plate) {
        Client client = clientRepository.findById(clientId).orElseThrow();
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
//business logic problem
    public GetCarResponseDto updateCar(int userId, int clientId, int carId, String brand, String model, String vin, String plate) {
        Client client = clientRepository.findById(clientId).orElseThrow();
        Car car = carRepository.findById(carId).orElseThrow();
        if (client.getUser().getId() != userId) {
            throw new RuntimeException(userId + " cannot update this car");
        }
        car.setClient(client);
        car.setBrand(brand);
        car.setModel(model);
        car.setVin(vin);
        car.setPlate(plate);
        return convertToGetCarResponseDto(carRepository.save(car));
    }

    public void deleteCar(int userId, int carId) {

        carRepository.deleteById(carId);
    }

    private GetCarResponseDto convertToGetCarResponseDto(Car car) {
        GetCarResponseDto getCarResponseDto = new GetCarResponseDto();
        getCarResponseDto.setBrand(car.getBrand());
        getCarResponseDto.setModel(car.getModel());
        getCarResponseDto.setVin(car.getVin());
        getCarResponseDto.setPlate(car.getPlate());
        return getCarResponseDto;
    }
}

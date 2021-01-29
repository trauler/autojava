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

    public void deleteCar(int carId) {
        carRepository.deleteById(carId);
    }

    public GetCarResponseDto updateCar(int clientId, int carId, String brand, String model, String vin, String plate) {
        Client client = clientRepository.findById(clientId).orElseThrow();
        Car car = carRepository.findById(carId).orElseThrow();
        car.setClient(client);
        car.setBrand(brand);
        car.setModel(model);
        car.setVin(vin);
        car.setPlate(plate);
        return convertToGetCarResponseDto(carRepository.save(car));
    }

    public GetCarResponseDto createCar(int id, String brand, String model, String vin, String plate) {
        Car car = new Car();
        car.setClient(clientRepository.findById(id).orElseThrow());
        car.setBrand(brand);
        car.setModel(model);
        car.setVin(vin);
        car.setPlate(plate);
        return convertToGetCarResponseDto(carRepository.save(car));
    }

    public List<GetCarResponseDto> getAllClientsCars(Integer id) {
        return clientRepository.findById(id)
                .map(Client::getCarList)
                .map(cl -> cl.stream().map(this::convertToGetCarResponseDto).collect(Collectors.toList()))
                .orElseThrow();
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

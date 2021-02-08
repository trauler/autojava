package com.example.service;

import com.example.dto.ServiceDto;
import com.example.model.User;
import com.example.repositore.ServiceRepository;
import com.example.repositore.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceService {

    private final ServiceRepository serviceRepository;
    private final UserRepository userRepository;

    public ServiceService(ServiceRepository serviceRepository, UserRepository userRepository) {
        this.serviceRepository = serviceRepository;
        this.userRepository = userRepository;
    }

    public List<ServiceDto> gelAllUsersServices(int userId) {
        return userRepository.findById(userId)
                .map(User::getServiceList)
                .map(sl -> sl.stream().map(this::convertToServiceDto).collect(Collectors.toList()))
                .orElseThrow();
    }

    public ServiceDto createService(int userId, String name, int cost) {
        com.example.model.Service service = new com.example.model.Service();
        service.setUser(userRepository.findById(userId).orElseThrow());
        service.setName(name);
        service.setCost(cost);
        return convertToServiceDto(serviceRepository.save(service));
    }

    public ServiceDto updateService(int userId, int serviceId, String name, int cost) {
        com.example.model.Service service = new com.example.model.Service();
    if (service.getUser().getId() != userId) {
        throw new RuntimeException(userId + " cannot update this service");
    }
    return convertToServiceDto(serviceRepository.save(service));
    }

    public void deleteService(int userId, int serviceId) {
        com.example.model.Service service = serviceRepository.findById(serviceId).orElseThrow();
        if (service.getUser().getId() != userId) {
            throw new RuntimeException(userId + " cannot update this service");
        }
        serviceRepository.deleteById(serviceId);

    }

    private ServiceDto convertToServiceDto(com.example.model.Service service) {
        ServiceDto serviceDto = new ServiceDto();
        serviceDto.setName(service.getName());
        serviceDto.setCost(service.getCost());
        return serviceDto;
    }
}
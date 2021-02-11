package com.example.service;

import com.example.dto.ServiceTypeDto;
import com.example.model.ServiceType;
import com.example.model.User;
import com.example.repositore.ServiceTypeRepository;
import com.example.repositore.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceTypeService {

    private final ServiceTypeRepository serviceTypeRepository;
    private final UserRepository userRepository;

    public ServiceTypeService(ServiceTypeRepository serviceTypeRepository, UserRepository userRepository) {
        this.serviceTypeRepository = serviceTypeRepository;
        this.userRepository = userRepository;
    }

    public List<ServiceTypeDto> getAllServiceType(int userId) {
        return userRepository.findById(userId)
                .map(User::getServiceTypeList)
                .map(sl -> sl.stream().map(this::convertToServiceTypeDto).collect(Collectors.toList()))
                .orElseThrow();
    }

    public ServiceTypeDto createServiceType(int userId, String name) {
        ServiceType serviceType = new ServiceType();
        serviceType.setUser(userRepository.findById(userId).orElseThrow());
        serviceType.setName(name);
        return convertToServiceTypeDto(serviceTypeRepository.save(serviceType));
    }

    public ServiceTypeDto updateServiceType(int userId, int serviceTypeId, String name) {
        ServiceType serviceType = serviceTypeRepository.findById(serviceTypeId).orElseThrow();
        if (serviceType.getUser().getId() != userId) {
            throw new RuntimeException(userId + " cannot update this service type");
        }
        serviceType.setName(name);
        return convertToServiceTypeDto(serviceTypeRepository.save(serviceType));
    }

    public void deleteServiceType(int userId, int serviceTypeId) {
        ServiceType serviceType = serviceTypeRepository.findById(serviceTypeId).orElseThrow();
        if (serviceType.getUser().getId() != userId) {
            throw new RuntimeException(userId + " cannot delete this service type");
        }
        serviceTypeRepository.deleteById(serviceTypeId);
    }

    private ServiceTypeDto convertToServiceTypeDto(ServiceType serviceType) {
        ServiceTypeDto serviceTypeDto = new ServiceTypeDto();
        serviceTypeDto.setName(serviceType.getName());
        return serviceTypeDto;
    }
}

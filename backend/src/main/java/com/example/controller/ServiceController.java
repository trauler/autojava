package com.example.controller;

import com.example.config.UserInfo;
import com.example.dto.ServiceDto;
import com.example.service.ServiceService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ServiceController {
    private final Logger log = LoggerFactory.getLogger(ServiceController.class);

    private final ServiceService serviceService;

    public ServiceController(ServiceService serviceService) {
        this.serviceService = serviceService;
    }

    @GetMapping("/services")
    public List<ServiceDto> getAllUsersServices(Authentication auth) {
        log.info("{} request to get services", auth);
        Integer userId = ((UserInfo)auth.getPrincipal()).getId();
        return serviceService.gelAllUsersServices(userId);
    }

    @PostMapping("/service")
    public ServiceDto createService(Authentication auth,
                                    @Valid @RequestBody ServiceDto serviceDetails) {
        log.info("{} request to create a service", auth);
        Integer userId = ((UserInfo)auth.getPrincipal()).getId();
        return serviceService.createService(userId, serviceDetails.getName(), serviceDetails.getCost());
    }

    @PutMapping("/service/{serviceId}")
    public ServiceDto updateService(Authentication auth,
                                    @PathVariable(value = "serviceId") int serviceId,
                                    @Valid @RequestBody ServiceDto serviceDetails) {
        log.info("{} request to update a service", auth);
        Integer userId = ((UserInfo)auth.getPrincipal()).getId();
        return serviceService.updateService(userId, serviceId, serviceDetails.getName(), serviceDetails.getCost());
    }

    @DeleteMapping("/service/{serviceId}")
    public void deleteService(Authentication auth,
                              @PathVariable(value = "serviceId") int serviceId) {
        log.info("{} request to delete a service", auth);
        Integer userId = ((UserInfo)auth.getPrincipal()).getId();
        serviceService.deleteService(userId, serviceId);
    }
}
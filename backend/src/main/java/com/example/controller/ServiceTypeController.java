package com.example.controller;

import com.example.config.UserInfo;
import com.example.dto.ServiceTypeDto;
import com.example.service.ServiceTypeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ServiceTypeController {
    private final Logger log = LoggerFactory.getLogger(ServiceTypeController.class);

    private final ServiceTypeService serviceTypeService;

    public ServiceTypeController(ServiceTypeService serviceTypeService) {
        this.serviceTypeService = serviceTypeService;
    }

    @GetMapping("/serviceTypes")
    public List<ServiceTypeDto> getAllServiceTypes(Authentication auth) {
        log.info("{} request to get all service types", auth);
        Integer userId = ((UserInfo)auth.getPrincipal()).getId();
        return serviceTypeService.getAllServiceType(userId);
    }

    @PostMapping("/serviceType")
    public ServiceTypeDto createService(Authentication auth,
                                        @Valid @RequestBody ServiceTypeDto serviceTypeDetails) {
        Integer userId = ((UserInfo)auth.getPrincipal()).getId();
        return serviceTypeService.createServiceType(userId, serviceTypeDetails.getName());
    }

    @PutMapping("/serviceType/{serviceTypeId}")
    public ServiceTypeDto updateService(Authentication auth,
                                        @PathVariable (value = "serviceTypeId") int serviceTypeId,
                                        @Valid @RequestBody ServiceTypeDto serviceTypeDetails) {
        Integer userId = ((UserInfo)auth.getPrincipal()).getId();
        return serviceTypeService.updateServiceType(userId, serviceTypeId, serviceTypeDetails.getName());
    }

    @DeleteMapping("/serviceType/{serviceTypeId}")
    public void deleteService(Authentication auth,
                                        @PathVariable (value = "serviceTypeId") int serviceTypeId) {
        Integer userId = ((UserInfo)auth.getPrincipal()).getId();
        serviceTypeService.deleteServiceType(userId, serviceTypeId);
    }
}
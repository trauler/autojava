package com.example.service;

import com.example.dto.WorkshopDto;
import com.example.model.User;
import com.example.model.Workshop;
import com.example.repositore.UserRepository;
import com.example.dto.UserWorkshopDto;
import com.example.repositore.WorkshopRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class WorkshopService {

    private final WorkshopRepository workshopRepository;
    private final UserRepository userRepository;

    public WorkshopService(WorkshopRepository workshopRepository, UserRepository userRepository) {
        this.workshopRepository = workshopRepository;
        this.userRepository = userRepository;
    }

    public List<UserWorkshopDto> getAllUsersWorkshops(int userId) {
        return userRepository.findById(userId)
                .map(User::getWorkshopList)
                .map(wl -> wl.stream().map(this::convertToUserWorkshopServiceDTO).collect(Collectors.toList()))
                .orElseThrow();
    }

    public WorkshopDto createWorkshop(String name, int userId) {
        Workshop workshop = new Workshop();
        workshop.setName(name);
        workshop.setUser(userRepository.findById(userId).orElseThrow());
        return convertToWorkshopDto(workshopRepository.save(workshop));
    }

    public WorkshopDto updateWorkshop(int userId, int workshopId, String name) {
        Workshop workshop = workshopRepository.findById(workshopId).orElseThrow();
        if (workshop.getUser().getId() != userId) {
            throw new RuntimeException(userId + " cannot update this workshop");
        }
        workshop.setName(name);
        return convertToWorkshopDto(workshopRepository.save(workshop));
    }

    public void deleteWorkshop(int userId, int workshopId) {
        Workshop workshop = workshopRepository.findById(workshopId).orElseThrow();
        if (workshop.getUser().getId() != userId) {
            throw new RuntimeException(userId + " cannot update this workshop");
        }
        workshopRepository.deleteById(workshopId);
    }

    private WorkshopDto convertToWorkshopDto(Workshop workshop) {
        WorkshopDto workshopDto = new WorkshopDto();
        workshopDto.setWorkshopName((workshop.getName()));
        return workshopDto;
    }

    private UserWorkshopDto convertToUserWorkshopServiceDTO(Workshop workshop) {
        UserWorkshopDto userWorkshopDTO = new UserWorkshopDto();
        userWorkshopDTO.setWorkshopName(workshop.getName());
        User user = workshop.getUser();
        userWorkshopDTO.setName(user.getName());
        userWorkshopDTO.setEmail(user.getEmail());
        return userWorkshopDTO;
    }
}
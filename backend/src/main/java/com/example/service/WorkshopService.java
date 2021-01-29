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

    public List<UserWorkshopDto> getAllUsersWorkshops(Integer id) {
        return userRepository.findById(id)
                .map(User::getWorkshopList)
                .map(wl -> wl.stream().map(this::convertToUserWorkshopServiceDTO).collect(Collectors.toList()))
                .orElseThrow();
    }

    public void deleteWorkshop(Integer id) {
        workshopRepository.deleteById(id);
    }

    public WorkshopDto updateWorkshop(int id, String name) {
        Workshop workshop = workshopRepository.findById(id).orElseThrow();
        workshop.setName(name);
        return convertToWorkshopDto(workshopRepository.save(workshop));
    }

    public WorkshopDto createWorkshop(String name, int userId) {
        Workshop workshop = new Workshop();
        workshop.setName(name);
        workshop.setUser(userRepository.findById(userId).orElseThrow());
        return convertToWorkshopDto(workshopRepository.save(workshop));

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
package com.example.springboot;

import com.example.model.User;
import com.example.model.Workshop;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserWorkshopService {

    private final WorkshopRepository workshopRepository;

    public UserWorkshopService(WorkshopRepository workshopRepository) {
        this.workshopRepository = workshopRepository;
    }

    public List<UserWorkshopDto> getAllUsersWorkshops(Integer id) {
        return ((List<UserWorkshopDto>) workshopRepository.findAllById(id).stream().map(this::convertToUserWorkshopService).collect(Collectors.toList()));
    }


    private UserWorkshopDto convertToUserWorkshopService(Workshop workshop) {
        UserWorkshopDto userWorkshopDTO = new UserWorkshopDto();
        userWorkshopDTO.setWorkshopName(workshop.getName());
        User user = workshop.getUser();
        userWorkshopDTO.setWorkshopName(user.getName());
        return userWorkshopDTO;
    }
}

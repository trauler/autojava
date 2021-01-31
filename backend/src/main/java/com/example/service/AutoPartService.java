package com.example.service;

import com.example.dto.AutoPartDto;
import com.example.model.AutoPart;
import com.example.model.User;
import com.example.repositore.AutoPartsRepository;
import com.example.repositore.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AutoPartService {

    private final UserRepository userRepository;
    private final AutoPartsRepository autoPartsRepository;

    public AutoPartService(UserRepository userRepository, AutoPartsRepository autoPartsRepository) {
        this.userRepository = userRepository;
        this.autoPartsRepository = autoPartsRepository;
    }



    public List<AutoPartDto> getAllUsersAutoParts(int id) {
        return userRepository.findById(id)
                .map(User::getAutoPartClient)
                .map(al -> al.stream().map(this::convertToAutoPartDto).collect(Collectors.toList()))
                .orElseThrow();
    }

    private AutoPartDto convertToAutoPartDto(AutoPart autoPart) {
        AutoPartDto autoPartDto = new AutoPartDto();
        autoPartDto.setName(autoPart.getName());
        autoPartDto.setDescription(autoPart.getDescription());
        autoPartDto.setPurchasePrice(autoPart.getPurchasePrice());
        autoPartDto.setRetailPrice(autoPart.getRetailPrice());
        autoPartDto.setQuantity(autoPart.getQuantity());
        return autoPartDto;
    }
}

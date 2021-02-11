package com.example.service;

import com.example.dto.AutoPartDto;
import com.example.model.AutoPart;
import com.example.model.User;
import com.example.repositore.AutoPartRepository;
import com.example.repositore.UserRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AutoPartService {

    private final UserRepository userRepository;
    private final AutoPartRepository autoPartRepository;

    public AutoPartService(UserRepository userRepository, AutoPartRepository autoPartRepository) {
        this.userRepository = userRepository;
        this.autoPartRepository = autoPartRepository;
    }

    public List<AutoPartDto> getAllUsersAutoParts(int userId) {
        return userRepository.findById(userId)
                .map(User::getAutoPartClient)
                .map(al -> al.stream().map(this::convertToAutoPartDto).collect(Collectors.toList()))
                .orElseThrow();
    }

    public AutoPartDto createAutoPart(int userId, String name, String description, int purchasePrice, int retailPrice, BigDecimal quantity) {
        AutoPart autoPart = new AutoPart();
        autoPart.setUser(userRepository.findById(userId).orElseThrow());
        autoPart.setName(name);
        autoPart.setDescription(description);
        autoPart.setPurchasePrice(purchasePrice);
        autoPart.setRetailPrice(retailPrice);
        autoPart.setQuantity(quantity);
        return convertToAutoPartDto(autoPartRepository.save(autoPart));
    }

    public AutoPartDto updateAutoPart(int userId, int partId, String name, String description, int purchasePrice, int retailPrice, BigDecimal quantity) {
        AutoPart autoPart = autoPartRepository.findById(partId).orElseThrow();
        if (autoPart.getUser().getId() != userId) {
            throw new RuntimeException(userId + " cannot update this part");
        }
        autoPart.setName(name);
        autoPart.setDescription(description);
        autoPart.setPurchasePrice(purchasePrice);
        autoPart.setRetailPrice(retailPrice);
        autoPart.setQuantity(quantity);
        return convertToAutoPartDto(autoPartRepository.save(autoPart));
    }

    public void deleteAutoPart(int userId, int partId) {
        AutoPart autoPart = autoPartRepository.findById(partId).orElseThrow();
        if (autoPart.getUser().getId() != userId) {
            throw new RuntimeException(userId + " cannot update this part");
        }
        autoPartRepository.deleteById(partId);

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
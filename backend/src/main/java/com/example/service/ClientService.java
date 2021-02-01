package com.example.service;

import com.example.dto.GetClientResponseDto;
import com.example.model.Client;
import com.example.model.User;
import com.example.repositore.ClientRepository;
import com.example.repositore.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClientService {

    private final UserRepository userRepository;
    private final ClientRepository clientRepository;

    public ClientService(UserRepository userRepository, ClientRepository clientRepository) {
        this.userRepository = userRepository;
        this.clientRepository = clientRepository;
    }

    public List<GetClientResponseDto> getAllUsersClients(int userId) {
        return userRepository.findById(userId)
                .map(User::getClientList)
                .map(cl -> cl.stream().map(this::convertToGetClientResponseDto).collect(Collectors.toList()))
                .orElseThrow();
    }

    public GetClientResponseDto createClient(int userId, String name, String surname, String middleName, String phone, String email) {
        Client client = new Client();
        client.setUser(userRepository.findById(userId).orElseThrow());
        client.setName(name);
        client.setSurname(surname);
        client.setMiddleName(middleName);
        client.setPhone(phone);
        client.setEmail(email);
        return convertToGetClientResponseDto(clientRepository.save(client));
    }

    public GetClientResponseDto updateClient(int userId, int clientId, String name, String surname, String middleName, String phone, String email) {
        Client client = clientRepository.findById(clientId).orElseThrow();
        if (client.getUser().getId() != userId) {
            throw new RuntimeException(userId + " cannot update this client");
        }
        client.setName(name);
        client.setSurname(surname);
        client.setMiddleName(middleName);
        client.setPhone(phone);
        client.setEmail(email);
        return convertToGetClientResponseDto(clientRepository.save(client));
    }

    public void deleteClient(int userId, int clientId) {
        Client client = clientRepository.findById(clientId).orElseThrow();
        if (client.getUser().getId() != userId) {
            throw new RuntimeException(userId + " cannot delete this client");
        }
        clientRepository.deleteById(clientId);
    }

    private GetClientResponseDto convertToGetClientResponseDto(Client client) {
        GetClientResponseDto getClientResponseDto = new GetClientResponseDto();
        getClientResponseDto.setName(client.getName());
        getClientResponseDto.setSurname(client.getSurname());
        getClientResponseDto.setMiddleName(client.getMiddleName());
        getClientResponseDto.setPhone(client.getPhone());
        getClientResponseDto.setEmail(client.getEmail());
        return getClientResponseDto;
    }
}
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

    public GetClientResponseDto createClient(int id, String name, String surname, String middleName, String phone, String email) {
        Client client = new Client();
        client.setUser(userRepository.findById(id).orElseThrow());
        client.setName(name);
        client.setSurname(surname);
        client.setMiddleName(middleName);
        client.setPhone(phone);
        client.setEmail(email);
        return convertToGetClientResponseDto(clientRepository.save(client));
    }
    //fix it redundant userID
    public GetClientResponseDto updateClient(int id, String name, String surname, String middleName, String phone, String email) {
        Client client = clientRepository.findById(id).orElseThrow();
        client.setName(name);
        client.setSurname(surname);
        client.setMiddleName(middleName);
        client.setPhone(phone);
        client.setEmail(email);
        return convertToGetClientResponseDto(clientRepository.save(client));
    }

    public void deleteClient(Integer id) {
        clientRepository.deleteById(id);
    }

    public List<GetClientResponseDto> getAllUsersClients(Integer id) {
        return userRepository.findById(id)
                .map(User::getClientList)
                .map(cl -> cl.stream().map(this::convertToGetClientResponseDto).collect(Collectors.toList()))
                .orElseThrow();
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

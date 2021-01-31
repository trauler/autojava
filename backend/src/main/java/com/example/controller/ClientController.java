package com.example.controller;

import com.example.dto.GetClientResponseDto;
import com.example.service.ClientService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ClientController {

    private final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping("/user/{id}/clients")
    public List<GetClientResponseDto> getAllUsersClients(@PathVariable (value = "id") int id) {
        List<GetClientResponseDto> clientList = clientService.getAllUsersClients(id);
        return clientList;
    }

    @PostMapping("/user/{id}/client")
    public GetClientResponseDto createClient(@PathVariable (value = "id") int id,
                                             @Valid @RequestBody GetClientResponseDto clientDetails) {
        return clientService.createClient(id, clientDetails.getName(), clientDetails.getSurname(),
                clientDetails.getMiddleName(), clientDetails.getPhone(), clientDetails.getEmail());
    }

    @PutMapping("/client/{clientId}")
    public GetClientResponseDto updateClient(@PathVariable (value = "clientId") int clientId,
                                             @Valid @RequestBody GetClientResponseDto clientDetails) {
        return clientService.updateClient(clientId, clientDetails.getName(), clientDetails.getSurname(),
                clientDetails.getMiddleName(), clientDetails.getPhone(), clientDetails.getEmail());
    }

    @DeleteMapping("/client/{id}")
    public void deleteClient(@PathVariable (value = "id") int clientID) {
        clientService.deleteClient(clientID);
    }
}
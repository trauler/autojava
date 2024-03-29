package com.example.controller;

import com.example.config.UserInfo;
import com.example.dto.GetClientResponseDto;
import com.example.dto.UserAuthDto;
import com.example.model.User;
import com.example.service.ClientService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class ClientController {
    private final Logger log = LoggerFactory.getLogger(ClientController.class);

    private final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping("/clients")
    public List<GetClientResponseDto> getAllUsersClients(Authentication auth) {
        log.info("{} request to get all users clients", auth);
        List<GetClientResponseDto> clientList = clientService.getAllUsersClients(auth);
        return clientList;
    }

    @PostMapping("/clients")
    public GetClientResponseDto createClient(Authentication auth,
                                             @Valid @RequestBody GetClientResponseDto clientDetails) {
        log.info("{} request to create new client", auth);
        Integer userId = ((UserInfo)auth.getPrincipal()).getId();
        return clientService.createClient(userId, clientDetails.getName(), clientDetails.getSurname(),
                clientDetails.getMiddleName(), clientDetails.getPhone(), clientDetails.getEmail());
    }

    @PutMapping("/clients/{clientId}")
    public GetClientResponseDto updateClient(Authentication auth,
                                             @PathVariable (value = "clientId") int clientId,
                                             @Valid @RequestBody GetClientResponseDto clientDetails) {
        log.info("{} request to update client", auth);
        return clientService.updateClient(clientId, clientDetails.getName(), clientDetails.getSurname(),
                clientDetails.getMiddleName(), clientDetails.getPhone(), clientDetails.getEmail(), auth);
    }

    @DeleteMapping("/clients/{clientId}")
    public void deleteClient(Authentication auth,
                             @PathVariable (value = "clientId") int clientId) {
        log.info("{} request to delete client", auth);
        Integer userId = ((UserInfo)auth.getPrincipal()).getId();
        clientService.deleteClient(userId, clientId);
    }
}
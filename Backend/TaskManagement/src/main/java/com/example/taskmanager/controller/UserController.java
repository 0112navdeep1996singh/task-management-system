package com.example.taskmanager.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.taskmanager.dto.user.UserResponseDTO;
import com.example.taskmanager.entity.Role;
import com.example.taskmanager.repository.UserRepository;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserRepository userRepository;
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<UserResponseDTO> getAllUsers() {

        return userRepository.findAll()
                .stream()
                .filter(user -> user.getRole() == Role.USER)
                .map(user -> new UserResponseDTO(
                        user.getId(),
                        user.getUsername()
                ))
                .collect(Collectors.toList());
    }
}
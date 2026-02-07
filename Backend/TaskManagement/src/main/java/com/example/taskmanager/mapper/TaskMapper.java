package com.example.taskmanager.mapper;

import org.springframework.stereotype.Component;

import com.example.taskmanager.dto.task.TaskRequestDTO;
import com.example.taskmanager.dto.task.TaskResponseDTO;
import com.example.taskmanager.entity.Status;
import com.example.taskmanager.entity.Task;
import com.example.taskmanager.entity.User;

@Component
public class TaskMapper {

    public Task toEntity(TaskRequestDTO dto, User assignedUser) {
        Task task = new Task();
        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setPriority(dto.getPriority());
        task.setDueDate(dto.getDueDate());
        task.setStatus(Status.TODO);
        task.setAssignedUser(assignedUser);
        return task;
    }

    public TaskResponseDTO toDto(Task task) {
        TaskResponseDTO dto = new TaskResponseDTO();
        dto.setId(task.getId());
        dto.setTitle(task.getTitle());
        dto.setDescription(task.getDescription());
        dto.setPriority(task.getPriority());
        dto.setStatus(task.getStatus());
        dto.setDueDate(task.getDueDate());

        if (task.getAssignedUser() != null) {
            dto.setAssignedUsername(task.getAssignedUser().getUsername());
            dto.setAssignedUserId(task.getAssignedUser().getId());
        }

        return dto;
    }
}
package com.example.taskmanager.controller;

import java.security.Principal;
import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.taskmanager.dto.task.TaskRequestDTO;
import com.example.taskmanager.dto.task.TaskResponseDTO;
import com.example.taskmanager.dto.task.TaskStatusUpdateDTO;
import com.example.taskmanager.entity.Priority;
import com.example.taskmanager.entity.Status;
import com.example.taskmanager.service.TaskService;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<TaskResponseDTO> createTask(
            @RequestBody TaskRequestDTO request,
            Principal principal
    ) {
        return ResponseEntity.ok(
                taskService.createTask(request, principal.getName())
        );
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Page<TaskResponseDTO>> getTasks(
            Principal principal,
            @RequestParam(required = false) Status status,
            @RequestParam(required = false) Priority priority,
            @RequestParam(required = false) String dueDate,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        LocalDate parsedDueDate = (dueDate != null) ? LocalDate.parse(dueDate) : null;

        Page<TaskResponseDTO> tasks = taskService.getTasksForUserWithFilters(
                principal.getName(),
                status,
                priority,
                parsedDueDate,
                page,
                size
        );

        return ResponseEntity.ok(tasks);
    }


    @PutMapping("/{taskId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<TaskResponseDTO> updateTask(
            @PathVariable Long taskId,
            @RequestBody TaskRequestDTO request,
            Principal principal
    ) {
        return ResponseEntity.ok(
                taskService.updateTask(taskId, request, principal.getName())
        );
    }

    
    @PatchMapping("/{taskId}/status")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<TaskResponseDTO> updateTaskStatus(
            @PathVariable Long taskId,
            @RequestBody TaskStatusUpdateDTO request,
            Principal principal
    ) {
        return ResponseEntity.ok(
                taskService.updateTaskStatus(taskId, request, principal.getName())
        );
    }


    @DeleteMapping("/{taskId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteTask(
            @PathVariable Long taskId,
            Principal principal
    ) {
        taskService.deleteTask(taskId, principal.getName());
        return ResponseEntity.ok("Task deleted successfully");
    }
}
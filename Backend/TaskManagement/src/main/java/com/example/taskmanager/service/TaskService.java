package com.example.taskmanager.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import com.example.taskmanager.dto.task.TaskRequestDTO;
import com.example.taskmanager.dto.task.TaskResponseDTO;
import com.example.taskmanager.dto.task.TaskStatusUpdateDTO;
import com.example.taskmanager.entity.Priority;
import com.example.taskmanager.entity.Role;
import com.example.taskmanager.entity.Status;
import com.example.taskmanager.entity.Task;
import com.example.taskmanager.entity.User;
import com.example.taskmanager.mapper.TaskMapper;
import com.example.taskmanager.repository.TaskRepository;
import com.example.taskmanager.repository.UserRepository;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TaskMapper taskMapper;

    public TaskResponseDTO createTask(TaskRequestDTO request, String adminEmail) {

        User admin = getUserByEmail(adminEmail);

        if (admin.getRole() != Role.ADMIN) {
            throw new AccessDeniedException("Only ADMIN can assign tasks");
        }

        User assignedUser = userRepository.findById(request.getAssignedUserId())
                .orElseThrow(() -> new RuntimeException("Assigned user not found"));

        if (assignedUser.getRole() == Role.ADMIN) {
            throw new RuntimeException("Cannot assign task to another ADMIN");
        }

        Task task = taskMapper.toEntity(request, assignedUser);
        task.setStatus(Status.TODO);

        return taskMapper.toDto(taskRepository.save(task));
    }

    public List<TaskResponseDTO> getTasksForUser(String email) {
        User user = getUserByEmail(email);

        return taskRepository.findByAssignedUser(user)
                .stream()
                .map(taskMapper::toDto)
                .collect(Collectors.toList());
    }

    public Page<TaskResponseDTO> getTasksForUserWithFilters(
            String email,
            Status status,
            Priority priority,
            LocalDate dueDate,
            int page,
            int size
    ) {
        User user = getUserByEmail(email);
        Pageable pageable = PageRequest.of(page, size);
        Page<Task> tasks;

        if (user.getRole() == Role.ADMIN) {
            if (status != null && priority != null) {
                tasks = taskRepository.findByStatusAndPriority(status, priority, pageable);
            } else if (status != null) {
                tasks = taskRepository.findByStatus(status, pageable);
            } else if (priority != null) {
                tasks = taskRepository.findByPriority(priority, pageable);
            } else if (dueDate != null) {
                tasks = taskRepository.findByDueDate(dueDate, pageable);
            } else {
                tasks = taskRepository.findAll(pageable);
            }
        } else {
            if (status != null && priority != null) {
                tasks = taskRepository.findByAssignedUserAndStatusAndPriority(user, status, priority, pageable);
            } else if (status != null) {
                tasks = taskRepository.findByAssignedUserAndStatus(user, status, pageable);
            } else if (priority != null) {
                tasks = taskRepository.findByAssignedUserAndPriority(user, priority, pageable);
            } else if (dueDate != null) {
                tasks = taskRepository.findByAssignedUserAndDueDate(user, dueDate, pageable);
            } else {
                tasks = taskRepository.findByAssignedUser(user, pageable);
            }
        }

        return tasks.map(taskMapper::toDto);
    }
    public TaskResponseDTO updateTask(Long taskId, TaskRequestDTO request, String email) {

        Task task = getTaskById(taskId);
        User user = getUserByEmail(email);

        if (!task.getAssignedUser().getId().equals(user.getId()) && user.getRole() != Role.ADMIN) {
            throw new AccessDeniedException("Not allowed to update this task");
        }

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setPriority(request.getPriority());
        task.setDueDate(request.getDueDate());

        if (user.getRole() == Role.ADMIN) {
            User newAssignedUser = userRepository.findById(request.getAssignedUserId())
                    .orElseThrow(() -> new RuntimeException("Assigned user not found"));

            if (newAssignedUser.getRole() == Role.ADMIN) {
                throw new RuntimeException("Cannot assign task to another ADMIN");
            }

            task.setAssignedUser(newAssignedUser);
        }

        return taskMapper.toDto(taskRepository.save(task));
    }

    public TaskResponseDTO updateTaskStatus(Long taskId, TaskStatusUpdateDTO request, String email) {
        Task task = getTaskById(taskId);
        User user = getUserByEmail(email);

        if (!task.getAssignedUser().getId().equals(user.getId())) {
            throw new AccessDeniedException("Cannot update other user's task");
        }

        task.setStatus(request.getStatus());
        return taskMapper.toDto(taskRepository.save(task));
    }

    public void deleteTask(Long taskId, String email) {
        User user = getUserByEmail(email);

        if (user.getRole() != Role.ADMIN) {
            throw new AccessDeniedException("Only ADMIN can delete tasks");
        }

        Task task = getTaskById(taskId);
        taskRepository.delete(task);
    }

    private User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private Task getTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
    }
}
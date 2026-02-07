package com.example.taskmanager.dto.task;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import com.example.taskmanager.entity.Priority;

public class TaskRequestDTO {

    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    @NotNull(message = "Priority is required")
    private Priority priority;

    @NotNull(message = "Due date is required")
    private LocalDate dueDate;

    @NotNull(message = "Assigned user is required")
    private Long assignedUserId;

    public TaskRequestDTO() {
    }

    public String getTitle() {
        return title;
    }
 
    public void setTitle(String title) {
        this.title = title;
    }
 
    public String getDescription() {
        return description;
    }
 
    public void setDescription(String description) {
        this.description = description;
    }
 
    public Priority getPriority() {
        return priority;
    }
 
    public void setPriority(Priority priority) {
        this.priority = priority;
    }
 
    public LocalDate getDueDate() {
        return dueDate;
    }
 
    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }
 
    public Long getAssignedUserId() {
        return assignedUserId;
    }
 
    public void setAssignedUserId(Long assignedUserId) {
        this.assignedUserId = assignedUserId;
    }
}
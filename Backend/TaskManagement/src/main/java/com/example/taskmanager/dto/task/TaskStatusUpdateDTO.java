package com.example.taskmanager.dto.task;

import jakarta.validation.constraints.NotNull;

import com.example.taskmanager.entity.Status;

public class TaskStatusUpdateDTO {

    @NotNull(message = "Status is required")
    private Status status;

    public TaskStatusUpdateDTO() {
    }

    public Status getStatus() {
        return status;
    }
 
    public void setStatus(Status status) {
        this.status = status;
    }
}
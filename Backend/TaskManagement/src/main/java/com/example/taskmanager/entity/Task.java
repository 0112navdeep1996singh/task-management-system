package com.example.taskmanager.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 1000)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Priority priority;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @Column(nullable = false)
    private LocalDate dueDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_user_id")
    private User assignedUser;

    public Task() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
 
    public Status getStatus() {
        return status;
    }
 
    public void setStatus(Status status) {
        this.status = status;
    }
 
    public LocalDate getDueDate() {
        return dueDate;
    }
 
    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }
 
    public User getAssignedUser() {
        return assignedUser;
    }
 
    public void setAssignedUser(User assignedUser) {
        this.assignedUser = assignedUser;
    }
}
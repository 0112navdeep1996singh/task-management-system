package com.example.taskmanager.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.taskmanager.entity.Priority;
import com.example.taskmanager.entity.Status;
import com.example.taskmanager.entity.Task;
import com.example.taskmanager.entity.User;

public interface TaskRepository extends JpaRepository<Task, Long> {

	List<Task> findByAssignedUser(User user);
    Page<Task> findByAssignedUser(User user, Pageable pageable);

    Page<Task> findByAssignedUserAndStatus(User user, Status status, Pageable pageable);

    Page<Task> findByAssignedUserAndPriority(User user, Priority priority, Pageable pageable);

    Page<Task> findByAssignedUserAndDueDate(User user, LocalDate dueDate, Pageable pageable);

    Page<Task> findByAssignedUserAndStatusAndPriority(User user, Status status, Priority priority, Pageable pageable);

    Page<Task> findAll(Pageable pageable);
    
    Page<Task> findByStatus(Status status, Pageable pageable);

    Page<Task> findByPriority(Priority priority, Pageable pageable);

    Page<Task> findByDueDate(LocalDate dueDate, Pageable pageable);

    Page<Task> findByStatusAndPriority(Status status, Priority priority, Pageable pageable);

    Page<Task> findByStatusAndDueDate(Status status, LocalDate dueDate, Pageable pageable);

    Page<Task> findByPriorityAndDueDate(Priority priority, LocalDate dueDate, Pageable pageable);

    Page<Task> findByStatusAndPriorityAndDueDate(Status status, Priority priority, LocalDate dueDate, Pageable pageable);
}
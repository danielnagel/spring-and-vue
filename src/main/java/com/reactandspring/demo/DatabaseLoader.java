package com.reactandspring.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final EmployeeRepository repository;

    @Autowired
    public DatabaseLoader(EmployeeRepository employeeRepository) {
        this.repository = employeeRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        this.repository.save(new Employee("Frodo", "Badggins", "ring bearer"));
    }
}

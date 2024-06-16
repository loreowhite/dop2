package com.example.taxi.service;

import com.example.taxi.models.Driver;
import com.example.taxi.repository.DriverRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DriverService {
    private final DriverRepository repository;

    public List<Driver> getAllDrivers() {
        return repository.findAll();
    }

    public long createDriver(Driver driver) {
        return repository.save(driver).getId();
    }

    public void deleteDriverById(long id) {
        repository.deleteDriverById(id);
    }

    public void updateDriver(long id, Driver driver) {
        driver.setId(id);
        repository.save(driver);
    }

    public Driver getDriverById(long id) {
        return repository.findById(id).get();
    }
}

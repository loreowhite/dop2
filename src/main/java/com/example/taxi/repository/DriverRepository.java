package com.example.taxi.repository;

import com.example.taxi.models.Driver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface DriverRepository extends JpaRepository<Driver, Long> {
    void deleteDriverById(long id);
}

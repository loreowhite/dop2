package com.example.taxi.repository;

import com.example.taxi.models.DriverLicense;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DriverLicenceRepository extends JpaRepository<DriverLicense, Long> {
    DriverLicense findDriverLicenseByDriverId(long driverId);

    void deleteByDriverId(long driverId);

    boolean existsByNumber(long number);

    DriverLicense findByNumber(long number);
}

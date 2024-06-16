package com.example.taxi.service;

import com.example.taxi.models.DriverLicense;
import com.example.taxi.repository.DriverLicenceRepository;
import com.example.taxi.repository.DriverRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class DriverLicenseService {
    private final DriverLicenceRepository repository;
    private final DriverRepository driverRepository;

    public DriverLicense getLicenseByDriverId(long driverId) {
        return repository.findDriverLicenseByDriverId(driverId);
    }

    @Transactional
    public DriverLicense createLicense(long driverId, DriverLicense license) {
        if (repository.existsByNumber(license.getNumber())) {
            throw new IllegalArgumentException("Number already exist");
        }
        var driver = driverRepository.findById(driverId).get();
        license.setDriver(driver);
        driver.setLicense(license);
        return repository.save(license);
    }

    @Transactional
    public void updateLicenseById(long driverId, DriverLicense license) {
        var savedLicense = repository.findByNumber(license.getNumber());
        if (savedLicense == null) {
            throw new IllegalArgumentException("License does not exist");
        }
        if (savedLicense.getDriver().getId() != driverId) {
            throw new IllegalArgumentException("Invalid driver");
        }
        repository.save(license);
    }

    public void deleteLicenseByDriverId(long driverId) {
        repository.deleteByDriverId(driverId);
    }
}

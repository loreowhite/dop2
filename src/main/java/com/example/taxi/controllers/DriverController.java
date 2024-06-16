package com.example.taxi.controllers;

import com.example.taxi.models.Driver;
import com.example.taxi.service.DriverService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/driver")
@RequiredArgsConstructor
public class DriverController {
    private final DriverService service;

    @GetMapping
    public ResponseEntity<?> getAllDrivers() {
        return ResponseEntity.ok(service.getAllDrivers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getDriverById(@PathVariable("id") long id) {
        return ResponseEntity.ok(service.getDriverById(id));
    }

    @PostMapping
    public ResponseEntity<?> createDriver(@RequestBody Driver driver) {
        return ResponseEntity.ok(service.createDriver(driver));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateDriver(@PathVariable("id") long id,
                                          @RequestBody Driver driver) {
        service.updateDriver(id, driver);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDriver(@PathVariable("id") long id) {
        service.deleteDriverById(id);
        return ResponseEntity.ok().build();
    }

    @ExceptionHandler(RuntimeException.class)
    private ResponseEntity<?> handleIllegalArgument(IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }
}

package com.example.taxi.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {
    @GetMapping
    public String index() {
        return "index";
    }

    @GetMapping("/driver/{}")
    public String info() {
        return "info";
    }
}

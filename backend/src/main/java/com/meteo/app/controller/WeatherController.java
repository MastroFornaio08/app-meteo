package com.meteo.app.controller;

import com.meteo.app.dto.WeatherResponse;
import com.meteo.app.service.OpenMeteoService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/weather")
@CrossOrigin(origins = "*")
public class WeatherController {

    private final OpenMeteoService openMeteoService;

    public WeatherController(OpenMeteoService openMeteoService) {
        this.openMeteoService = openMeteoService;
    }

    @GetMapping("/current")
    public WeatherResponse getCurrentWeather(@RequestParam double lat, @RequestParam double lon) {
        return openMeteoService.getCurrentWeather(lat, lon);
    }
}

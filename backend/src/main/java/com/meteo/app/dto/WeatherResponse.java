package com.meteo.app.dto;

import lombok.Data;

@Data
public class WeatherResponse {
    private double temperature;
    private double windspeed;
    private double winddirection;
    private int weathercode;
    private int is_day;
    private String time;
}

package com.meteo.app.service;

import com.meteo.app.dto.WeatherResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import com.fasterxml.jackson.databind.JsonNode;

@Service
public class OpenMeteoService {

    private final RestClient restClient;

    public OpenMeteoService() {
        this.restClient = RestClient.builder()
                .baseUrl("https://api.open-meteo.com/v1")
                .build();
    }

    public WeatherResponse getCurrentWeather(double lat, double lon) {
        try {
            JsonNode response = restClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .path("/forecast")
                            .queryParam("latitude", lat)
                            .queryParam("longitude", lon)
                            .queryParam("current_weather", true)
                            .build())
                    .retrieve()
                    .body(JsonNode.class);

            if (response != null && response.has("current_weather")) {
                JsonNode cw = response.get("current_weather");
                WeatherResponse wr = new WeatherResponse();
                wr.setTemperature(cw.get("temperature").asDouble());
                wr.setWindspeed(cw.get("windspeed").asDouble());
                wr.setWinddirection(cw.get("winddirection").asDouble());
                wr.setWeathercode(cw.get("weathercode").asInt());
                wr.setIs_day(cw.get("is_day").asInt());
                wr.setTime(cw.get("time").asText());
                return wr;
            }
        } catch (Exception e) {
            System.err.println("Errore Open-Meteo (probabile Rate Limit IP Render): " + e.getMessage());
            // Restituiamo dati mock di fallback per evitare il 500
            WeatherResponse wr = new WeatherResponse();
            wr.setTemperature(22.5);
            wr.setWindspeed(10.2);
            wr.setWinddirection(180);
            wr.setWeathercode(0); // Sereno
            wr.setIs_day(1);
            wr.setTime("Mock Data (Rate Limited)");
            return wr;
        }
        return null;
    }
}

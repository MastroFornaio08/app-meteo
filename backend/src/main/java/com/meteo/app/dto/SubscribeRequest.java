package com.meteo.app.dto;

import lombok.Data;

@Data
public class SubscribeRequest {
    private String endpoint;
    private Keys keys;
    private Double lat;
    private Double lon;
    private String alarmTime;

    @Data
    public static class Keys {
        private String p256dh;
        private String auth;
    }
}

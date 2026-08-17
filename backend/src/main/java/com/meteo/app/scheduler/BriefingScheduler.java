package com.meteo.app.scheduler;

import com.meteo.app.dto.WeatherResponse;
import com.meteo.app.model.PushSubscription;
import com.meteo.app.repository.PushSubscriptionRepository;
import com.meteo.app.service.OpenMeteoService;
import com.meteo.app.service.PushNotificationService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Component
public class BriefingScheduler {

    private final PushSubscriptionRepository repository;
    private final OpenMeteoService weatherService;
    private final PushNotificationService pushService;

    public BriefingScheduler(PushSubscriptionRepository repository,
                             OpenMeteoService weatherService,
                             PushNotificationService pushService) {
        this.repository = repository;
        this.weatherService = weatherService;
        this.pushService = pushService;
    }

    // Esegue ogni minuto
    @Scheduled(cron = "0 * * * * *")
    public void sendMorningBriefings() {
        String currentTime = LocalTime.now().format(DateTimeFormatter.ofPattern("HH:mm"));
        List<PushSubscription> subs = repository.findByAlarmTime(currentTime);

        for (PushSubscription sub : subs) {
            WeatherResponse weather = weatherService.getCurrentWeather(sub.getLat(), sub.getLon());
            if (weather != null) {
                String title = "🌤️ Il tuo Morning Briefing!";
                String body = String.format("Temperatura attuale: %.1f°C. Vento: %.1f km/h.",
                        weather.getTemperature(), weather.getWindspeed());
                
                // Formato JSON semplice per il web worker
                String payload = String.format("{\"title\":\"%s\",\"body\":\"%s\"}", title, body);
                
                pushService.sendPushNotification(sub.getEndpoint(), sub.getP256dh(), sub.getAuth(), payload);
            }
        }
    }
}

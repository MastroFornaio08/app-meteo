package com.meteo.app.controller;

import com.meteo.app.dto.SubscribeRequest;
import com.meteo.app.model.PushSubscription;
import com.meteo.app.repository.PushSubscriptionRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/push")
@CrossOrigin(origins = "*")
public class SubscriptionController {

    private final PushSubscriptionRepository repository;

    public SubscriptionController(PushSubscriptionRepository repository) {
        this.repository = repository;
    }

    @PostMapping("/subscribe")
    public ResponseEntity<String> subscribe(@RequestBody SubscribeRequest request) {
        if (repository.existsByEndpoint(request.getEndpoint())) {
            return ResponseEntity.ok("Già iscritto");
        }

        PushSubscription sub = new PushSubscription();
        sub.setEndpoint(request.getEndpoint());
        sub.setP256dh(request.getKeys().getP256dh());
        sub.setAuth(request.getKeys().getAuth());
        sub.setLat(request.getLat());
        sub.setLon(request.getLon());
        sub.setAlarmTime(request.getAlarmTime());
        
        repository.save(sub);
        return ResponseEntity.ok("Iscrizione salvata con successo");
    }
}

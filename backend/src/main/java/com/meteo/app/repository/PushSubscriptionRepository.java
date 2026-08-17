package com.meteo.app.repository;

import com.meteo.app.model.PushSubscription;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface PushSubscriptionRepository extends JpaRepository<PushSubscription, UUID> {
    List<PushSubscription> findByAlarmTime(String alarmTime);
    boolean existsByEndpoint(String endpoint);
}

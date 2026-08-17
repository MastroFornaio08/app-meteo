package com.meteo.app.service;

import nl.martijndwars.webpush.Notification;
import nl.martijndwars.webpush.PushService;
import nl.martijndwars.webpush.Utils;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.Security;
import java.security.spec.ECGenParameterSpec;
import java.security.GeneralSecurityException;
import java.io.IOException;
import org.jose4j.lang.JoseException;
import java.util.Base64;
import java.util.concurrent.ExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class PushNotificationService {

    private static final Logger log = LoggerFactory.getLogger(PushNotificationService.class);

    private PushService pushService;
    private boolean isReady = false;
    private String publicKeyBase64;

    @PostConstruct
    private void init() {
        try {
            Security.addProvider(new BouncyCastleProvider());
            // Genera chiavi EC P-256 (VAPID standard)
            KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("EC", "BC");
            keyPairGenerator.initialize(new ECGenParameterSpec("prime256v1"));
            KeyPair keyPair = keyPairGenerator.generateKeyPair();

            // web-push richiede chiavi in formato raw non-compressed (65 bytes per pubkey, 32 per privkey)
            org.bouncycastle.jce.interfaces.ECPublicKey ecPublicKey =
                (org.bouncycastle.jce.interfaces.ECPublicKey) keyPair.getPublic();
            org.bouncycastle.jce.interfaces.ECPrivateKey ecPrivateKey =
                (org.bouncycastle.jce.interfaces.ECPrivateKey) keyPair.getPrivate();

            byte[] pubKeyBytes = ecPublicKey.getQ().getEncoded(false); // uncompressed = 65 bytes
            byte[] privKeyBytes = ecPrivateKey.getD().toByteArray();

            publicKeyBase64 = Base64.getUrlEncoder().withoutPadding().encodeToString(pubKeyBytes);
            String privateKeyBase64 = Base64.getUrlEncoder().withoutPadding().encodeToString(privKeyBytes);

            pushService = new PushService(publicKeyBase64, privateKeyBase64, "mailto:admin@meteo.local");
            isReady = true;
            log.info("✅ PushNotificationService avviato!");
            log.info("📢 VAPID Public Key: {}", publicKeyBase64);
        } catch (Exception e) {
            log.warn("⚠️  PushNotificationService non disponibile: {}", e.getMessage());
        }
    }

    public String getPublicKey() {
        return publicKeyBase64;
    }

    public void sendPushNotification(String endpoint, String p256dh, String auth, String payload) {
        if (!isReady) {
            log.warn("Push service non pronto, notifica saltata.");
            return;
        }
        try {
            Notification notification = new Notification(endpoint, p256dh, auth, payload.getBytes());
            pushService.send(notification);
            log.info("Notifica push inviata a: {}", endpoint);
        } catch (GeneralSecurityException | IOException | JoseException | ExecutionException | InterruptedException e) {
            log.error("Errore invio push: {}", e.getMessage());
        }
    }
}

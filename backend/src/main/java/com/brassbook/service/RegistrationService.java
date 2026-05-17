package com.brassbook.service;

import com.brassbook.dto.request.CodeRequest;
import com.brassbook.dto.request.PasswordRequest;
import com.brassbook.dto.request.RegistrationRequest;
import com.brassbook.dto.request.VerifyCodeRequest;
import com.brassbook.dto.response.RegistrationResponse;
import com.brassbook.entity.User;
import com.brassbook.enums.UserRole;
import com.brassbook.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class RegistrationService {

    private final UserRepository userRepository;
    private final CustomUserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;
    private final StringRedisTemplate redisTemplate;

    @org.springframework.beans.factory.annotation.Value("${UNISENDER_API_KEY}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public RegistrationResponse createUser(RegistrationRequest userToCreate) {
        if (userRepository.existsByEmail(userToCreate.getEmail())) {
            throw new IllegalArgumentException("Пользователь с таким email же существует");
        }
        if (!isPasswordValid(userToCreate.getPassword())) {
            throw new IllegalArgumentException("Некорректный пароль");
        }
        if (userToCreate.getRoleName() == UserRole.ROLE_ANONYMOUS) {
            throw new IllegalArgumentException("Нельзя создать анонимного пользователя");
        }
        if (userToCreate.getRoleName() == UserRole.ROLE_COMPANY && isInvalidCompanyUser(userToCreate)) {
            throw new IllegalArgumentException("Некорректные данные для корпоративного пользователя");
        }
        User newUser = userDetailsService.createNewUser(userToCreate);
        return new RegistrationResponse(newUser.getId());
    }

    public void sendCode(CodeRequest codeRequest) {
        if (userRepository.existsByEmail(codeRequest.getEmail())) {
            throw new IllegalArgumentException("Пользователь с таким email же существует");
        }
        if (!codeRequest.getIsConfirmed()) {
            throw new IllegalArgumentException("Примите соглашение с политикой ОПД");
        }
        sendMailCode(codeRequest);
    }

    public void refreshCode(CodeRequest codeRequest) {
        if (!userRepository.existsByEmail(codeRequest.getEmail())) {
            throw new IllegalArgumentException("Пользователя с таким email не существует");
        }
        if (!codeRequest.getIsConfirmed()) {
            throw new IllegalArgumentException("Примите соглашение с политикой ОПД");
        }
        sendMailCode(codeRequest);
    }

    public void verifyCode(VerifyCodeRequest verifyCodeRequest) {
        if (!userRepository.existsByEmail(verifyCodeRequest.getEmail())) {
            throw new IllegalArgumentException("Пользователя с таким email не существует");
        }
        String savedCode = redisTemplate.opsForValue().get(verifyCodeRequest.getEmail());
        if (savedCode == null || !savedCode.equals(verifyCodeRequest.getCode())) {
            throw new IllegalArgumentException("Неверный код");
        }
    }

    public void updatePassword(PasswordRequest passwordRequest) {
        User updateUser = userRepository.findByEmail(passwordRequest.getEmail())
                .orElseThrow(() -> new EntityNotFoundException("Пользователя с таким email не существует"));
        if (!isPasswordValid(passwordRequest.getPassword())) {
            throw new IllegalArgumentException("Неверный пароль");
        }
        updateUser.setPassword(passwordEncoder.encode(passwordRequest.getPassword()));
        userRepository.save(updateUser);
    }

    private void sendMailCode(CodeRequest codeRequest) {
        String code = String.format("%06d", new Random().nextInt(999999));

        redisTemplate.opsForValue().set(
                codeRequest.getEmail(),
                code,
                Duration.ofMinutes(3)
        );

        // URL транзакционного API Unisender Go (работает по HTTPS, Render его не заблокирует)
        String url = "https://go2.unisender.ru/ru/transactional/api/v1/email/send.json";

        // Формируем HTTP-заголовки
        org.springframework.http.HttpHeaders headers = new org.springframework.http.HttpHeaders();
        headers.setContentType(org.springframework.http.MediaType.APPLICATION_JSON);
        headers.set("X-API-KEY", apiKey);

        // Главный контейнер запроса
        java.util.Map<String, Object> requestBody = new java.util.HashMap<>();

        // Вложенный объект message
        java.util.Map<String, Object> messageJson = new java.util.HashMap<>();

        // ВНИМАНИЕ: Спецификация Unisender требует передавать sender_email прямо внутри message
        messageJson.put("sender_email", "no-reply@bbbrassbook.work.gd");
        messageJson.put("sender_name", "BrassBook Support");
        messageJson.put("subject", "Код подтверждения регистрации в BrassBook");

        // Формируем тело письма
        java.util.Map<String, Object> bodyJson = new java.util.HashMap<>();
        bodyJson.put("html", "<p>Ваш код подтверждения регистрации: <b style='font-size: 16px;'>" + code + "</b></p>");
        messageJson.put("body", bodyJson);

        // Формируем массив получателей
        java.util.Map<String, Object> recipientJson = new java.util.HashMap<>();
        recipientJson.put("email", codeRequest.getEmail());

        // Кладем массив получателей в объект message
        messageJson.put("recipients", java.util.Collections.singletonList(recipientJson));

        // Кладем message в requestBody
        requestBody.put("message", messageJson);

        // Упаковываем в HttpEntity
        org.springframework.http.HttpEntity<java.util.Map<String, Object>> entity =
                new org.springframework.http.HttpEntity<>(requestBody, headers);

        // Отправка запроса
        try {
            org.springframework.http.ResponseEntity<String> response =
                    restTemplate.postForEntity(url, entity, String.class);

            if (response.getStatusCode() == org.springframework.http.HttpStatus.OK) {
                System.out.println("Письмо успешно отправлено через HTTP API Unisender Go!");
            } else {
                System.err.println("Unisender вернул ошибку: " + response.getStatusCode() + ", ответ: " + response.getBody());
                throw new RuntimeException("Ошибка шлюза отправки");
            }
        } catch (Exception e) {
            System.err.println("Критическая ошибка при отправке запроса в Unisender: " + e.getMessage());
            throw new RuntimeException("Не удалось отправить код подтверждения. Попробуйте позже.");
        }
    }

    private boolean isPasswordValid(String password) {
        boolean hasLower = false;
        boolean hasUpper = false;
        boolean hasSymbol = false;

        for (char c : password.toCharArray()) {
            if (Character.isLowerCase(c)) {
                hasLower = true;
            } else if (Character.isUpperCase(c)) {
                hasUpper = true;
            } else if (!Character.isLetterOrDigit(c)) {
                hasSymbol = true;
            }

            if (hasLower && hasUpper && hasSymbol) {
                return true;
            }
        }

        return hasLower && hasUpper && hasSymbol;
    }

    private boolean isInvalidCompanyUser(RegistrationRequest user) {
        if (user.getInn() == null) {
            return true;
        }
        int innLength = user.getInn().toString().length();
        return user.getFirstName() == null || user.getLastName() == null ||
                user.getCompanyName() == null || user.getProfession() == null ||
                innLength != 10 && innLength != 12;
    }
}

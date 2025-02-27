package com.chilllover.chillnet.services.email;

import jakarta.mail.MessagingException;

public interface EmailService {
    void sendEmail(String to, String resetLink) throws MessagingException;
}

package com.chilllover.chillnet.services.auth;

import com.chilllover.chillnet.dtos.AuthDTO;
import com.chilllover.chillnet.dtos.ResetPasswordDTO;
import jakarta.mail.MessagingException;

public interface AuthService {
    String createAccount(AuthDTO authDTO) throws Exception;
    String login(AuthDTO authDTO) throws Exception;
    void sendResetPasswordMail(String email) throws MessagingException;
    void resetPassword(ResetPasswordDTO resetPasswordDTO);
}

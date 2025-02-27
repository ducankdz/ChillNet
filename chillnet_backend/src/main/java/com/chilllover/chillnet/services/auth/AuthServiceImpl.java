package com.chilllover.chillnet.services.auth;

import com.chilllover.chillnet.configurations.JwtUtil;
import com.chilllover.chillnet.dtos.AuthDTO;
import com.chilllover.chillnet.dtos.ResetPasswordDTO;
import com.chilllover.chillnet.entities.User;
import com.chilllover.chillnet.entities.Verification;
import com.chilllover.chillnet.repositories.UserRepository;
import com.chilllover.chillnet.responses.AuthResponse;
import com.chilllover.chillnet.services.CustomUserDetailsServiceImpl;
import com.chilllover.chillnet.services.email.EmailService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final CustomUserDetailsServiceImpl customUserDetailsService;
    private final EmailService emailService;
    @Override
    public String createAccount(AuthDTO authDTO) throws Exception {
        String email = authDTO.getEmail();
        String username = authDTO.getUsername();
        String password = authDTO.getPassword();
        String retypePassword = authDTO.getRetypePassword();
        User user = userRepository.findByEmail(email);
        if(user != null){
            throw new Exception("Email is already used by another user");
        }
        if(userRepository.existsByUsername(username)){
            throw new Exception("Username is already used by another user");
        }
        if(!password.equals(retypePassword)){
            throw new Exception("Password doesn't match");
        }
        User newUser = User.builder()
                .fullName(authDTO.getFullName())
                .email(authDTO.getEmail())
                .username(authDTO.getUsername())
                .birthDate(authDTO.getBirthDate())
                .password(passwordEncoder.encode(authDTO.getPassword()))
                .verification(new Verification())
                .build();
        User savedUser = userRepository.save(newUser);
        Authentication auth = new UsernamePasswordAuthenticationToken(
                email,password
        );
        SecurityContextHolder.getContext().setAuthentication(auth);
        return jwtUtil.generateToken(auth);
    }

    @Override
    public String login(AuthDTO authDTO) throws Exception {
        String email = authDTO.getEmail();
        String password = authDTO.getPassword();
        UserDetails user = customUserDetailsService.loadUserByUsername(email);
        if (user == null){
            throw new BadCredentialsException("Invalid email or password");
        }
        if(!passwordEncoder.matches(password,user.getPassword())){
            throw new BadCredentialsException("Invalid email or password");
        }
        Authentication auth = new UsernamePasswordAuthenticationToken(user,null,user.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(auth);
        return jwtUtil.generateToken(auth);
    }

    @Override
    public void sendResetPasswordMail(String email) throws MessagingException {
        User user = userRepository.findByEmail(email);
        if(user == null){
            throw new RuntimeException("User not found with email: "+email);
        }
        String token = UUID.randomUUID().toString();
        user.setResetToken(token);
        user.setResetTokenExpiry(LocalDateTime.now().plusHours(1));
        userRepository.save(user);

        String resetLink = "http://localhost:5173/reset-password?token=" + token;
        emailService.sendEmail(email,resetLink);
    }

    @Override
    public void resetPassword(ResetPasswordDTO resetPasswordDTO) {
        User user = userRepository.findByResetToken(resetPasswordDTO.getToken())
                .orElseThrow(() -> new RuntimeException("Invalid or expired token."));
        if(!resetPasswordDTO.getPassword().equals(resetPasswordDTO.getConfirmPassword())){
            throw new RuntimeException("Password doesn't match.");
        }
        if(user.getResetTokenExpiry().isBefore(LocalDateTime.now())){
            throw new RuntimeException("Token has expired.");
        }
        user.setPassword(passwordEncoder.encode(resetPasswordDTO.getPassword()));
        user.setResetToken(null);
        user.setResetTokenExpiry(null);
        userRepository.save(user);
    }

}

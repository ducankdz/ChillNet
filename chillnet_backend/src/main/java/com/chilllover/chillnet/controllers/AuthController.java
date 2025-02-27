package com.chilllover.chillnet.controllers;

import com.chilllover.chillnet.configurations.JwtUtil;
import com.chilllover.chillnet.dtos.AuthDTO;
import com.chilllover.chillnet.dtos.ResetPasswordDTO;
import com.chilllover.chillnet.entities.User;
import com.chilllover.chillnet.repositories.UserRepository;
import com.chilllover.chillnet.responses.AuthResponse;
import com.chilllover.chillnet.responses.MessageResponse;
import com.chilllover.chillnet.services.auth.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final RestTemplate restTemplate;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/signup")
    public ResponseEntity<?> createAccount(@RequestBody AuthDTO authDTO) {
        try {
            String jwt = authService.createAccount(authDTO);
            return new ResponseEntity<>(
                    AuthResponse.builder()
                            .jwt(jwt)
                            .message("Create account successfully")
                            .build(),
                    HttpStatus.CREATED
            );
        } catch (Exception e) {
            return new ResponseEntity<>(
                    AuthResponse.builder()
                            .message(e.getMessage())
                            .build(),
                    HttpStatus.OK
            );
        }
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthDTO authDTO){
        try {
            String jwt = authService.login(authDTO);
            return new ResponseEntity<>(
                    AuthResponse.builder()
                            .jwt(jwt)
                            .message("Login successfully")
                            .build(),
                    HttpStatus.CREATED
            );
        } catch (Exception e) {
            return new ResponseEntity<>(
                    AuthResponse.builder()
                            .message(e.getMessage())
                            .build(),
                    HttpStatus.OK
            );
        }
    }
    @PostMapping("/password/forgot")
    public ResponseEntity<?> forgotPassword(@RequestBody AuthDTO authDTO){
        try {
            authService.sendResetPasswordMail(authDTO.getEmail());
            return ResponseEntity.ok(MessageResponse.builder()
                    .message("Reset password link has been sent to your email.")
                    .build());
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping("/password/reset")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordDTO resetPasswordDTO){
        try {
            authService.resetPassword(resetPasswordDTO);
            return ResponseEntity.ok(MessageResponse.builder()
                    .message("Password has been reset successfully.")
                    .build());
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/google")
    public ResponseEntity<?> loginWithGoogle(@RequestBody Map<String, String> request) throws Exception {
        String accessToken = request.get("access_token");
        if (accessToken == null) {
            return ResponseEntity.badRequest().body("Access token is required");
        }

        // Gọi Google API để lấy thông tin người dùng
        String googleUserInfoUrl = "https://www.googleapis.com/oauth2/v3/userinfo";
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<Map> response = restTemplate.exchange(googleUserInfoUrl, HttpMethod.GET, entity, Map.class);
        Map<String, Object> userInfo = response.getBody();

        if (userInfo == null || userInfo.get("email") == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Google token");
        }

        String email = userInfo.get("email").toString();
        String name = userInfo.get("name").toString();
        String picture = userInfo.get("picture").toString();

        // Kiểm tra người dùng trong database
        User user = userRepository.findByEmail(email);
        if (user == null) {
            // Nếu chưa có, tạo tài khoản mới
            user = new User();
            user.setEmail(email);
            user.setUsername(email.split("@")[0]);
            user.setFullName(name);
            user.setImage(picture);
            user.setLoginWithGoogle(true);
            user.setPassword(passwordEncoder.encode("GOOGLE_USER"));
            userRepository.save(user);
        }

        // Tạo Authentication giả lập (Spring Security)
        UserDetails userDetails = new org.springframework.security.core.userdetails.User(
                user.getEmail(), user.getPassword(), Collections.emptyList());
        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

        // Sinh JWT token từ authentication
        String jwtToken = jwtUtil.generateToken(authentication);

        // Trả về token cho frontend
        return ResponseEntity.ok(AuthResponse.builder()
                .jwt(jwtToken)
                .message("Login with google successfully.")
                .build());
    }
}

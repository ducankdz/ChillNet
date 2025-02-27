package com.chilllover.chillnet.configurations;

import javax.crypto.SecretKey;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.Claims;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.Date;

@Component
public class JwtUtil {
    @Value("${jwt.secretKey}")
    private String SECRET_KEY;
    public SecretKey getKey(){
        byte[] bytes = Base64.getDecoder().decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(bytes);
    }
    public String generateToken(Authentication auth) throws Exception {
        try {
            return Jwts.builder()
                    .signWith(getKey())
                    .claim("email",auth.getName())
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + 86400000))
                    .compact();
        }
        catch (Exception e){
            throw new Exception("Cannot create jwt token, error = " + e.getMessage());
        }
    }
    public Claims extractClaims(String jwt){
        if (jwt.startsWith("Bearer ")) {
            jwt = jwt.substring(7);
        }
        return Jwts.parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(jwt)
                .getBody();
    }
    public String getEmailFromToken(String jwt){
        return extractClaims(jwt).get("email").toString();
    }
    public boolean validateToken(String jwt, UserDetails userDetails) {
        try {
            String email = getEmailFromToken(jwt);
            Date expirationDate = extractClaims(jwt).getExpiration();

            return email.equals(userDetails.getUsername())
                    && expirationDate.after(new Date());
        } catch (Exception e) {
            return false;
        }
    }

}

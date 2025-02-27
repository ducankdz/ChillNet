package com.chilllover.chillnet.dtos;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthDTO {
    String email;
    String username;
    String password;
    String retypePassword;
    String fullName;
    LocalDate birthDate;
}

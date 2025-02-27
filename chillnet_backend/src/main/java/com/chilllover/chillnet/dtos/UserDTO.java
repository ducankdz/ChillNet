package com.chilllover.chillnet.dtos;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserDTO {
    String email;
    String username;
    String fullName;
    String password;
    String newPassword;
    String retypePassword;
    String bio;
    String image;
    LocalDate birthDate;
    String location;
}

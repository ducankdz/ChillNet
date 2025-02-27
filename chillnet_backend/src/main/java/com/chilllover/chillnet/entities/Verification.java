package com.chilllover.chillnet.entities;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Verification {
    boolean status = false;
    LocalDateTime createdAt;
    LocalDateTime endsAt;
    String planType;
}

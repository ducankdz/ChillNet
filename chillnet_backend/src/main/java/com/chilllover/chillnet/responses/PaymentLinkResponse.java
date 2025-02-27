package com.chilllover.chillnet.responses;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PaymentLinkResponse {
    String paymentLinkUrl;
    String paymentLinkId;
}

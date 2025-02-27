package com.chilllover.chillnet.controllers;

import com.chilllover.chillnet.entities.User;
import com.chilllover.chillnet.responses.MessageResponse;
import com.chilllover.chillnet.responses.PaymentLinkResponse;
import com.chilllover.chillnet.services.payment.PaypalService;
import com.chilllover.chillnet.services.user.UserService;
import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {
    @Value("${paypal.client.id}")
    private String API_KEY;

    @Value("${paypal.client.secret}")
    private String API_SECRET;

    private final UserService userService;
    private final PaypalService paypalService;

    @PostMapping("/{planType}")
    public ResponseEntity<?> createPaymentLink(
            @PathVariable("planType") String planType,
            @RequestHeader("Authorization") String jwt
    ) {
        User user = userService.findUserByJwt(jwt);
        int amount = planType.equals("Annually") ? 400 : 20;

        try {
            URI cancelUrl = URI.create("http://localhost:5173");
            URI successUrl = URI.create("http://localhost:5173/home?planType=" + planType);

            Payment payment = paypalService.createPayment(
                    (double) amount,
                    "USD",
                    "paypal",
                    "sale",
                    "Payment for " + planType,
                    cancelUrl.toString(),
                    successUrl.toString()
            );

            String paymentId = payment.getId();
            String paymentUrl = payment.getLinks().stream()
                    .filter(link -> "approval_url".equals(link.getRel()))
                    .map(Links::getHref)
                    .findFirst()
                    .orElse(null);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(PaymentLinkResponse.builder()
                            .paymentLinkId(paymentId)
                            .paymentLinkUrl(paymentUrl)
                            .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

//    @GetMapping("/success")
//    public ResponseEntity<?> executePayment(
//            @RequestParam("paymentId") String paymentId,
//            @RequestParam("PayerID") String payerId,
//            @RequestParam("planType") String planType
//    ) {
//        try {
//            Payment payment = paypalService.executePayment(paymentId, payerId);
//            if ("approved".equals(payment.getState())) {
//                // Xử lý logic khi thanh toán thành công, ví dụ: cập nhật plan cho user
//                return ResponseEntity.ok(MessageResponse.builder()
//                        .message("Payment successfully").build());
//            }
//            return ResponseEntity.ok(MessageResponse.builder()
//                    .message("Payment fail").build());
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }
}

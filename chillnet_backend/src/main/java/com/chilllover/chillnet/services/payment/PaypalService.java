package com.chilllover.chillnet.services.payment;

import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.OAuthTokenCredential;
import com.paypal.base.rest.PayPalRESTException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PaypalService {
    private final APIContext apiContext;

    public Payment createPayment(
            Double total,
            String currency,
            String method,
            String intent,
            String description,
            String cancelUrl,
            String successUrl) throws PayPalRESTException {
        Amount amount = new Amount();
        amount.setCurrency(currency);
        total = new BigDecimal(total).setScale(2, RoundingMode.HALF_UP).doubleValue();
        amount.setTotal(String.format("%.2f", total));

        Transaction transaction = new Transaction();
        transaction.setDescription(description);
        transaction.setAmount(amount);

        List<Transaction> transactions = new ArrayList<>();
        transactions.add(transaction);

        Payer payer = new Payer();
        payer.setPaymentMethod(method.toString());

        Payment payment = new Payment();
        payment.setIntent(intent.toString());
        payment.setPayer(payer);
        payment.setTransactions(transactions);
        RedirectUrls redirectUrls = new RedirectUrls();
        redirectUrls.setCancelUrl(cancelUrl);
        redirectUrls.setReturnUrl(successUrl);
        payment.setRedirectUrls(redirectUrls);

        return payment.create(apiContext);
    }

//    public Payment executePayment(String paymentId, String payerId) throws PayPalRESTException {
//        // Lấy thông tin payment trước
//        Payment payment = Payment.get(apiContext, paymentId);
//
//        // Kiểm tra trạng thái
//        if ("created".equals(payment.getState()) || "approved".equals(payment.getState())) {
//            // Chỉ thực hiện nếu payment chưa hoàn tất
//            PaymentExecution paymentExecution = new PaymentExecution();
//            paymentExecution.setPayerId(payerId);
//            return payment.execute(apiContext, paymentExecution);
//        } else if ("completed".equals(payment.getState())) {
//            // Trả về payment đã hoàn tất thay vì lỗi
//            return payment; // Hoặc xử lý theo cách bạn muốn
//        } else {
//            throw new PayPalRESTException("Payment is not in a valid state to execute: " + payment.getState());
//        }
//    }


}

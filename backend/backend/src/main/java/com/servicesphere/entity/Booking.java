package com.servicesphere.entity;
import com.servicesphere.enums.BookingStatus;
import com.servicesphere.enums.PaymentStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "bookings")
@Data
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long customerId;

    private Long vendorId;

    private Long serviceId;

    private LocalDate bookingDate;
    @NotBlank
    private String address;
    @NotNull
    private Double amount;

    private String otp;

    @Enumerated(EnumType.STRING)
    private BookingStatus status;

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

    private Boolean otpVerified = false;


}

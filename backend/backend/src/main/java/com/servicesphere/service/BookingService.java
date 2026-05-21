package com.servicesphere.service;

import com.servicesphere.entity.Booking;
import com.servicesphere.enums.BookingStatus;
import com.servicesphere.enums.PaymentStatus;
import com.servicesphere.repository.BookingRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    public Booking createBooking(Booking booking) {

        booking.setStatus(BookingStatus.PENDING);

        booking.setPaymentStatus(PaymentStatus.PENDING);

        return bookingRepository.save(booking);
    }

    public List<Booking> getCustomerBookings(Long customerId) {

        return bookingRepository.findByCustomerId(customerId);
    }

    public Booking paymentSuccess(Long bookingId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow();

        booking.setPaymentStatus(PaymentStatus.HELD);

        String otp = generateOtp();

        booking.setOtp(otp);

        return bookingRepository.save(booking);
    }

    private String generateOtp() {

        Random random = new Random();

        int otp = 100000 + random.nextInt(900000);

        return String.valueOf(otp);
    }
}

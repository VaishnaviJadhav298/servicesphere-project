package com.servicesphere.service;

import com.servicesphere.entity.Booking;
import com.servicesphere.entity.Vendor;
import com.servicesphere.enums.BookingStatus;
import com.servicesphere.enums.PaymentStatus;
import com.servicesphere.repository.BookingRepository;
import com.servicesphere.repository.VendorRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private VendorRepository vendorRepository;

    // CREATE BOOKING
    public Booking createBooking(Booking booking) {

        booking.setStatus(BookingStatus.PENDING);

        booking.setPaymentStatus(
                PaymentStatus.PENDING
        );

        return bookingRepository.save(booking);
    }

    // GET CUSTOMER BOOKINGS
    public List<Booking> getCustomerBookings(
            Long customerId
    ) {

        return bookingRepository
                .findByCustomerId(customerId);
    }

    // PAYMENT SUCCESS
    public Booking paymentSuccess(
            Long bookingId
    ) {

        Booking booking =
                bookingRepository.findById(bookingId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Booking not found"
                                ));

        booking.setPaymentStatus(
                PaymentStatus.HELD
        );

        String otp = generateOtp();

        booking.setOtp(otp);

        return bookingRepository.save(booking);
    }

    // GENERATE OTP
    private String generateOtp() {

        Random random = new Random();

        int otp =
                100000 + random.nextInt(900000);

        return String.valueOf(otp);
    }

    // GET ALL BOOKINGS
    public List<Booking> getAllBookings() {

        return bookingRepository.findAll();
    }

    // ASSIGN VENDOR
    public Booking assignVendor(
            Long bookingId,
            Long vendorId
    ) {

        Booking booking =
                bookingRepository.findById(bookingId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Booking not found"
                                ));

        Vendor vendor =
                vendorRepository.findById(vendorId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Vendor not found"
                                ));

        // ASSIGN VENDOR
        booking.setVendorId(vendorId);

        // UPDATE STATUS
        booking.setStatus(
                BookingStatus.ASSIGNED
        );

        // GENERATE OTP
        String otp = generateOtp();

        booking.setOtp(otp);

        return bookingRepository.save(booking);
    }

    // GET VENDOR REQUESTS
    public List<Booking> getVendorRequests(
            Long vendorId
    ) {

        return bookingRepository
                .findByVendorId(vendorId);
    }

    // ACCEPT BOOKING
    public Booking acceptBooking(
            Long bookingId
    ) {

        Booking booking =
                bookingRepository.findById(bookingId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Booking not found"
                                ));

        booking.setStatus(
                BookingStatus.ACCEPTED
        );

        return bookingRepository.save(booking);
    }

    // REJECT BOOKING
    public Booking rejectBooking(
            Long bookingId
    ) {

        Booking booking =
                bookingRepository.findById(bookingId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Booking not found"
                                ));

        booking.setStatus(
                BookingStatus.REJECTED
        );

        return bookingRepository.save(booking);
    }

    // CUSTOMER BOOKING COUNT
    public long getBookingCountByCustomerId(
            Long customerId
    ) {

        return bookingRepository
                .countByCustomerId(customerId);
    }
    // COMPLETE BOOKING
    public Booking completeBooking(
            Long bookingId,
            String otp
    ) {

        Booking booking =
                bookingRepository.findById(bookingId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Booking not found"
                                ));

        // OTP CHECK
        if (!booking.getOtp().equals(otp)) {

            throw new RuntimeException(
                    "Invalid OTP"
            );
        }

        // VERIFY OTP
        booking.setOtpVerified(true);

        // COMPLETE STATUS
        booking.setStatus(
                BookingStatus.COMPLETED
        );

        return bookingRepository.save(booking);
    }
}
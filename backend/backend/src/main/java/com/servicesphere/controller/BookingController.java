package com.servicesphere.controller;
import com.servicesphere.entity.Booking;
import com.servicesphere.service.BookingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {
    @Autowired
    private BookingService bookingService;

    @PostMapping
    public ResponseEntity<Booking> createBooking(
            @RequestBody Booking booking) {

        return ResponseEntity.ok(
                bookingService.createBooking(booking));
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<Booking>> getBookings(
            @PathVariable Long customerId) {

        return ResponseEntity.ok(
                bookingService.getCustomerBookings(customerId));
    }

    @PutMapping("/{bookingId}/payment-success")
    public ResponseEntity<Booking> paymentSuccess(
            @PathVariable Long bookingId) {

        return ResponseEntity.ok(
                bookingService.paymentSuccess(bookingId));
    }
}

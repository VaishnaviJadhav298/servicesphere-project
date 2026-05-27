package com.servicesphere.controller;

import com.servicesphere.entity.Booking;
import com.servicesphere.entity.User;
import com.servicesphere.repository.UserRepository;
import com.servicesphere.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    @Autowired
    private BookingService bookingService;
    @Autowired
    private UserRepository userRepository;

    // ✅ 1. GET ALL BOOKINGS
    @GetMapping("/bookings")
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    // ✅ 2. ASSIGN VENDOR TO BOOKING
    @PutMapping("/assign-vendor/{bookingId}/{vendorId}")
    public ResponseEntity<?> assignVendor(
            @PathVariable Long bookingId,
            @PathVariable Long vendorId
    ) {
        try {
            Booking booking = bookingService.assignVendor(bookingId, vendorId);
            return ResponseEntity.ok(booking);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/customers")
    public List<User> getAllCustomers() {
        return userRepository.findAll();
    }
}

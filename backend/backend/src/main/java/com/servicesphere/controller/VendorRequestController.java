package com.servicesphere.controller;

import com.servicesphere.entity.Booking;
import com.servicesphere.enums.BookingStatus;
import com.servicesphere.repository.BookingRepository;
import com.servicesphere.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vendor")
@CrossOrigin(origins = "http://localhost:3000")
public class VendorRequestController {

    @Autowired
    private BookingService bookingService;

    // 🔥 GET REQUESTS FOR VENDOR
    @GetMapping("/requests/{vendorId}")
    public List<Booking> getVendorRequests(@PathVariable Long vendorId) {
        return bookingService.getVendorRequests(vendorId);
    }
    @PutMapping("/accept/{bookingId}")
    public Booking accept(@PathVariable Long bookingId) {
        return bookingService.acceptBooking(bookingId);
    }

    @PutMapping("/reject/{bookingId}")
    public Booking reject(@PathVariable Long bookingId) {
        return bookingService.rejectBooking(bookingId);
    }
}
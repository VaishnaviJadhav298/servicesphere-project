package com.servicesphere.controller;

import com.servicesphere.entity.Booking;
import com.servicesphere.entity.User;
import com.servicesphere.entity.Vendor;

import com.servicesphere.repository.UserRepository;

import com.servicesphere.service.BookingService;
import com.servicesphere.service.VendorService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import com.servicesphere.dto.CustomerResponseDTO;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin("*")

public class AdminController {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VendorService vendorService;

    // GET BOOKINGS
    @GetMapping("/bookings")
    public List<Booking> getAllBookings() {

        return bookingService.getAllBookings();
    }

    // ASSIGN VENDOR
    @PutMapping("/assign-vendor/{bookingId}/{vendorId}")
    public ResponseEntity<?> assignVendor(
            @PathVariable Long bookingId,
            @PathVariable Long vendorId
    ) {

        try {

            Booking booking =
                    bookingService.assignVendor(
                            bookingId,
                            vendorId
                    );

            return ResponseEntity.ok(booking);

        } catch (Exception e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    // GET CUSTOMERS
    @GetMapping("/customers")
    public List<CustomerResponseDTO> getAllCustomers() {

        List<User> users = userRepository.findAll();

        List<CustomerResponseDTO> response =
                new ArrayList<>();

        for (User user : users) {

            CustomerResponseDTO dto =
                    new CustomerResponseDTO();

            dto.setId(user.getId());

            dto.setFullName(user.getFullName());

            dto.setEmail(user.getEmail());

            dto.setMobileNumber(
                    user.getMobileNumber()
            );

            long bookingCount =
                    bookingService
                            .getBookingCountByCustomerId(
                                    user.getId()
                            );

            dto.setBookingCount((int) bookingCount);

            if (bookingCount >= 3) {

                dto.setActivityStatus(
                        "Highly Active"
                );

            } else if (bookingCount == 0) {

                dto.setActivityStatus(
                        "Inactive"
                );

            } else {

                dto.setActivityStatus(
                        "Normal"
                );
            }

            response.add(dto);
        }

        return response;
    }

    // APPROVE VENDOR
    @PutMapping("/approve-vendor/{id}")
    public Vendor approveVendor(
            @PathVariable Long id
    ) {

        return vendorService.approveVendor(id);
    }

    // REJECT VENDOR
    @PutMapping("/reject-vendor/{id}")
    public Vendor rejectVendor(
            @PathVariable Long id
    ) {

        return vendorService.rejectVendor(id);
    }

    // BLOCK VENDOR
    @PutMapping("/block-vendor/{id}")
    public Vendor blockVendor(
            @PathVariable Long id
    ) {

        return vendorService.blockVendor(id);
    }
}
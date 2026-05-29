package com.servicesphere.controller;

import com.servicesphere.dto.VendorResponseDTO;
import com.servicesphere.entity.Booking;
import com.servicesphere.entity.Vendor;
import com.servicesphere.service.BookingService;
import com.servicesphere.service.VendorService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import java.util.List;

@RestController
@RequestMapping("/auth/vendor")
@CrossOrigin(origins = "http://localhost:3000")
public class VendorController {

    @Autowired
    private VendorService vendorService;

    @Autowired
    private BookingService bookingService;

    // REGISTER
    @PostMapping("/register")
    public Vendor registerVendor(
            @Valid @RequestBody Vendor vendor
    ) {

        return vendorService.registerVendor(vendor);
    }

    // LOGIN
    @PostMapping("/login")
    public String loginVendor(
            @RequestBody Vendor vendor
    ) {

        return vendorService.loginVendor(
                vendor.getEmail(),
                vendor.getPassword()
        );
    }

    // GET VENDORS BY SERVICE
    @GetMapping("/service/{serviceName}")
    public List<Vendor> getVendorsByService(
            @PathVariable String serviceName
    ) {

        return vendorService.getVendorsByService(serviceName);
    }

    // UPDATE VENDOR
    @PutMapping("/update/{id}")
    public Vendor updateVendor(
            @PathVariable Long id,
            @RequestBody Vendor vendor
    ) {

        return vendorService.updateVendor(
                id,
                vendor
        );
    }

    // DELETE VENDOR
    @DeleteMapping("/delete/{id}")
    public String deleteVendor(
            @PathVariable Long id
    ) {

        return vendorService.deleteVendor(id);
    }

    // GET VENDOR BY ID
    @GetMapping("/{id}")
    public Vendor getVendorById(
            @PathVariable Long id
    ) {

        return vendorService.getVendorById(id);
    }

    // GET VENDOR BY EMAIL
    @GetMapping("/email/{email}")
    public Vendor getVendorByEmail(
            @PathVariable String email
    ) {

        return vendorService.getVendorByEmail(email);
    }

    // GET ALL VENDORS
    @GetMapping("/all")
    public List<VendorResponseDTO> getAllVendors() {

        return vendorService.getAllVendors();
    }

    // UPLOAD PROFILE IMAGE
    @PostMapping("/upload-image/{id}")
    public Vendor uploadImage(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file
    ) throws Exception {

        Vendor vendor =
                vendorService.getVendorById(id);

        // FILE NAME
        String fileName =
                System.currentTimeMillis()
                        + "_"
                        + file.getOriginalFilename();

        // UPLOAD FOLDER
        Path uploadPath =
                Paths.get("uploads");

        // CREATE FOLDER
        if (!Files.exists(uploadPath)) {

            Files.createDirectories(uploadPath);
        }

        // SAVE FILE
        Path filePath =
                uploadPath.resolve(fileName);

        Files.copy(
                file.getInputStream(),
                filePath
        );

        // SAVE IMAGE NAME
        vendor.setProfileImage(fileName);

        return vendorService.saveVendor(vendor);
    }

    // GET REQUESTS OF SPECIFIC VENDOR
    @GetMapping("/requests/{vendorId}")
    public List<Booking> getVendorRequests(
            @PathVariable Long vendorId
    ) {

        return bookingService.getVendorRequests(vendorId);
    }
    // COMPLETE BOOKING WITH OTP
    @PutMapping("/complete/{bookingId}")
    public Booking completeBooking(
            @PathVariable Long bookingId,
            @RequestParam String otp
    ) {

        return bookingService.completeBooking(
                bookingId,
                otp
        );
    }
}
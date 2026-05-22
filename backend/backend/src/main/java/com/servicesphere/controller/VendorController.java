package com.servicesphere.controller;

import org.springframework.web.multipart.MultipartFile;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import com.servicesphere.entity.Vendor;
import com.servicesphere.service.VendorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.servicesphere.dto.VendorResponseDTO;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.List;


@RestController
@RequestMapping("/auth/vendor")
@CrossOrigin(origins = "http://localhost:3000")
public class VendorController {

    @Autowired
    private VendorService vendorService;

    // Register Vendor
    @PostMapping("/register")
    public Vendor registerVendor(@Valid @RequestBody Vendor vendor) {

        return vendorService.registerVendor(vendor);
    }

    @PostMapping("/login")
    public String loginVendor(@RequestBody Vendor vendor) {
        return vendorService.loginVendor(vendor.getEmail(), vendor.getPassword());
    }

//    @GetMapping("/service/{serviceId}")
//    public List<Vendor> getVendorsByService(@PathVariable Long serviceId) {
//
//        return vendorService.getVendorsByService(serviceId);
//    }

    @GetMapping("/service/{serviceName}")
    public List<Vendor> getVendorsByService(@PathVariable String serviceName) {

        return vendorService.getVendorsByService(serviceName);
    }

    @PutMapping("/update/{id}")
    public Vendor updateVendor(@PathVariable Long id,
                               @RequestBody Vendor vendor) {

        return vendorService.updateVendor(id, vendor);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteVendor(@PathVariable Long id) {

        return vendorService.deleteVendor(id);
    }
    @GetMapping("/{id}")
    public Vendor getVendorById(@PathVariable Long id) {

        return vendorService.getVendorById(id);
    }
    @GetMapping("/email/{email}")
    public Vendor getVendorByEmail(@PathVariable String email) {
        return vendorService.getVendorByEmail(email);
    }
    @GetMapping("/all")
    public List<VendorResponseDTO> getAllVendors() {
        return vendorService.getAllVendors();
    }

    @PostMapping("/upload-image/{id}")
    public Vendor uploadImage(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file
    ) throws Exception {

        Vendor vendor = vendorService.getVendorById(id);

        // File Name
        String fileName = System.currentTimeMillis()
                + "_" + file.getOriginalFilename();

        // Folder Path
        Path uploadPath = Paths.get("uploads");

        // Create Folder if not exists
        if (!Files.exists(uploadPath)) {

            Files.createDirectories(uploadPath);

        }

        // Save File
        Path filePath = uploadPath.resolve(fileName);

        Files.copy(file.getInputStream(), filePath);

        // Save Image Path in DB
        vendor.setProfileImage(fileName);

        return vendorService.saveVendor(vendor);
    }
}
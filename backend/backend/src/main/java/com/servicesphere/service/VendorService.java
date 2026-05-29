package com.servicesphere.service;

import com.servicesphere.dto.VendorResponseDTO;
import com.servicesphere.entity.Vendor;
import com.servicesphere.repository.VendorRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class VendorService {

    @Autowired
    private VendorRepository vendorRepository;

    // REGISTER
    public Vendor registerVendor(Vendor vendor) {

        if (vendorRepository.findByEmail(vendor.getEmail()).isPresent()) {

            throw new RuntimeException("Email already exists");
        }

        // DEFAULT STATUS
        vendor.setStatus("PENDING");

        return vendorRepository.save(vendor);
    }

    // LOGIN
    public String loginVendor(
            String email,
            String password
    ) {

        Vendor vendor = vendorRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Vendor not found"));

        // PASSWORD CHECK
        if (!vendor.getPassword().equals(password)) {

            return "Invalid Password";
        }

        // PENDING
        if ("PENDING".equals(vendor.getStatus())) {

            return "Your account is pending admin approval";
        }

        // REJECTED
        if ("REJECTED".equals(vendor.getStatus())) {

            return "Your account has been rejected";
        }

        // BLOCKED
        if ("BLOCKED".equals(vendor.getStatus())) {

            return "Your account has been blocked by admin";
        }

        return "Login Successful";
    }

    // GET BY SERVICE
    public List<Vendor> getVendorsByService(
            String serviceName
    ) {

        return vendorRepository.findByServiceName(serviceName);
    }

    // UPDATE
    public Vendor updateVendor(
            Long id,
            Vendor updatedVendor
    ) {

        Vendor vendor = vendorRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Vendor not found"));

        vendor.setName(updatedVendor.getName());
        vendor.setEmail(updatedVendor.getEmail());
        vendor.setPhone(updatedVendor.getPhone());
        vendor.setAddress(updatedVendor.getAddress());
        vendor.setAvailableTime(updatedVendor.getAvailableTime());
        vendor.setExperience(updatedVendor.getExperience());
        vendor.setServiceName(updatedVendor.getServiceName());

        return vendorRepository.save(vendor);
    }

    // DELETE
    public String deleteVendor(Long id) {

        vendorRepository.deleteById(id);

        return "Vendor deleted successfully";
    }

    // GET BY ID
    public Vendor getVendorById(Long id) {

        return vendorRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Vendor not found"));
    }

    // GET BY EMAIL
    public Vendor getVendorByEmail(String email) {

        return vendorRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Vendor not found"));
    }

    // SAVE
    public Vendor saveVendor(Vendor vendor) {

        return vendorRepository.save(vendor);
    }

    // APPROVE
    public Vendor approveVendor(Long id) {

        Vendor vendor = vendorRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Vendor not found"));

        vendor.setStatus("APPROVED");

        return vendorRepository.save(vendor);
    }

    // REJECT
    public Vendor rejectVendor(Long id) {

        Vendor vendor = vendorRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Vendor not found"));

        vendor.setStatus("REJECTED");

        return vendorRepository.save(vendor);
    }

    // BLOCK
    public Vendor blockVendor(Long id) {

        Vendor vendor = vendorRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Vendor not found"));

        vendor.setStatus("BLOCKED");

        return vendorRepository.save(vendor);
    }

    // GET ALL
    public List<VendorResponseDTO> getAllVendors() {

        return vendorRepository.findAll().stream().map(vendor -> {

            VendorResponseDTO dto =
                    new VendorResponseDTO();

            dto.setId(vendor.getId());
            dto.setName(vendor.getName());
            dto.setEmail(vendor.getEmail());
            dto.setPhone(vendor.getPhone());
            dto.setAddress(vendor.getAddress());
            dto.setAvailableTime(vendor.getAvailableTime());
            dto.setServiceName(vendor.getServiceName());
            dto.setStatus(vendor.getStatus());

            return dto;

        }).collect(Collectors.toList());
    }
}
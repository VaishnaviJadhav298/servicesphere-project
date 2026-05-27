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

    // REGISTER VENDOR
    public Vendor registerVendor(Vendor vendor) {

        if (vendorRepository.findByEmail(vendor.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        vendor.setVerified(true);

        return vendorRepository.save(vendor);
    }

    // LOGIN VENDOR
    public String loginVendor(String email, String password) {

        Vendor vendor = vendorRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Vendor not found"));

        if (!vendor.getPassword().equals(password)) {
            return "Invalid Password";
        }

        return "Login Successful";
    }

    // GET BY SERVICE NAME
    public List<Vendor> getVendorsByService(String serviceName) {

        return vendorRepository.findByServiceName(serviceName);
    }

    // UPDATE VENDOR
    public Vendor updateVendor(Long id, Vendor updatedVendor) {

        Vendor vendor = vendorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vendor not found"));

        vendor.setName(updatedVendor.getName());
        vendor.setEmail(updatedVendor.getEmail());
        vendor.setPhone(updatedVendor.getPhone());
        vendor.setAddress(updatedVendor.getAddress());
        vendor.setAvailableTime(updatedVendor.getAvailableTime());
        vendor.setExperience(updatedVendor.getExperience());
        vendor.setServiceName(updatedVendor.getServiceName());

        return vendorRepository.save(vendor);
    }

    // DELETE VENDOR
    public String deleteVendor(Long id) {

        vendorRepository.deleteById(id);
        return "Vendor deleted successfully";
    }

    // GET BY ID
    public Vendor getVendorById(Long id) {

        return vendorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vendor not found"));
    }
    public Vendor getVendorByEmail(String email) {
        return vendorRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Vendor not found"));
    }
    public Vendor saveVendor(Vendor vendor) {

        return vendorRepository.save(vendor);

    }

    // GET ALL (DTO)
    public List<VendorResponseDTO> getAllVendors() {

        return vendorRepository.findAll().stream().map(vendor -> {

            VendorResponseDTO dto = new VendorResponseDTO();

            dto.setId(vendor.getId());
            dto.setName(vendor.getName());
            dto.setEmail(vendor.getEmail());
            dto.setPhone(vendor.getPhone());
            dto.setAddress(vendor.getAddress());
            dto.setAvailableTime(vendor.getAvailableTime());
            dto.setServiceName(vendor.getServiceName());


            return dto;

        }).collect(Collectors.toList());
    }
}
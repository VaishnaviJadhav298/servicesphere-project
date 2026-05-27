package com.servicesphere.controller;

import com.servicesphere.entity.ServiceEntity;
import com.servicesphere.service.ServiceService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@CrossOrigin("*")
public class ServiceController {

    @Autowired
    private ServiceService serviceService;

    // CREATE SERVICE
    @PostMapping
    public ServiceEntity createService(
            @RequestBody ServiceEntity service
    ) {

        return serviceService.createService(service);
    }

    // GET ALL SERVICES
    @GetMapping
    public List<ServiceEntity> getAllServices() {

        return serviceService.getAllServices();
    }

    // DELETE SERVICE
    @DeleteMapping("/{id}")
    public void deleteService(
            @PathVariable Long id
    ) {

        serviceService.deleteService(id);
    }

    // UPDATE SERVICE
    @PutMapping("/{id}")
    public ServiceEntity updateService(
            @PathVariable Long id,
            @RequestBody ServiceEntity service
    ) {

        return serviceService.updateService(
                id,
                service
        );
    }
    @PostMapping("/assign")
    public ServiceEntity assignServiceToVendor(
            @RequestParam Long serviceId,
            @RequestParam Long vendorId
    ) {
        return serviceService.assignToVendor(serviceId, vendorId);
    }
}
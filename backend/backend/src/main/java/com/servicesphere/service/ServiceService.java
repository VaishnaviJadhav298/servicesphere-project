package com.servicesphere.service;

import com.servicesphere.entity.ServiceEntity;
import com.servicesphere.repository.ServiceRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceService {

    @Autowired
    private ServiceRepository serviceRepository;

    // CREATE
    public ServiceEntity createService(
            ServiceEntity service) {

        return serviceRepository.save(service);
    }

    // GET ALL
    public List<ServiceEntity> getAllServices() {

        return serviceRepository.findAll();
    }

    // DELETE
    public void deleteService(Long id) {

        serviceRepository.deleteById(id);
    }

    // UPDATE
    public ServiceEntity updateService(
            Long id,
            ServiceEntity updatedService
    ) {

        ServiceEntity service =
                serviceRepository.findById(id)
                        .orElseThrow();

        service.setName(
                updatedService.getName());

        service.setDescription(
                updatedService.getDescription());

        service.setPrice(
                updatedService.getPrice());

        return serviceRepository.save(service);
    }
}
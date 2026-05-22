package com.servicesphere.repository;

import com.servicesphere.entity.Vendor;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VendorRepository extends JpaRepository<Vendor, Long> {

    Optional<Vendor> findByEmail(String email);
    List<Vendor> findByServiceName(String serviceName);
}
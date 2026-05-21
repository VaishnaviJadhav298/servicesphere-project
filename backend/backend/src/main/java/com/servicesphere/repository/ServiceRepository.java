package com.servicesphere.repository;
import com.servicesphere.entity.ServiceEntity;

import org.springframework.data.jpa.repository.JpaRepository;
public interface ServiceRepository
        extends JpaRepository<ServiceEntity, Long> {
}
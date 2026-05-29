package com.servicesphere.dto;

import lombok.Data;

@Data
public class VendorResponseDTO {

    private Long id;
    private String name;
    private String email;
    private String phone;
    private String address;
    private String availableTime;
    private String serviceName;
    private String experience;
    private String status;
}
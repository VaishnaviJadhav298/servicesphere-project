package com.servicesphere.dto;

import lombok.Data;

@Data
public class CustomerResponseDTO {

    private Long id;

    private String fullName;

    private String email;

    private String mobileNumber;

    private Integer bookingCount;

    private String activityStatus;
}
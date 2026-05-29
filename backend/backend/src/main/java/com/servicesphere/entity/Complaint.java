package com.servicesphere.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "complaints")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long customerId;

    private Long bookingId;

    private String subject;

    @Column(length = 2000)
    private String message;

    private String status;
}
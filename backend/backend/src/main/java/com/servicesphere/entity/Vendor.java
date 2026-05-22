package com.servicesphere.entity;

import jakarta.persistence.*;
import lombok.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;


@Entity
@Table(name = "vendors")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Vendor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    private String name;

    @Column(unique = true)
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email")
    private String email;

    @NotBlank(message = "Phone is required")
    private String phone;

    private String address;

    @NotBlank(message = "Password is required")
    private String password;

    private boolean verified;

    private String availableTime;

    private String serviceName;

    private String experience;

    private String profileImage;

}

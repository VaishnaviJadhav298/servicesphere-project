package com.servicesphere.controller;

import com.servicesphere.entity.Complaint;
import com.servicesphere.service.ComplaintService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/complaints")
@CrossOrigin("*")

public class ComplaintController {

    @Autowired
    private ComplaintService complaintService;

    // CREATE
    @PostMapping
    public Complaint createComplaint(
            @RequestBody Complaint complaint
    ) {

        return complaintService
                .createComplaint(complaint);
    }

    // GET ALL
    @GetMapping
    public List<Complaint> getAllComplaints() {

        return complaintService
                .getAllComplaints();
    }

    // GET CUSTOMER COMPLAINTS
    @GetMapping("/customer/{customerId}")
    public List<Complaint> getCustomerComplaints(
            @PathVariable Long customerId
    ) {

        return complaintService
                .getCustomerComplaints(customerId);
    }

    // RESOLVE
    @PutMapping("/resolve/{id}")
    public Complaint resolveComplaint(
            @PathVariable Long id
    ) {

        return complaintService
                .resolveComplaint(id);
    }
}
package com.servicesphere.service;

import com.servicesphere.entity.Complaint;
import com.servicesphere.repository.ComplaintRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepository;

    // CREATE
    public Complaint createComplaint(
            Complaint complaint
    ) {

        complaint.setStatus("PENDING");

        return complaintRepository.save(
                complaint
        );
    }

    // GET ALL
    public List<Complaint> getAllComplaints() {

        return complaintRepository.findAll();
    }

    // GET CUSTOMER COMPLAINTS
    public List<Complaint> getCustomerComplaints(
            Long customerId
    ) {

        return complaintRepository.findByCustomerId(
                customerId
        );
    }

    // RESOLVE
    public Complaint resolveComplaint(
            Long id
    ) {

        Complaint complaint =
                complaintRepository.findById(id)
                        .orElseThrow();

        complaint.setStatus("RESOLVED");

        return complaintRepository.save(
                complaint
        );
    }
}
package com.servicesphere.service;

import com.servicesphere.dto.LoginRequestDto;
import com.servicesphere.dto.RegisterRequestDto;
import com.servicesphere.entity.User;
import com.servicesphere.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    // REGISTER USER
    public User register(RegisterRequestDto request) {

        User user = new User();

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setMobileNumber(request.getMobileNumber());
        user.setAddress(request.getAddress());

        return userRepository.save(user);
    }

    // LOGIN USER
    public User login(LoginRequestDto request) {

        User user = userRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        if (!user.getPassword()
                .equals(request.getPassword())) {

            throw new RuntimeException("Invalid password");
        }

        return user;
    }
    public User getUserByEmail(String email) {

        return userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }
    public User updateUser(
            Long id,
            User updatedUser
    ) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        user.setFullName(updatedUser.getFullName());

        user.setEmail(updatedUser.getEmail());

        user.setMobileNumber(updatedUser.getMobileNumber());

        user.setAddress(updatedUser.getAddress());

        return userRepository.save(user);

    }
}
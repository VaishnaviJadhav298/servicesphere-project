package com.servicesphere.controller;

import com.servicesphere.dto.LoginRequestDto;
import com.servicesphere.dto.RegisterRequestDto;
import com.servicesphere.entity.User;
import com.servicesphere.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private AuthService authService;

    // SIGNUP
    @PostMapping("/signup")
    public User signup(
            @RequestBody RegisterRequestDto request
    ) {

        return authService.register(request);
    }

    // SIGNIN
    @PostMapping("/signin")
    public User signin(
            @RequestBody LoginRequestDto request
    ) {

        return authService.login(request);
    }
    @GetMapping("/user/{email}")
    public User getUserByEmail(
            @PathVariable String email
    ) {

        return authService.getUserByEmail(email);
    }
    @PutMapping("/update/{id}")
    public User updateUser(
            @PathVariable Long id,
            @RequestBody User updatedUser
    ) {

        return authService.updateUser(id, updatedUser);

    }
}
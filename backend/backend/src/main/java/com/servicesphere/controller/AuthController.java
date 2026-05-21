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
}
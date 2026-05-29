package com.servicesphere.controller;

import com.servicesphere.dto.LoginRequestDto;
import com.servicesphere.dto.RegisterRequestDto;
import com.servicesphere.entity.User;
import com.servicesphere.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private AuthService authService;

    // SIGNUP (CUSTOMER)
    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody RegisterRequestDto request) {
        User user = authService.register(request);
        return ResponseEntity.ok(user);
    }

    // SIGNIN (CUSTOMER FIXED)
    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody LoginRequestDto request) {
        try {
            User user = authService.login(request);
            return ResponseEntity.ok(user);
        } catch (RuntimeException ex) {
            return ResponseEntity
                    .badRequest()
                    .body(ex.getMessage());
        }
    }

    @GetMapping("/user/{id}")
    public User getUserById(@PathVariable Long id) {
        return authService.getUserById(id);
    }

    @PutMapping("/update/{id}")
    public User updateUser(
            @PathVariable Long id,
            @RequestBody User updatedUser
    ) {
        return authService.updateUser(id, updatedUser);
    }
}
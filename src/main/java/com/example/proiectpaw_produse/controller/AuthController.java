package edu.example.demospring.controller;

import edu.example.demospring.security.UserImpl;
import edu.example.demospring.security.jwt.JwtResponse;
import edu.example.demospring.security.jwt.utils.Utils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

/**
 * @author : colacristian on 11/13/22
 **/
@Controller
public class AuthController {

    private AuthenticationManager authenticationManager;


    private Utils jwtUtils;

    public AuthController(AuthenticationManager authenticationManager, Utils jwtUtils) {
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }


    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody UserImpl userDTO) {
        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userDTO.getUsername(), userDTO.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authenticate);
        String jwt = jwtUtils.generateJwtToken(authenticate);
        return new ResponseEntity<>(new JwtResponse(jwt, userDTO.getUsername()), HttpStatus.OK);
    }


}

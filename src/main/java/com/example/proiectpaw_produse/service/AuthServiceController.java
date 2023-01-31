package com.example.proiectpaw_produse.service;

import com.example.proiectpaw_produse.modelDTO.UserDTO;
import com.example.proiectpaw_produse.modelView.Login;
import com.example.proiectpaw_produse.modelView.Register;
import com.example.proiectpaw_produse.repository.UserRepository;
import com.example.proiectpaw_produse.security.CustomUserDetails;
import com.example.proiectpaw_produse.security.jwt.JwtTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping(path = "/Auth")
public class AuthServiceController {

    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    public AuthServiceController(UserRepository userRepository) {
    this.userRepository = userRepository;
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public String Login(@RequestBody Login login){

        var user = userRepository.findByUsername(login.getUsername());
        if(!user.isPresent())
            return "this user doesn't exist";
//        if(login.getPassword().equals(user.get().getPassword()))
//            return user;
        if(passwordEncoder.matches(login.getPassword(), user.get().getPassword())){
            JwtTokenService token = new JwtTokenService();

            CustomUserDetails customUserDetails = new CustomUserDetails(user.get());
            var generatedToken = token.generateToken(customUserDetails);

            return generatedToken;
        }
        return "this user doesn't exist";
    }


    @RequestMapping( value = "/register", method = RequestMethod.POST)
    public String Register(@RequestBody  Register register){
        UserDTO userDTO = new UserDTO();
        userDTO.setName(register.name);
        userDTO.setUsername(register.username);
        userDTO.setPassword(passwordEncoder.encode(register.password));
        userRepository.save(userDTO);

        return "User created";
    }
}

package com.example.proiectpaw_produse.security;

import com.example.proiectpaw_produse.modelDTO.UserDTO;
import com.example.proiectpaw_produse.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    public CustomUserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserDTO> user = userRepository.findByUsername(username);
        if(user.get() == null)
            throw new UsernameNotFoundException("User not found");
        var userDetails = new CustomUserDetails(user.get());
        return userDetails;

    }
}

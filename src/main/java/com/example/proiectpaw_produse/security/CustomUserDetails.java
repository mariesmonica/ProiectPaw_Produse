package com.example.proiectpaw_produse.security;

import com.example.proiectpaw_produse.modelDTO.UserDTO;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

public class CustomUserDetails  implements UserDetails {

    public long id;
    private String name;
    private String username;
    private String password;


    public CustomUserDetails(UserDTO user) {
        id=user.getId();
        name=user.getName();
        username=user.getUsername();
        password=user.getPassword();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities(){
        Set<GrantedAuthority> authorities = new HashSet<>();
        return authorities;
    }

    public long getId() { return id; }

    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

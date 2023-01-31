package com.example.proiectpaw_produse.security;

import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


public class CorsFilter implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {

        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000/")//REACT
                .allowedMethods("*")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}

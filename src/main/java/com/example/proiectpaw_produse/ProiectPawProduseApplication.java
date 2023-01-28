package com.example.proiectpaw_produse;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class ProiectPawProduseApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProiectPawProduseApplication.class, args);
    }

    @RequestMapping(value="/")
    public String hello(){
        return "Hello world";
    }
}

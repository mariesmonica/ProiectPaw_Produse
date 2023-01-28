package com.example.proiectpaw_produse.exception;

public class ProductNotFoundException extends RuntimeException{

    public ProductNotFoundException(Long id){
        super("Could not found product with id" + id);
    }
}

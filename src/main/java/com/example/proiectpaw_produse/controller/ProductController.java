package edu.example.demospring.controller;

import edu.example.demospring.exception.ProductNotFoundException;
import edu.example.demospring.persitence.Product;
import edu.example.demospring.repository.ProductRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class ProductController {

    private final ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @RequestMapping(value = "/view-products")
    public String viewProducts(){
        return "view-products";
    }

    @RequestMapping(value = "/add-products")
    public String updateProduct(){return "add-product";}

    @RequestMapping(value = "/delete-products")
    public String deleteProduct(){
        return "delete-product";
    }




}

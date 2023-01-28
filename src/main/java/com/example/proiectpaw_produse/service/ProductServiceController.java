package com.example.proiectpaw_produse.service;

import com.example.proiectpaw_produse.dao.ProductServiceDAO;
import com.example.proiectpaw_produse.kafka.constants.KafkaConstants;
import com.example.proiectpaw_produse.kafka.model.KafkaModel;
import com.example.proiectpaw_produse.modelDTO.ProductDTO;
import com.example.proiectpaw_produse.modelView.Product;
import com.example.proiectpaw_produse.repository.ProductRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("http://localhost:3000")
public class ProductServiceController {
    private static Map<Long, ProductDTO> productsMap = new HashMap<>();

    @Autowired

    private KafkaTemplate<String, KafkaModel> kafkaTemplate;


    final ProductRepository productRepository;

    final ProductServiceDAO productServiceDAO;


    public ProductServiceController(ProductRepository productRepository, ProductServiceDAO productServiceDAO) {
        this.productRepository = productRepository;
        this.productServiceDAO = productServiceDAO;
    }

    @RequestMapping(value = "/products-view")//preia toate produsele
    public ResponseEntity<Object> getProducts() {
        return new ResponseEntity<>(productRepository.findAll().stream().map(o -> new ProductDTO(o.getId(), o.getName(), o.getPrice(), o.getDetails())).collect(Collectors.toList()), HttpStatus.OK);
    }

    @RequestMapping(value = "/product-add", method = RequestMethod.POST)//adauga un produs
    public ResponseEntity<Object> createProduct(@RequestBody ProductDTO productDTO) {
        productsMap.put(productDTO.getId(), productDTO);
        Product product = new Product();
        product.setName(productDTO.getName());
        product.setPrice(productDTO.getPrice());
        product.setDetails(productDTO.getDetails());
        productRepository.save(product);


        return new ResponseEntity<>("Product created", HttpStatus.OK);
    }

    @RequestMapping(value = "/product-view/{id}", method = RequestMethod.GET)//vizualizeaza produsul dupa id
    public ResponseEntity<Object> getProduct(@PathVariable("id") Long id) {
        return new ResponseEntity<>(productRepository.findById(id).map(p ->
                new ProductDTO(p.getId(), p.getName(), p.getPrice(), p.getDetails())).orElseThrow(), HttpStatus.OK);
    }

    @RequestMapping(value = "/product-update/{id}", method = RequestMethod.PUT)//actualizeaza un produs dupa id
    public ResponseEntity<Object> updateProduct(@PathVariable("id") Long id, @RequestBody ProductDTO productDTO) {
        productRepository.findById(id).ifPresent(p -> {
            p.setName(productDTO.getName());
            p.setPrice(productDTO.getPrice());
            p.setDetails(productDTO.getDetails());
            productRepository.save(p);
        });
        productsMap.remove(id);
        productsMap.put(id, productDTO);

        var model = new KafkaModel(id,productDTO.getName());
        kafkaTemplate.send(KafkaConstants.KAFKA_TOPIC, model);

        return new ResponseEntity<>("Product updated", HttpStatus.OK);
    }

    @RequestMapping(value = "/product-delete/{id}", method = RequestMethod.DELETE)//sterge un produs dupa id
    public ResponseEntity<Object> deleteProduct(@PathVariable("id") Long id) {
        ProductDTO remove = productsMap.remove(id);
        productRepository.deleteById(id);
        return new ResponseEntity<>(Optional.ofNullable(remove).map(p -> "Product deleted").orElse("Product not found"), HttpStatus.OK);
    }

//    @GetMapping(value = "/bulk_create")
//    public String bulkCreate() {
//        productRepository.saveAll(Arrays.asList(new Product("Mere","9","rosii"), new Product("Pere","3","galbene")));
//        return "Products created";
//    }

}

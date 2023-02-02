package com.example.proiectpaw_produse.modelView;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name = "product")
public class Product implements Serializable {
    private long id;
    private String name;

    private float price;
    private String details;

    private long id_user;

    public Product(long id, String name, float price, String details, long id_user) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.details = details;
        this.id_user = id_user;
    }

    @Id
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public Product() {
    }

//    @GeneratedValue(strategy = GenerationType.AUTO)


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getId_user() {
        return id_user;
    }

    public void setId_user(long id_user) {
        this.id_user = id_user;
    }
}

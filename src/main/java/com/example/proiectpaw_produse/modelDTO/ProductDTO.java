package com.example.proiectpaw_produse.modelDTO;

public class ProductDTO {

    private Long id;
    private String name;

    private float price;
    private float actual_price;
    private String details;

    private  long user_id;
    private long buyer_id;

    public ProductDTO(Long id, String name, float price, String details) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.details = details;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }


    public ProductDTO() {
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public float getActual_price() {
        return actual_price;
    }

    public void setActual_price(float actual_price) {
        this.actual_price = actual_price;
    }

    public long getUser_id() {
        return user_id;
    }

    public void setUser_id(long user_id) {
        this.user_id = user_id;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public long getBuyer_id() {
        return buyer_id;
    }

    public void setBuyer_id(long buyer_id) {
        this.buyer_id = buyer_id;
    }
}

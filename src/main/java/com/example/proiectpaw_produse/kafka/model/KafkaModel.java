package com.example.proiectpaw_produse.kafka.model;

public class KafkaModel {
    private long id;
    private String productName;
    //private float productPrice;

    @Override
    public String toString() {
        return "KafkaModel{" +
                "id='" + id + '\'' +
                ", productName='" + productName + '\'' +
                //", productPrice='" + productPrice + '\'' +
                '}';
    }

    public KafkaModel(long id, String productName) {
        this.id = id;
        this.productName = productName;
        //this.productPrice = productPrice;
    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

//    public float getProductPrice() {
//        return productPrice;
//    }
//
//    public void setProductPrice(float productPrice) {
//        this.productPrice = productPrice;
//    }
}

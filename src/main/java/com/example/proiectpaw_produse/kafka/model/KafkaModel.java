package com.example.proiectpaw_produse.kafka.model;

public class KafkaModel {
    private long id;
    private String productName;

    @Override
    public String toString() {
        return "KafkaModel{" +
                "id='" + id + '\'' +
                ", productName='" + productName + '\'' +
                '}';
    }

    public String getProductName() {
        return productName;
    }

    public KafkaModel(long id, String productName) {
        this.id = id;
        this.productName = productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public KafkaModel() {
    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

}

package com.example.proiectpaw_produse.dao;

import com.example.proiectpaw_produse.persitence.Product;

import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ProductServiceDAO {

    private final EntityManager em;

    public ProductServiceDAO(EntityManager em) {

        this.em = em;
    }

    public List<Product> findProducts() {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Product> cq = cb.createQuery(Product.class);
        Root<Product> from = cq.from(Product.class);
        return em.createQuery(cq).getResultList();
    }
}

package com.example.proiectpaw_produse.repository;

import com.example.proiectpaw_produse.modelDTO.UserDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserDTO,Long> {

    List<UserDTO> findAll();

    Optional<UserDTO> findByUsername(String username);
}

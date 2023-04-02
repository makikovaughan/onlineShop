package com.example.soapShop.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.soapShop.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findUserByCredentialsUsernameAndIsDeletedFalse(String username);

}

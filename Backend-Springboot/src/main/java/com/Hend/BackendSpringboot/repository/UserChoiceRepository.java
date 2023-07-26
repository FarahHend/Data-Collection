package com.Hend.BackendSpringboot.repository;

import com.Hend.BackendSpringboot.model.UserChoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserChoiceRepository extends JpaRepository<UserChoice, Long> {
    // Add any additional query methods if needed
}


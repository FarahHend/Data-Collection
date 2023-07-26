package com.Hend.BackendSpringboot.repository;

import com.Hend.BackendSpringboot.model.Survey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SurveyRepository extends JpaRepository<Survey, Integer> {
    // Custom query methods, if needed
    @Query("SELECT s FROM Survey s WHERE s.user.id_user = :userId")
    List<Survey> findByUser_IdUser(Integer userId);

}


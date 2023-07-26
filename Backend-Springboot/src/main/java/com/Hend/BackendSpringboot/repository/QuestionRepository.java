package com.Hend.BackendSpringboot.repository;

import com.Hend.BackendSpringboot.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Integer> {


    List<Question> findAllBySurvey_IdSurvey(Integer questionId);
}


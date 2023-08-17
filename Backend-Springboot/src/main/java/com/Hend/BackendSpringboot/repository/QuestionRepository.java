package com.Hend.BackendSpringboot.repository;

import com.Hend.BackendSpringboot.model.Question;
import com.Hend.BackendSpringboot.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Integer> {


    List<Question> findAllBySurvey_IdSurvey(Integer questionId);
    //List<Question> findAllByIdSurvey(Integer surveyId);
    @Query("SELECT q FROM Question q WHERE q.user.id_user = :userId")
    List<Question> findByUser_IdUser(Integer userId);

    List<Question> findBySurveyIsNull();
}


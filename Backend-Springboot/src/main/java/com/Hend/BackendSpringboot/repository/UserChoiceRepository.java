package com.Hend.BackendSpringboot.repository;

import com.Hend.BackendSpringboot.model.UserChoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserChoiceRepository extends JpaRepository<UserChoice, Long> {

    @Query("SELECT uc FROM UserChoice uc WHERE uc.id.survey.idSurvey = :surveyId")
    List<UserChoice> findBySurveyId(Integer surveyId);

    @Query("SELECT uc.id.option.idOption, uc.id.option.optionText, COUNT(uc.id.user) " +
            "FROM UserChoice uc " +
            "WHERE uc.id.survey.idSurvey = :surveyId " +
            "GROUP BY uc.id.option.idOption, uc.id.option.optionText")
    List<Object[]> findOptionUserCountsBySurvey(@Param("surveyId") Integer surveyId);
}


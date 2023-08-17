package com.Hend.BackendSpringboot.DTOs;

import com.Hend.BackendSpringboot.model.Question;

import java.time.LocalDateTime;
import java.util.List;

public class SurveyDTO {

    private Integer id;
    private String titleSurvey;
    private String descriptionSurvey;
    private LocalDateTime createdAt;

    private List<QuestionDTO> questions;

    public SurveyDTO(Integer id, String titleSurvey, String descriptionSurvey) {
        this.id = id;
        this.titleSurvey = titleSurvey;
        this.descriptionSurvey = descriptionSurvey;
        //this.userId = userId;

    }

    public SurveyDTO() {

    }

    public SurveyDTO(Integer idSurvey, String titleSurvey, String descriptionSurvey, List<Question> questions, LocalDateTime createdAt) {

    }

    public SurveyDTO(Integer idSurvey, String titleSurvey, String descriptionSurvey, LocalDateTime createdAt) {
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
    public String getTitleSurvey() {
        return titleSurvey;
    }

    public void setTitleSurvey(String titleSurvey) {
        this.titleSurvey = titleSurvey;
    }

    public String getDescriptionSurvey() {
        return descriptionSurvey;
    }

    public void setDescriptionSurvey(String descriptionSurvey) {
        this.descriptionSurvey = descriptionSurvey;
    }

    public void setQuestions(List<QuestionDTO> questionDTOs) {
    }

    //public Integer getUserId() {
        //return userId;
    //}

    //public void setUserId(Integer userId) {
        ////this.userId = userId;
    //}

}

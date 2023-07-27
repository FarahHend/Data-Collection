package com.Hend.BackendSpringboot.DTOs;

public class UserChoiceDTO {
        private Integer userId;
        private Integer questionId;
        private Integer optionId;
        private String surveyTitle;
        private String questionText;
        private String optionText;


        // Constructors, getters, and setters

    public UserChoiceDTO() {
    }

    public UserChoiceDTO(Integer userId, Integer questionId, Integer optionId) {
        this.userId = userId;
        this.questionId = questionId;
        this.optionId = optionId;
    }

    // Getters
    public Integer getUserId() {
        return userId;
    }

    public Integer getQuestionId() {
        return questionId;
    }

    public Integer getOptionId() {
        return optionId;
    }

    // Setters
    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public void setQuestionId(Integer questionId) {
        this.questionId = questionId;
    }

    public String getSurveyTitle() {
        return surveyTitle;
    }

    public void setSurveyTitle(String surveyTitle) {
        this.surveyTitle = surveyTitle;
    }

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public String getOptionText() {
        return optionText;
    }

    public void setOptionText(String optionText) {
        this.optionText = optionText;
    }

    public void setOptionId(Integer optionId) {
        this.optionId = optionId;
    }
}



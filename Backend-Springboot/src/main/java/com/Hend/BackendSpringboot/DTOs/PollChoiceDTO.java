package com.Hend.BackendSpringboot.DTOs;

public class PollChoiceDTO {

    private Integer userId;
    private Integer questionId;
    private Integer optionId;
    private String questionText;
    private String optionText;
    private String firstname;

    public PollChoiceDTO() {
    }

    public PollChoiceDTO(Integer userId, Integer questionId, Integer optionId) {
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

    public String getUserName() {
        return firstname;
    }

    public void setUserName(String firstname) {
        this.firstname = firstname;
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


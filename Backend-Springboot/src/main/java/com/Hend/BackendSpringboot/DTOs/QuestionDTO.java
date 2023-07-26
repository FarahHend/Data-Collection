package com.Hend.BackendSpringboot.DTOs;

import com.Hend.BackendSpringboot.model.QuestionType;

public class QuestionDTO {
    private Integer idQuestion;
    private String questionText;
    private String questionType;

    // Add public getters and setters for the properties
    // You can use your IDE to generate them automatically or write them manually.

    // Example for idQuestion:
    public Integer getIdQuestion() {
        return idQuestion;
    }

    public void setIdQuestion(Integer idQuestion) {
        this.idQuestion = idQuestion;
    }

    // Example for questionText:
    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    // Example for questionType:
    public String getQuestionType() {
        return questionType;
    }

    public void setQuestionType(String questionType) {
        this.questionType = questionType;
    }

    // Add getters and setters for other properties if needed.
}


package com.Hend.BackendSpringboot.DTOs;
import java.util.List;

import com.Hend.BackendSpringboot.model.QuestionType;

public class QuestionDTO {
    private Integer idQuestion;
    private String questionText;
    private String questionType;
    private List<OptionDTO> options;

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

    public void setOptions(List<OptionDTO> optionDTOs) {
    }
}


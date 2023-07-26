package com.Hend.BackendSpringboot.DTOs;

public class OptionDTO {
    private Integer idOption;
    private String optionText;
    private Integer questionId;

    // Add public getters and setters for the properties

    // Example for idOption:
    public Integer getIdOption() {
        return idOption;
    }

    public void setIdOption(Integer idOption) {
        this.idOption = idOption;
    }

    // Example for optionText:
    public String getOptionText() {
        return optionText;
    }

    public void setOptionText(String optionText) {
        this.optionText = optionText;
    }

    // Example for questionId:
    public Integer getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Integer questionId) {
        this.questionId = questionId;
    }

    // Add getters and setters for other properties if needed.
}

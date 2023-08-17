package com.Hend.BackendSpringboot.model;

import com.Hend.BackendSpringboot.DTOs.OptionDTO;
import com.Hend.BackendSpringboot.DTOs.QuestionDTO;
import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.io.Serializable;

@Embeddable
public class UserChoiceId implements Serializable {

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User user;

    @ManyToOne
    @JoinColumn(name = "id_survey")
    private Survey survey;

    @ManyToOne
    @JoinColumn(name = "id_question")
    private Question question;

    @ManyToOne
    @JoinColumn(name = "id_option")
    private Option option;

    public void setUser(User user) {
        this.user =user;

    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public void setOption(Option option) {
        this.option = option;
    }

    public Survey getSurvey() {
        return survey;
    }

    public void setSurvey(Survey survey) {
        this.survey = survey;
    }

    public Option getOption() {
        return option;
    }

    public Question getQuestion() {
        return question;
    }

    public User getUser() {
        return user;
    }

    public void setUserId(Integer userId) {
    }

    public Integer getUserId() {
        return user != null ? user.getId() : null;
    }

    public Integer getQuestionId() {
        return question != null ? question.getIdQuestion() : null;
    }

    public Integer getOptionId() {
        return option != null ? option.getIdOption() : null;
    }

    public void setQuestionId(Integer questionId) {
    }

    public void setOptionId(Integer optionId) {
    }
}


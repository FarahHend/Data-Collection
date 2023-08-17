package com.Hend.BackendSpringboot.model;


import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "PollChoice")
public class PollChoice {

    @EmbeddedId
    private PollChoiceId idChoice;


    public void setOption(Option option) {
        idChoice.setOption(option);
    }

    public PollChoiceId getId() {
        return idChoice;
    }

    public void setId(PollChoiceId idChoice) {
        this.idChoice = idChoice;
    }

    public User getUser() {
        return idChoice.getUser();
    }

    public void setUser(User user) {
        this.idChoice.setUser(user);
    }

    public Question getQuestion() {
        return idChoice.getQuestion();
    }

    public void setQuestion(Question question) {
        this.idChoice.setQuestion(question);
    }

    public Option getOption() {
        return idChoice.getOption();
    }

    public String getUserName() {
        return idChoice.getUser().getFirstname();
    }
    public String getQuestionText() {
        return idChoice.getQuestion().getQuestionText();
    }

    public String getOptionText() {
        return idChoice.getOption().getOptionText();
    }

    public void setIdOption(Integer optionId) {

    }

    public void setIdQuestion(Integer questionId) {
    }

    public void setIdUser(Integer userId) {
    }
}

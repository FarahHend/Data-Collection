package com.Hend.BackendSpringboot.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "UserChoice")
public class UserChoice {

    @EmbeddedId
    private UserChoiceId id;

    public void setOption(Option option) {
    }

    public UserChoiceId getId() {
        return id;
    }

    public void setId(UserChoiceId id) {
        this.id = id;
    }

    // Getters and setters for individual fields of the embedded id

    public User getUser() {
        return id.getUser();
    }

    public void setUser(User user) {
        this.id.setUser(user);
    }

    public Question getQuestion() {
        return id.getQuestion();
    }

    public void setQuestion(Question question) {
        this.id.setQuestion(question);
    }

    public Option getOption() {
        return id.getOption();
    }





    // Getters and setters (if needed)

    // Constructors, if required
}

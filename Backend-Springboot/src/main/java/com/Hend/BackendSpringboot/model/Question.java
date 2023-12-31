package com.Hend.BackendSpringboot.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.Collection;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Question")
public class Question {

    @Id
    @GeneratedValue
    @Column(name = "id_question")
    private Integer idQuestion;

    @Column(name = "question_text")
    private String questionText;

    @Enumerated(EnumType.STRING)
    private QuestionType questionType;

    @ManyToOne
    @JoinColumn(name = "id_survey")
    private Survey survey;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User user;

    @OneToMany(mappedBy = "question")
    private List<Option> options;

    public Question(Integer questionId) {
    }

    // Getters and setters
    // Constructors, if required
}

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
@Table(name = "Survey")
public class Survey {

    @Id
    @GeneratedValue
    @Column(name = "id_survey")
    private Integer idSurvey;

    @Column(name = "title_survey")
    private String titleSurvey;

    @Column(name = "description_survey")
    private String descriptionSurvey;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User user;

    @OneToMany(mappedBy = "survey")
    private List<Question> questions;


    public Integer UserId() {
        return UserId();
    }

}



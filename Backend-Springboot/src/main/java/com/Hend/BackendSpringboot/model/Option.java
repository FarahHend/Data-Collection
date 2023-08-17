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
@Table(name = "Option")
public class Option {

    @Id
    @GeneratedValue
    @Column(name = "id_option")
    private Integer idOption;

    @Column(name = "option_text")
    private String optionText;

    @ManyToOne
    @JoinColumn(name = "id_question")
    private Question question;

    @OneToMany(mappedBy = "id.option")
    private List<UserChoice> UserChoices;

    @OneToMany(mappedBy = "idChoice.option")
    private List<PollChoice> pollChoices;

    public Option(Integer optionId) {
    }

    public void setIdOption(Integer idOption) {
        this.idOption = idOption;
    }

    public String getOptionText() {
        return optionText;
    }

    public void setOptionText(String optionText) {
        this.optionText = optionText;
    }

}


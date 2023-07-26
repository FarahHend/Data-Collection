package com.Hend.BackendSpringboot.service;

import com.Hend.BackendSpringboot.DTOs.UserChoiceDTO;
import com.Hend.BackendSpringboot.model.*;
import com.Hend.BackendSpringboot.repository.UserChoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserChoiceService {
    private final UserChoiceRepository userChoiceRepository;

    public UserChoiceService(UserChoiceRepository userChoiceRepository) {
        this.userChoiceRepository = userChoiceRepository;
    }

    public void addUserChoice(User user, Question question, Option option) {
        UserChoiceId userChoiceId = new UserChoiceId();
        userChoiceId.setUser(user);
        userChoiceId.setQuestion(question);
        userChoiceId.setOption(option);

        UserChoice userChoice = new UserChoice();
        userChoice.setId(userChoiceId);

        userChoiceRepository.save(userChoice);
    }

    //public List<UserChoice> getAllUserChoices() {
        //return userChoiceRepository.findAll();
    //}
    public List<UserChoiceDTO> getAllUserChoiceDTOs() {
        List<UserChoice> userChoices = userChoiceRepository.findAll();
        return userChoices.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Conversion logic from UserChoice entity to UserChoiceDTO
    private UserChoiceDTO convertToDTO(UserChoice userChoice) {
        UserChoiceDTO userChoiceDTO = new UserChoiceDTO();

        userChoiceDTO.setUserId(userChoice.getId().getUser().getId());
        userChoiceDTO.setQuestionId(userChoice.getId().getQuestion().getIdQuestion());
        userChoiceDTO.setOptionId(userChoice.getId().getOption().getIdOption());

        return userChoiceDTO;
    }
}



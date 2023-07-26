package com.Hend.BackendSpringboot.controller;

import com.Hend.BackendSpringboot.DTOs.UserChoiceDTO;
import com.Hend.BackendSpringboot.model.*;
import com.Hend.BackendSpringboot.repository.UserChoiceRepository;
import com.Hend.BackendSpringboot.service.AuthenticationService;
import com.Hend.BackendSpringboot.service.OptionService;
import com.Hend.BackendSpringboot.service.QuestionService;
import com.Hend.BackendSpringboot.service.UserChoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/auth")
public class UserChoiceController {
    private final UserChoiceService userChoiceService;
    private final AuthenticationService userService;
    private final QuestionService questionService;
    private final OptionService optionService;

    public UserChoiceController(UserChoiceService userChoiceService, AuthenticationService userService, QuestionService questionService, OptionService optionService) {
        this.userChoiceService = userChoiceService;
        this.userService = userService;
        this.questionService = questionService;
        this.optionService = optionService;
    }

    @PostMapping("/userchoice")
    public ResponseEntity<String> addUserChoice(
            @RequestParam Integer userId,
            @RequestParam Integer questionId,
            @RequestParam Integer optionId
    ) {
        // Retrieve the User, Question, and Option entities based on their IDs
        User user = userService.getUserById(userId);
        Question question = questionService.getQuestionById(questionId);
        Option option = optionService.getOptionById(optionId);

        // Add the UserChoice
        userChoiceService.addUserChoice(user, question, option);

        return ResponseEntity.ok("UserChoice added successfully.");
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserChoiceDTO>> getAllUserChoices() {
        List<UserChoiceDTO> userChoiceDTOs = userChoiceService.getAllUserChoiceDTOs();
        return ResponseEntity.ok(userChoiceDTOs);
    }

    // Helper method to convert UserChoiceDTO to UserChoice entity
    private UserChoice convertToEntity(UserChoiceDTO userChoiceDTO) {
        // Implement the conversion logic from UserChoiceDTO to UserChoice entity
        // You can use ModelMapper or manually map the properties

        // Example:
        UserChoice userChoice = new UserChoice();
        UserChoiceId userChoiceId = new UserChoiceId();
        userChoiceId.setUserId(userChoiceDTO.getUserId());
        userChoiceId.setQuestionId(userChoiceDTO.getQuestionId());
        userChoiceId.setOptionId(userChoiceDTO.getOptionId());
        userChoice.setId(userChoiceId);
        return userChoice;
    }

    // Helper method to convert UserChoice entity to UserChoiceDTO
    private UserChoiceDTO convertToDTO(UserChoice userChoice) {
        // Implement the conversion logic from UserChoice entity to UserChoiceDTO
        // You can use ModelMapper or manually map the properties

        // Example:
        UserChoiceDTO userChoiceDTO = new UserChoiceDTO();
        userChoiceDTO.setUserId(userChoice.getId().getUserId());
        userChoiceDTO.setQuestionId(userChoice.getId().getQuestionId());
        userChoiceDTO.setOptionId(userChoice.getId().getOptionId());
        return userChoiceDTO;
    }
}






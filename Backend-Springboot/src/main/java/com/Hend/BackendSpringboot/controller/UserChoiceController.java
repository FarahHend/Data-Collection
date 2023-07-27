package com.Hend.BackendSpringboot.controller;

import com.Hend.BackendSpringboot.DTOs.UserChoiceDTO;
import com.Hend.BackendSpringboot.model.*;
import com.Hend.BackendSpringboot.repository.UserRepository;
import com.Hend.BackendSpringboot.service.*;
import com.opencsv.CSVWriter;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;


import java.io.IOException;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/auth")
public class UserChoiceController {
    private final UserChoiceService userChoiceService;
    private final AuthenticationService userService;
    private final QuestionService questionService;
    private final OptionService optionService;

    private final SurveyService surveyService;

    private final UserRepository userRepository;

    public UserChoiceController(UserChoiceService userChoiceService, AuthenticationService userService, QuestionService questionService, OptionService optionService, SurveyService surveyService, UserRepository userRepository) {
        this.userChoiceService = userChoiceService;
        this.userService = userService;
        this.questionService = questionService;
        this.optionService = optionService;
        this.surveyService = surveyService;
        this.userRepository = userRepository;
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

    @GetMapping("/export_user_choices")
    public ResponseEntity<ByteArrayResource> exportUserChoicesToCSV() {
        List<UserChoiceDTO> userChoiceDTOs = userChoiceService.getAllUserChoiceDTOs();

        // Convert user choices to CSV format
        StringWriter writer = new StringWriter();
        try (CSVWriter csvWriter = new CSVWriter(writer)) {
            List<String[]> data = new ArrayList<>();
            data.add(new String[]{"Survey Title", "Question", "Option", "User"});

            for (UserChoiceDTO userChoiceDTO : userChoiceDTOs) {
                // Fetch additional details like survey title, question text, option text, and user name
                String surveyTitle = surveyService.getSurveyTitleById(userChoiceDTO.getQuestionId());
                String questionText = questionService.getQuestionTextById(userChoiceDTO.getQuestionId());
                String optionText = optionService.getOptionTextById(userChoiceDTO.getOptionId());

                // Set the survey title, question text, and option text in the UserChoiceDTO
                userChoiceDTO.setSurveyTitle(surveyTitle);
                userChoiceDTO.setQuestionText(questionText);
                userChoiceDTO.setOptionText(optionText);

                Optional<User> userOptional = userRepository.findById(userChoiceDTO.getUserId());
                String userName = userOptional.map(User::getUsername).orElse("N/A");


                data.add(new String[]{surveyTitle, questionText, optionText, userName});
            }

            csvWriter.writeAll(data);
        } catch (IOException e) {
            // Handle exception if needed
            e.printStackTrace();
        }

        // Prepare response as a downloadable file
        ByteArrayResource resource = new ByteArrayResource(writer.toString().getBytes());
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=user_choices.csv")
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(resource);
    }



}






package com.Hend.BackendSpringboot.controller;

import com.Hend.BackendSpringboot.DTOs.UserChoiceDTO;
import com.Hend.BackendSpringboot.model.*;
import com.Hend.BackendSpringboot.repository.UserRepository;
import com.Hend.BackendSpringboot.service.*;
import com.opencsv.CSVWriter;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;
import java.util.stream.Collectors;



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


    @PostMapping("/adduserchoice/userchoice")
    public ResponseEntity<String> addChoice(@RequestBody UserChoiceDTO userChoiceDTO) {
        Integer userId = userChoiceDTO.getUserId();
        Integer surveyId = userChoiceDTO.getSurveyId();
        Integer questionId = userChoiceDTO.getQuestionId();
        Integer optionId = userChoiceDTO.getOptionId();
        String optionText = userChoiceDTO.getOptionText();

        if (optionId != null) {
            userChoiceService.addUserChoice(userId, surveyId, questionId, optionId);
        } else if (optionText != null) {
            userChoiceService.addUserChoiceWithText(userId, surveyId, questionId, optionText);
        } else {
            return ResponseEntity.badRequest().body("Invalid user choice data.");
        }

        return ResponseEntity.ok("UserChoice added successfully.");
    }


    @GetMapping("/surveys/{surveyId}/user_choices")
    public ResponseEntity<List<UserChoiceDTO>> getUserChoicesBySurveyId(@PathVariable Integer surveyId) {
        List<UserChoice> userChoices = userChoiceService.getUserChoicesBySurveyId(surveyId);
        List<UserChoiceDTO> userChoiceDTOs = userChoices.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(userChoiceDTOs);
    }


    private UserChoiceDTO convertToDTO(UserChoice userChoice) {
        UserChoiceDTO userChoiceDTO = new UserChoiceDTO();

        userChoiceDTO.setUserId(userChoice.getId().getUser().getId());
        userChoiceDTO.setSurveyId(userChoice.getId().getSurvey().getIdSurvey());
        userChoiceDTO.setQuestionId(userChoice.getId().getQuestion().getIdQuestion());
        userChoiceDTO.setOptionId(userChoice.getId().getOption().getIdOption());

        String surveyTitle = surveyService.getSurveyTitleById(userChoice.getId().getSurvey().getIdSurvey());
        String questionText = questionService.getQuestionTextById(userChoice.getId().getQuestion().getIdQuestion());
        String optionText = optionService.getOptionTextById(userChoice.getId().getOption().getIdOption());

        Optional<User> userOptional = userRepository.findById(userChoice.getId().getUser().getId());
        String userName = userOptional.map(User::getFirstname).orElse("N/A");

        userChoiceDTO.setSurveyTitle(surveyTitle);
        userChoiceDTO.setQuestionText(questionText);
        userChoiceDTO.setOptionText(optionText);
        userChoiceDTO.setUserName(userName);

        return userChoiceDTO;
    }



    @GetMapping("/surveys/{surveyId}/user_choices/export_csv")
    public ResponseEntity<byte[]> exportUserChoicesToCSV(@PathVariable Integer surveyId) {
        List<UserChoice> userChoiceDTOs = userChoiceService.getUserChoicesBySurveyId(surveyId);

        StringWriter writer = new StringWriter();
        try (CSVWriter csvWriter = new CSVWriter(writer)) {
            List<String[]> data = new ArrayList<>();
            data.add(new String[]{"Name", "Survey Title", "Question", "Answer"});

            for (UserChoice userChoice : userChoiceDTOs) {
                data.add(new String[]{userChoice.getUserName(), userChoice.getSurveyTitle(), userChoice.getQuestionText(), userChoice.getOptionText()});
            }

            csvWriter.writeAll(data);
        } catch (IOException e) {
            e.printStackTrace();
        }

        byte[] csvBytes = writer.toString().getBytes();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", "user_choices.csv");

        return ResponseEntity.ok()
                .headers(headers)
                .body(csvBytes);
    }

}






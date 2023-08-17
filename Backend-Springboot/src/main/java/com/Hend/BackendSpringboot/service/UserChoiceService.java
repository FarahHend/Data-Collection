package com.Hend.BackendSpringboot.service;

import com.Hend.BackendSpringboot.DTOs.UserChoiceDTO;
import com.Hend.BackendSpringboot.model.*;
import com.Hend.BackendSpringboot.repository.*;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserChoiceService {
    private final UserChoiceRepository userChoiceRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SurveyRepository surveyRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private OptionRepository optionRepository;

    private final AuthenticationService userService;
    private final QuestionService questionService;
    private final OptionService optionService;

    private final SurveyService surveyService;

    public UserChoiceService(UserChoiceRepository userChoiceRepository, UserRepository userRepository, AuthenticationService userService, QuestionService questionService, OptionService optionService, SurveyService surveyService) {
        this.userChoiceRepository = userChoiceRepository;
        this.userRepository = userRepository;
        this.userService = userService;
        this.questionService = questionService;
        this.optionService = optionService;
        this.surveyService = surveyService;
    }

    //public void addUserChoice(User user, Survey survey, Question question, Option option) {
        //UserChoiceId userChoiceId = new UserChoiceId();
        //userChoiceId.setUser(user);
        //userChoiceId.setSurvey(survey);
       // userChoiceId.setQuestion(question);
        //userChoiceId.setOption(option);

        //UserChoice userChoice = new UserChoice();
       // userChoice.setId(userChoiceId);

       // userChoiceRepository.save(userChoice);
    //}

    public void addUserChoice(Integer userId, Integer surveyId, Integer questionId, Integer optionId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException("User not found"));
        Survey survey = surveyRepository.findById(surveyId).orElseThrow(() -> new EntityNotFoundException("Survey not found"));
        Question question = questionRepository.findById(questionId).orElseThrow(() -> new EntityNotFoundException("Question not found"));
        Option option = optionRepository.findById(optionId).orElseThrow(() -> new EntityNotFoundException("Option not found"));

        UserChoice userChoice = new UserChoice();
        UserChoiceId userChoiceId = new UserChoiceId();
        userChoiceId.setUser(user);
        userChoiceId.setSurvey(survey);
        userChoiceId.setQuestion(question);
        userChoiceId.setOption(option);
        userChoice.setId(userChoiceId);

        userChoiceRepository.save(userChoice);
    }



    public void addUserChoiceText(Integer userId, Integer surveyId, Integer questionId, String optionText) {
        User user = userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException("User not found"));
        Survey survey = surveyRepository.findById(surveyId).orElseThrow(() -> new EntityNotFoundException("Survey not found"));
        Question question = questionRepository.findById(questionId).orElseThrow(() -> new EntityNotFoundException("Question not found"));

        Option option = new Option();
        option.setOptionText(optionText);

        addUserChoice(user, survey, question, option);
    }

    private void addUserChoice(User user, Survey survey, Question question, Option option) {
        UserChoiceId userChoiceId = new UserChoiceId();
        userChoiceId.setUser(user);
        userChoiceId.setSurvey(survey);
        userChoiceId.setQuestion(question);
        userChoiceId.setOption(option);

        UserChoice userChoice = new UserChoice();
        userChoice.setId(userChoiceId);

        userChoiceRepository.save(userChoice);
    }

    public void addUserChoiceWithText(Integer userId, Integer surveyId, Integer questionId, String optionText) {
        User user = userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException("User not found"));
        Survey survey = surveyRepository.findById(surveyId).orElseThrow(() -> new EntityNotFoundException("Survey not found"));
        Question question = questionRepository.findById(questionId).orElseThrow(() -> new EntityNotFoundException("Question not found"));

        UserChoice userChoice = new UserChoice();
        UserChoiceId userChoiceId = new UserChoiceId();
        userChoiceId.setUser(user);
        userChoiceId.setSurvey(survey);
        userChoiceId.setQuestion(question);
        userChoice.setId(userChoiceId);

        Option option = new Option();
        option.setOptionText(optionText);
        optionRepository.save(option);

        userChoiceId.setOption(option);

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

    private UserChoiceDTO convertToDTO(UserChoice userChoice) {
        UserChoiceDTO userChoiceDTO = new UserChoiceDTO();

        userChoiceDTO.setUserId(userChoice.getId().getUser().getId());
        userChoiceDTO.setQuestionId(userChoice.getId().getQuestion().getIdQuestion());
        userChoiceDTO.setOptionId(userChoice.getId().getOption().getIdOption());

        String surveyTitle = surveyService.getSurveyTitleById(userChoice.getId().getQuestion().getIdQuestion());
        String questionText = questionService.getQuestionTextById(userChoice.getId().getQuestion().getIdQuestion());
        String optionText = optionService.getOptionTextById(userChoice.getId().getOption().getIdOption());
        //String userName = userChoice.getId().getUser().getUsername();

        Optional<User> userOptional = userRepository.findById(userChoice.getId().getUser().getId());
        String userName = userOptional.map(User::getFirstname).orElse("N/A");

        userChoiceDTO.setSurveyTitle(surveyTitle);
        userChoiceDTO.setQuestionText(questionText);
        userChoiceDTO.setOptionText(optionText);
        userChoiceDTO.setUserName(userName);


        return userChoiceDTO;
    }

    public List<UserChoice> getUserChoicesBySurveyId(Integer surveyId) {
        return userChoiceRepository.findBySurveyId(surveyId);
    }

}



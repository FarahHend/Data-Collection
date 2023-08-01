package com.Hend.BackendSpringboot.service;

import com.Hend.BackendSpringboot.DTOs.SurveyDTO;
import com.Hend.BackendSpringboot.model.Option;
import com.Hend.BackendSpringboot.model.Survey;
import com.Hend.BackendSpringboot.model.User;
import com.Hend.BackendSpringboot.repository.SurveyRepository;
import com.Hend.BackendSpringboot.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SurveyService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private static SurveyRepository surveyRepository;

    @Autowired
    public SurveyService(SurveyRepository surveyRepository) {
        this.surveyRepository = surveyRepository;
    }


    public Survey saveSurvey(Survey survey) {
        return surveyRepository.save(survey);
    }

        public Survey addSurvey(Integer userId, Survey survey) {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

            survey.setUser(user);
            return surveyRepository.save(survey);
        }

    //public List<Survey> getSurveysByUserId(Integer userId) {
        //return surveyRepository.findByUserId(userId);
    //}

    public List<SurveyDTO> getSurveysByUserId(Integer userId) {
        List<Survey> surveys = surveyRepository.findByUser_IdUser(userId);
        return surveys.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private SurveyDTO convertToDTO(Survey survey) {
        return new SurveyDTO(survey.getIdSurvey(), survey.getTitleSurvey(), survey.getDescriptionSurvey());
    }


    public static List<SurveyDTO> getAllSurveys() {
        List<Survey> surveys = surveyRepository.findAll();
        List<SurveyDTO> surveyDTOs = new ArrayList<>();
        for (Survey survey : surveys) {
            SurveyDTO surveyDTO = new SurveyDTO();
            surveyDTO.setId(survey.getIdSurvey());
            surveyDTO.setTitleSurvey(survey.getTitleSurvey());
            surveyDTO.setDescriptionSurvey(survey.getDescriptionSurvey());
           // surveyDTO.setUserId(survey.UserId());
            surveyDTOs.add(surveyDTO);
        }
        return surveyDTOs;
    }


    @Transactional
    public void deleteSurveyById(Integer id) {
       surveyRepository.deleteById(id);

    }


    public Survey getSurveyById(Integer surveyId) {

        return surveyRepository.findById(surveyId).orElse(null);
    }

    public SurveyDTO getSurveyByIdDTO(Integer surveyId) {
        Survey survey = surveyRepository.findById(surveyId).orElse(null);
        return convertToDTO(survey);
    }

    public String getSurveyTitleById(Integer surveyId) {
        Optional<Survey> surveyOptional = surveyRepository.findById(surveyId);
        return surveyOptional.map(Survey::getTitleSurvey).orElse("N/A");
    }
}


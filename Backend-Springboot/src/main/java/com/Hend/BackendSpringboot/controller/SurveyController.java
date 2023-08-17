package com.Hend.BackendSpringboot.controller;

import com.Hend.BackendSpringboot.DTOs.FileDTO;
import com.Hend.BackendSpringboot.DTOs.QuestionDTO;
import com.Hend.BackendSpringboot.DTOs.SurveyDTO;
import com.Hend.BackendSpringboot.DTOs.OptionDTO;
import com.Hend.BackendSpringboot.model.Option;
import com.Hend.BackendSpringboot.model.Question;
import com.Hend.BackendSpringboot.model.Survey;
import com.Hend.BackendSpringboot.service.OptionService;
import com.Hend.BackendSpringboot.service.QuestionService;
import com.Hend.BackendSpringboot.service.SurveyService;
import io.swagger.models.auth.In;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/auth")
public class SurveyController {
    @Autowired
    private SurveyService surveyService;

    @Autowired
    private QuestionService questionService;

    @Autowired
    private OptionService optionService;


    @PostMapping("/add")
    public ResponseEntity<Survey> addSurvey(@RequestBody Survey survey) {
        Survey savedSurvey = surveyService.saveSurvey(survey);
        return ResponseEntity.ok(savedSurvey);
    }
    //public ResponseEntity<Survey> addSurvey(@RequestParam("userId") Integer userId, @RequestBody Survey survey) {
        //try {
           // Survey newSurvey = surveyService.addSurvey(userId, survey);
            //return ResponseEntity.ok(newSurvey);
        //} catch (RuntimeException e) {
            //return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        //}
    //}

    //@GetMapping("/byUserId/{userId}")
    //public ResponseEntity<List<Survey>> getSurveysByUserId(@PathVariable Integer userId) {
        //List<Survey> surveys = surveyService.getSurveysByUserId(userId);
        ////return ResponseEntity.ok(surveys);
    //}

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<SurveyDTO>> getSurveysByUserId(@PathVariable Integer userId) {
        List<SurveyDTO> surveys = surveyService.getSurveysByUserId(userId);
        return ResponseEntity.ok(surveys);
    }

    @GetMapping("/survey/{surveyId}")
    public ResponseEntity<SurveyDTO> getSurveyById(@PathVariable Integer surveyId) {
        SurveyDTO survey = surveyService.getSurveyByIdDTO(surveyId);
        if (survey == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(survey);
    }


    @GetMapping("/get_surveys/{surveyId}")
    public ResponseEntity<SurveyDTO> getSurveyDetails(@PathVariable Integer surveyId) {
        Survey survey = surveyService.getSurveyById(surveyId);
        if (survey == null) {
            return ResponseEntity.notFound().build();
        }

        List<QuestionDTO> questionDTOs = questionService.getQuestionsBySurveyId(surveyId);
        SurveyDTO surveyDetailsDTO = new SurveyDTO();
        surveyDetailsDTO.setId(survey.getId());
        surveyDetailsDTO.setTitleSurvey(survey.getTitleSurvey());
        surveyDetailsDTO.setDescriptionSurvey(survey.getDescriptionSurvey());
        surveyDetailsDTO.setQuestions(questionDTOs);

        return ResponseEntity.ok(surveyDetailsDTO);
    }



    @GetMapping("/surveys")
    public ResponseEntity<List<SurveyDTO>> getAllSurveys() {

        List<SurveyDTO> fileDTOs = SurveyService.getAllSurveys();
        return new ResponseEntity<>(fileDTOs, HttpStatus.OK);
    }

    @GetMapping("/surveys/{surveyId}/participants")
    public ResponseEntity<Integer> getParticipantsCountForSurvey(@PathVariable Integer surveyId) {
        int participantsCount = surveyService.getParticipantsCountForSurvey(surveyId);
        return ResponseEntity.ok(participantsCount);
    }

    @GetMapping("/{surveyId}/option_user_counts")
    public ResponseEntity<List<OptionDTO>> getOptionUserCounts(@PathVariable Integer surveyId) {
        List<OptionDTO> optionUserCounts = surveyService.getOptionUserCountsBySurvey(surveyId);
        return ResponseEntity.ok(optionUserCounts);
    }

    @DeleteMapping("/delete/survey/{id}")
    public ResponseEntity<String> deleteSurvey(@PathVariable Integer id) {
        try {
            surveyService.deleteSurveyById(id);
            return ResponseEntity.ok("Survey with ID " + id + " has been deleted.");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Survey with ID " + id + " not found.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting survey.");
        }
    }
}

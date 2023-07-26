package com.Hend.BackendSpringboot.controller;

import com.Hend.BackendSpringboot.DTOs.QuestionDTO;
import com.Hend.BackendSpringboot.model.Question;
import com.Hend.BackendSpringboot.model.QuestionType;
import com.Hend.BackendSpringboot.model.Survey;
import com.Hend.BackendSpringboot.service.QuestionService;
import com.Hend.BackendSpringboot.service.SurveyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/auth")
public class QuestionController {

    private final QuestionService questionService;
    private final SurveyService surveyService; // Or SurveyRepository if no service

    @Autowired
    public QuestionController(QuestionService questionService, SurveyService surveyService) {
        this.questionService = questionService;
        this.surveyService = surveyService;
    }

    @PostMapping("/addquestion")
    public ResponseEntity<Question> addNewQuestion(
            @RequestParam String questionText,
            @RequestParam QuestionType questionType,
            @RequestParam Integer surveyId) {

        // Retrieve the survey by ID using the service or repository
        Survey survey = surveyService.getSurveyById(surveyId); // Or surveyRepository.findById(surveyId);

        if (survey == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Question newQuestion = questionService.addNewQuestion(questionText, questionType, surveyId);

        return ResponseEntity.status(HttpStatus.CREATED).body(newQuestion);
    }

    //@GetMapping(value = "/{questionId}", produces = MediaType.APPLICATION_JSON_VALUE)
    //public ResponseEntity<QuestionDTO> getQuestionDTOById(@PathVariable Integer questionId) {
        //QuestionDTO questionDTO = questionService.getQuestionDTOById(questionId);

        //if (questionDTO == null) {
            //return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        //}

        //return ResponseEntity.ok(questionDTO);
    //}

    @GetMapping("/questions-by-id/{questionId}")
    public ResponseEntity<List<QuestionDTO>> getQuestionDTOsByQuestionId(@PathVariable Integer questionId) {
        List<QuestionDTO> questionDTOList = questionService.getQuestionDTOsByQuestionId(questionId);

        if (questionDTOList.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }

        return ResponseEntity.ok(questionDTOList);
    }


    @DeleteMapping("/{questionId}")
    public ResponseEntity<String> deleteQuestionById(@PathVariable Integer questionId) {
        questionService.deleteQuestionById(questionId);
        return ResponseEntity.ok("Question with ID: " + questionId + " deleted successfully.");
    }
}

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
    public ResponseEntity<Question> addSQuestion(@RequestBody Question question) {
        Question savedQuestion = questionService.saveQuestion(question);
        return ResponseEntity.ok(savedQuestion);
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

    @GetMapping("/getsurvey/{surveyId}")
    public ResponseEntity<List<QuestionDTO>> getQuestionsBySurveyId(@PathVariable Integer surveyId) {
        List<QuestionDTO> questions = questionService.getQuestionsBySurveyId(surveyId);
        return ResponseEntity.ok(questions);
    }


    @DeleteMapping("/{questionId}")
    public ResponseEntity<String> deleteQuestionById(@PathVariable Integer questionId) {
        questionService.deleteQuestionById(questionId);
        return ResponseEntity.ok("Question with ID: " + questionId + " deleted successfully.");
    }
}

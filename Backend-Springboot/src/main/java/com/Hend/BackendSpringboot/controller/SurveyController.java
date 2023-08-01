package com.Hend.BackendSpringboot.controller;

import com.Hend.BackendSpringboot.DTOs.FileDTO;
import com.Hend.BackendSpringboot.DTOs.SurveyDTO;
import com.Hend.BackendSpringboot.model.Option;
import com.Hend.BackendSpringboot.model.Survey;
import com.Hend.BackendSpringboot.service.SurveyService;
import io.swagger.models.auth.In;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/v1/auth")
public class SurveyController {
    @Autowired
    private SurveyService surveyService;


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

    @GetMapping("/surveys")
    public ResponseEntity<List<SurveyDTO>> getAllSurveys() {

        List<SurveyDTO> fileDTOs = SurveyService.getAllSurveys();
        return new ResponseEntity<>(fileDTOs, HttpStatus.OK);
    }

    @DeleteMapping("/surveys/{id}")
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

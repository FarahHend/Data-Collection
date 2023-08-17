package com.Hend.BackendSpringboot.service;

import com.Hend.BackendSpringboot.DTOs.OptionDTO;
import com.Hend.BackendSpringboot.DTOs.QuestionDTO;
import com.Hend.BackendSpringboot.model.Question;
import com.Hend.BackendSpringboot.model.QuestionType;
import com.Hend.BackendSpringboot.model.Survey;
import com.Hend.BackendSpringboot.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final SurveyService surveyService; // Or SurveyRepository if no service

    @Autowired
    public QuestionService(QuestionRepository questionRepository, SurveyService surveyService) {
        this.questionRepository = questionRepository;
        this.surveyService = surveyService;
    }
    public Question saveQuestion(Question question) {
        return questionRepository.save(question);
    }

    public Question addNewQuestion(String questionText, QuestionType questionType, Integer surveyId) {
        // Retrieve the survey by ID using the service or repository
        Survey survey = surveyService.getSurveyById(surveyId); // Or surveyRepository.findById(surveyId);

        if (survey == null) {
            throw new IllegalArgumentException("Survey not found for ID: " + surveyId);
        }

        Question newQuestion = new Question();
        newQuestion.setQuestionText(questionText);
        newQuestion.setQuestionType(questionType);
        newQuestion.setSurvey(survey);

        // Save the question to the database using the repository
        return questionRepository.save(newQuestion);
    }

    public Question getQuestionById(Integer questionId) {
        return questionRepository.findById(questionId).orElse(null);
    }

    //public QuestionDTO getQuestionDTOById(Integer questionId) {
    //Question question = questionRepository.findById(questionId).orElse(null);

    //if (question == null) {
    //return null;
    //}

    //QuestionDTO questionDTO = new QuestionDTO();
    //questionDTO.setIdQuestion(question.getIdQuestion());
    //questionDTO.setQuestionText(question.getQuestionText());
    //questionDTO.setQuestionType(question.getQuestionType());
    // Set other fields from the Question entity if needed

    //return questionDTO;
    //}

    public List<QuestionDTO> getQuestionDTOsByQuestionId(Integer questionId) {
        List<Question> questions = questionRepository.findAllBySurvey_IdSurvey(questionId);
        return questions.stream()
                .map(this::mapToQuestionDTO)
                .collect(Collectors.toList());
    }

    public List<QuestionDTO> getQuestionsBySurveyId(Integer surveyId) {
        List<Question> questions = questionRepository.findAllBySurvey_IdSurvey(surveyId);
        return questions.stream()
                .map(this::mapToQuestionDTO)
                .collect(Collectors.toList());
    }

    public List<QuestionDTO> getQuestionsByUserId(Integer userId) {
        List<Question> questions = questionRepository.findByUser_IdUser(userId);
        return questions.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private QuestionDTO convertToDTO(Question question) {
        QuestionDTO questionDTO = new QuestionDTO();
        questionDTO.setIdQuestion(question.getIdQuestion());
        questionDTO.setQuestionText(question.getQuestionText());
        questionDTO.setQuestionType(question.getQuestionType().name());

        return questionDTO;
    }

    public List<Question> getQuestionsWithNullSurvey() {
        return questionRepository.findBySurveyIsNull();
    }

    public List<Question> getQuestionBySurveyId(Integer surveyId) {
        List<Question> questions = questionRepository.findAllBySurvey_IdSurvey(surveyId);
        return questions;
    }

    private QuestionDTO mapToQuestionDTO(Question question) {
        QuestionDTO questionDTO = new QuestionDTO();
        questionDTO.setIdQuestion(question.getIdQuestion());
        questionDTO.setQuestionText(question.getQuestionText());
        questionDTO.setQuestionType(question.getQuestionType().name());
        // Set other fields from the Question entity if needed

        return questionDTO;
    }

    public void deleteQuestionById(Integer questionId) {
        questionRepository.deleteById(questionId);
    }

    public String getQuestionTextById(Integer questionId) {
        Optional<Question> questionOptional = questionRepository.findById(questionId);
        return questionOptional.map(Question::getQuestionText).orElse("N/A");
    }
}
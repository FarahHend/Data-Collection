package com.Hend.BackendSpringboot.service;

import com.Hend.BackendSpringboot.DTOs.PollChoiceDTO;
import com.Hend.BackendSpringboot.model.*;
import com.Hend.BackendSpringboot.repository.*;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.List;

@Service
public class PollChoiceService {

    private final PollChoiceRepository pollChoiceRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private OptionRepository optionRepository;

    private final AuthenticationService userService;
    private final QuestionService questionService;
    private final OptionService optionService;
    public PollChoiceService(PollChoiceRepository pollChoiceRepository, UserRepository userRepository, AuthenticationService userService, QuestionService questionService, OptionService optionService) {
        this.pollChoiceRepository = pollChoiceRepository;
        this.userRepository = userRepository;
        this.userService = userService;
        this.questionService = questionService;
        this.optionService = optionService;
    }

    public void addPollChoice(Integer userId, Integer questionId, Integer optionId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException("User not found"));
        Question question = questionRepository.findById(questionId).orElseThrow(() -> new EntityNotFoundException("Question not found"));
        Option option = optionRepository.findById(optionId).orElseThrow(() -> new EntityNotFoundException("Option not found"));

        if (!pollChoiceRepository.existsByUserAndQuestionAndOption(user, question, option)) {
            PollChoiceId pollChoiceId = new PollChoiceId(user, question, option);
            PollChoice pollChoice = new PollChoice(pollChoiceId);

            pollChoiceRepository.save(pollChoice);
        }
    }

    public List<PollChoiceDTO> getPollChoicesByQuestionId(Integer questionId) {
        List<PollChoice> pollChoices = pollChoiceRepository.findByIdChoice_Question_IdQuestion(questionId);
        List<PollChoiceDTO> pollChoiceDTOs = new ArrayList<>();

        for (PollChoice pollChoice : pollChoices) {
            PollChoiceDTO pollChoiceDTO = new PollChoiceDTO(
                    pollChoice.getId().getUser().getId(),
                    pollChoice.getId().getQuestion().getIdQuestion(),
                    pollChoice.getId().getOption().getIdOption()
            );
            pollChoiceDTO.setUserName(pollChoice.getId().getUser().getFirstname());
            pollChoiceDTO.setQuestionText(pollChoice.getId().getQuestion().getQuestionText());
            pollChoiceDTO.setOptionText(pollChoice.getId().getOption().getOptionText());

            pollChoiceDTOs.add(pollChoiceDTO);
        }

        return pollChoiceDTOs;
    }

    public void exportPollChoicesToCsv(List<PollChoiceDTO> pollChoices, HttpServletResponse response) throws IOException {
        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; filename=\"poll_choices.csv\"");

        try (OutputStreamWriter writer = new OutputStreamWriter(response.getOutputStream())) {
            writer.write("Question,Option,UserName\n");
            for (PollChoiceDTO pollChoice : pollChoices) {
                writer.write(
                             pollChoice.getQuestionText() + "," +
                                pollChoice.getOptionText() + "," +
                                pollChoice.getUserName() + "\n"
                );
            }
        }
    }


}

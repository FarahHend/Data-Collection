package com.Hend.BackendSpringboot.controller;

import com.Hend.BackendSpringboot.DTOs.PollChoiceDTO;
import com.Hend.BackendSpringboot.DTOs.UserChoiceDTO;
import com.Hend.BackendSpringboot.model.PollChoice;
import com.Hend.BackendSpringboot.repository.UserRepository;
import com.Hend.BackendSpringboot.service.*;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/auth")
public class PollChoiceController {

    private final PollChoiceService pollChoiceService;

    public PollChoiceController(PollChoiceService pollChoiceService) {
        this.pollChoiceService = pollChoiceService;

    }

    @PostMapping("/adduserchoice/simple")
    public ResponseEntity<String> addChoiceSimple (@RequestBody PollChoiceDTO pollChoiceDTO) {
        Integer userId = pollChoiceDTO.getUserId();
        Integer questionId = pollChoiceDTO.getQuestionId();
        Integer optionId = pollChoiceDTO.getOptionId();
       // String optionText = pollChoiceDTO.getOptionText();

        pollChoiceService.addPollChoice(userId, questionId, optionId);

        return ResponseEntity.ok("UserChoice added successfully.");
    }

    @GetMapping("/pollchoices/by-question/{questionId}")
    public ResponseEntity<List<PollChoiceDTO>> getPollChoicesByQuestionId(@PathVariable Integer questionId) {
        List<PollChoiceDTO> pollChoices = pollChoiceService.getPollChoicesByQuestionId(questionId);
        return ResponseEntity.ok(pollChoices);
    }

    @GetMapping("/pollchoices/csv/by-question/{questionId}")
    public void downloadPollChoicesCsvByQuestionId(@PathVariable Integer questionId, HttpServletResponse response) throws IOException {
        List<PollChoiceDTO> pollChoices = pollChoiceService.getPollChoicesByQuestionId(questionId);
        pollChoiceService.exportPollChoicesToCsv(pollChoices, response);
    }
}

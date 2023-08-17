package com.Hend.BackendSpringboot.controller;

import com.Hend.BackendSpringboot.DTOs.OptionDTO;
import com.Hend.BackendSpringboot.model.Option;
import com.Hend.BackendSpringboot.service.OptionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/auth")
public class OptionController {

    private final OptionService optionService;

    public OptionController(OptionService optionService) {
        this.optionService = optionService;
    }

    @PostMapping("/addoption")
    public ResponseEntity<Option> addOption(@RequestBody Option option) {
        Option savedOption = optionService.saveOption(option);
        return ResponseEntity.ok(savedOption);
    }



    @GetMapping("/getoption/{optionId}")
    public ResponseEntity<List<OptionDTO>> getOptionById(@PathVariable Integer optionId) {
        List<OptionDTO> optionDTOs = optionService.getOptionDTOsByOptionId(optionId);
        if (!optionDTOs.isEmpty()) {
            return ResponseEntity.ok(optionDTOs);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/updateoption/{optionId}")
    public ResponseEntity<Option> updateOptionText(@PathVariable Integer optionId, @RequestBody OptionDTO optionDTO) {
        Option optionToUpdate = optionService.getOptionById(optionId);

        if (optionToUpdate == null) {
            return ResponseEntity.notFound().build();
        }

        optionToUpdate.setOptionText(optionDTO.getOptionText());
        Option updatedOption = optionService.saveOption(optionToUpdate);

        return ResponseEntity.ok(updatedOption);
    }

    @GetMapping("/question/{questionId}")
    public ResponseEntity<List<OptionDTO>> getOptionsByQuestionId(@PathVariable Integer questionId) {
        List<OptionDTO> options = optionService.getOptionsByQuestionId(questionId);
        return ResponseEntity.ok(options);
    }

    @DeleteMapping("/deleteoption/{optionId}")
    public ResponseEntity<Void> deleteOptionById(@PathVariable Integer optionId) {
        Option optionToDelete = optionService.getOptionById(optionId);

        if (optionToDelete == null) {
            return ResponseEntity.notFound().build();
        }

        optionService.deleteOption(optionToDelete);
        return ResponseEntity.noContent().build();
    }
}


package com.Hend.BackendSpringboot.service;

import com.Hend.BackendSpringboot.DTOs.OptionDTO;
import com.Hend.BackendSpringboot.model.Option;
import com.Hend.BackendSpringboot.repository.OptionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OptionService {

    private final OptionRepository optionRepository;

    public OptionService(OptionRepository optionRepository) {
        this.optionRepository = optionRepository;
    }

    public Option saveOption(Option option) {
        return optionRepository.save(option);
    }

    //public Option getOptionById(Integer optionId) {
        //return optionRepository.findById(optionId).orElse(null);
    //}

    public List<OptionDTO> getOptionDTOsByOptionId(Integer optionId) {
        List<Option> options = optionRepository.findAllByIdOption(optionId);
        return options.stream()
                .map(this::convertToOptionDTO)
                .collect(Collectors.toList());
    }

    private OptionDTO convertToOptionDTO(Option option) {
        OptionDTO optionDTO = new OptionDTO();
        optionDTO.setIdOption(option.getIdOption());
        optionDTO.setOptionText(option.getOptionText());
        optionDTO.setQuestionId(option.getQuestion().getIdQuestion());
        // Add other properties if needed.
        return optionDTO;
    }

    public Option getOptionById(Integer optionId) {
        return optionRepository.findById(optionId).orElse(null);
    }

    public String getOptionTextById(Integer optionId) {
        Optional<Option> optionOptional = optionRepository.findById(optionId);
        return optionOptional.map(Option::getOptionText).orElse("N/A");
    }
}


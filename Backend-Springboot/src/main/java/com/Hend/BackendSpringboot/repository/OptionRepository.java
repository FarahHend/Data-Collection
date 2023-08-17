package com.Hend.BackendSpringboot.repository;

import com.Hend.BackendSpringboot.model.Option;
import com.Hend.BackendSpringboot.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OptionRepository extends JpaRepository<Option, Integer> {
    List<Option> findAllByIdOption(Integer idOption);
    List<Option> findAllByQuestion_IdQuestion(Integer questionId);
}


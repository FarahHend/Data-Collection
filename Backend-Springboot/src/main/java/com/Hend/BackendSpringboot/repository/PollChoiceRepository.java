package com.Hend.BackendSpringboot.repository;

import com.Hend.BackendSpringboot.model.Option;
import com.Hend.BackendSpringboot.model.PollChoice;
import com.Hend.BackendSpringboot.model.Question;
import com.Hend.BackendSpringboot.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PollChoiceRepository extends JpaRepository<PollChoice, Integer> {

    @Query("SELECT CASE WHEN COUNT(pc) > 0 THEN true ELSE false END FROM PollChoice pc " +
            "WHERE pc.idChoice.user = :user AND pc.idChoice.question = :question AND pc.idChoice.option = :option")
    boolean existsByUserAndQuestionAndOption(@Param("user") User user,
                                             @Param("question") Question question,
                                             @Param("option") Option option);

    List<PollChoice> findByIdChoice_Question_IdQuestion(Integer questionId);
}
package com.Hend.BackendSpringboot.repository;

import com.Hend.BackendSpringboot.model.File;
import com.Hend.BackendSpringboot.model.Survey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FileRepository extends JpaRepository<File, String> {
    @Query("SELECT s FROM File s WHERE s.user.id_user = :userId")
    List<File> findByUserId(Integer userId);
    List<File> findByFile_nameContainingIgnoreCase(String fileName);

}

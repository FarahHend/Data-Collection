package com.Hend.BackendSpringboot.repository;
import java.util.Optional;
import com.Hend.BackendSpringboot.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Integer> {

 Optional<User> findByEmail(String email);

 @Query("SELECT u FROM User u WHERE u.id_user = :id_user")
 Optional<User> findById_user(@Param("id_user") Integer id_user);

}

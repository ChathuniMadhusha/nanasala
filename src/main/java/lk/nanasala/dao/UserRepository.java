package lk.nanasala.dao;


import lk.nanasala.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    @Query(value = "select u from User u where u.employee_id.id = ?1")
    User findUserByEmployee_id(Integer employee);

    //adminwa enneth na, log wechcha user wa enneth na
    @Query(value = "select u from User u where u.username <> 'Admin' and u.username<>?1 order by u.id desc")
    List<User> findAll(String username);

    @Query(value = "select u from User u where u.username <> 'Admin' order by u.id desc")
    List<User> findAll();

    User getUserByUsername(String username);

    User getUserByEmail(String email);

    @Query("select u from User u where u.employee_id.id=?1")
    User getByEmployee(Integer id);

    @Query("select u from User u  where u.username=?1 and u.email=?2 and u.status=true")
    public User getUserByUsernameEmail(String username, String email);


}

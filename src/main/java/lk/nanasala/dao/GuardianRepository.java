package lk.nanasala.dao;


import lk.nanasala.entity.Guardian;
import lk.nanasala.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface GuardianRepository extends JpaRepository<Guardian,Integer> {
    //data base eke tyna guardian contact ekata samada balanwa api wisin dena lada contact number eka
    @Query(value = "select g from Guardian g where g.emergency_con = ?1")
    Guardian findGuardianByEmergency_con(String emergency_con);




}

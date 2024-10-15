package lk.nanasala.dao;

import lk.nanasala.entity.Acadamic_Year;
import lk.nanasala.entity.Intake;
import lk.nanasala.entity.Session_Managment;
import lk.nanasala.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface IntakeRepository extends JpaRepository<Intake,Integer> {



    @Query(value = "select i from Intake i where i.id not in\n" +
            "(select b.intake_id from Batch_Implementation b where b.acadamic_year_id.id =?1 and b.course_id.id =?2 and b.theory_day_id.id=?3)")
    List<Intake> getByacadamicycoursetheory(Integer aid, Integer cid, Integer tid);

}

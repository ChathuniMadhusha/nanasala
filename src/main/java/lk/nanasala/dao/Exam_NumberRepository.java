package lk.nanasala.dao;

import lk.nanasala.entity.Acadamic_Year;
import lk.nanasala.entity.Exam_Number;
import lk.nanasala.entity.Intake;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Exam_NumberRepository extends JpaRepository<Exam_Number,Integer> {


    @Query(value = "select en from Exam_Number en where en.id not in\n" +
            "(select e.exam_number_id from Exam_Define e where e.course_id.course_catogary_id.id =?1 and e.course_id.id =?2 and e.acadamic_year_id.id=?3)")
    List<Exam_Number> getExamNumberAccorcatNameyear(Integer caid, Integer cnid, Integer ayid);

}

package lk.nanasala.dao;

import lk.nanasala.entity.Acadamic_Year;
import lk.nanasala.entity.Exam_Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Exam_TypeRepository extends JpaRepository<Exam_Type,Integer> {

    @Query(value = "select et from Exam_Type as et where et.id in (select ehet.exam_type_id.id from Exam_has_Examtype ehet where ehet.exam_id.id=?1)")
    List<Exam_Type> getExamTypeAccorExam(int id);

    @Query(value = "select et from Exam_Type as et where et.id in (select chet.exam_type_id.id from Course_Has_Examtype chet where chet.course_id.id=?1)")
    List<Exam_Type> getExamTypeAccorCourse(int cid);
}

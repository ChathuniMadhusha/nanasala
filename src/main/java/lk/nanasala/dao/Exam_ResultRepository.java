package lk.nanasala.dao;

import lk.nanasala.entity.ExamResult;
import lk.nanasala.entity.Exam_Result;
import lk.nanasala.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface Exam_ResultRepository extends JpaRepository<Exam_Result,Integer> {


    Exam_Result findExam_ResultByid(Integer id);


//    @Query(value = "select er from Exam_Result er where er.exam_id = ?1")
//    ExamResult findStudentByExam(String examname);



    @Query(value = "select er from Exam_Result er where er.exam_id.course_id.id=?1 and er.exam_id.id=?2")
    Exam_Result getExamResultByCoursenameAndExamName(Integer cid, Integer eid);
}

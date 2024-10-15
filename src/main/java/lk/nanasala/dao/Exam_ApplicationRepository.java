package lk.nanasala.dao;

import lk.nanasala.entity.Attendance_Management;
import lk.nanasala.entity.Exam_Application;
import lk.nanasala.entity.Exam_Define;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface Exam_ApplicationRepository extends JpaRepository<Exam_Application,Integer> {


    Exam_Application findExamApplicationById(Integer id);



//
//    @Query(value = "SELECT examappli FROM Exam_Application examappli where examappli.exam_id.id=?1 and examappli.student_id.id=?2")
//    Exam_Application getExamApplicationByStudentnameAndExam(Integer id, Integer id1);
}

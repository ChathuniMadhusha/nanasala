package lk.nanasala.dao;

import lk.nanasala.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface Exam_DefineRepository extends JpaRepository<Exam_Define,Integer> {


    @Query(value = "select e from Exam_Define e where e.exam_name = ?1")
    Exam_Define getExamByExamName(String examname);



    Exam_Define findExamById(Integer id);


    @Query(value = "select e from Exam_Define as e where e.course_id.course_name= ?1 and e.exam_status.id=1")
    List<Exam_Define> getExamAccortoCourse(String course_name);

    @Query(value = "SELECT e from Exam_Define e where e.exam_status.id=1 and e.course_id.id=?1 and e.exam_application_deadline >=?3 and e.id not in (Select ea.exam_id.id from Exam_Application ea where ea.student_id.id=?2 and ea.exam_id.course_id.id=?1)")
    List<Exam_Define> getExamAccortoCourseandBatch(Integer courseid, Integer studentid,LocalDate nowdate);


    //exam application deadline iwra unu exam wla list eka ganna
    @Query(value = "SELECT e FROM Exam_Define e where e.exam_application_deadline<=?1 and e.exam_status.id=1")
    List<Exam_Define> getFineshedExamList(LocalDate appdeadline);

    @Query(value = "select e from Exam_Define e where e.exam_name = ?1")
    Exam_Define findStudentByExam(String examname);





}

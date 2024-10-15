package lk.nanasala.dao;

import lk.nanasala.entity.Acadamic_Year;
import lk.nanasala.entity.Batch_Implementation;
import lk.nanasala.entity.Student;
import lk.nanasala.entity.Student_Batch_Reg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Student_Batch_RegRepository extends JpaRepository<Student_Batch_Reg,Integer> {

@Query(value = "SELECT stureg FROM Student_Batch_Reg stureg where stureg.batch_id.id=?1 and stureg.student_id.id=?2")
    Student_Batch_Reg getStudentBatchRegByBatchNameAndStudentStudentno(Integer batchid, Integer stuid);

    Student_Batch_Reg findStudent_Batch_RegById(Integer id);


@Query(value = "SELECT count(sbr.indx) from Student_Batch_Reg sbr where sbr.batch_id.id=?1")
    Integer getStudent_Batch_RegByIndx(Integer batchid);


//ee ee lamya register wela inna batch eka load kra ganima sadaha
@Query(value = "SELECT stureg FROM Student_Batch_Reg stureg where stureg.student_id.id=?1 and stureg.previous_balance <> 0.00")
   List<Student_Batch_Reg> getStudent_Batch_RegByStudentno(Integer studentno);


    // registration eke next number eka gana
    @Query(value = "SELECT lpad(max(sbr.reg_no)+1, 6, '0') FROM nanasala.registration as sbr;", nativeQuery=true)
    String getNextNumber();


    @Query(value = "select new Student(count(s.id)) from Student s where s.stu_status_id.id =1")
    Student findActiveStudent();


    //all count
    @Query(value = "select new Student_Batch_Reg(count(br.id)) from Student_Batch_Reg br where br.batch_id.id=?1 and br.reg_status_id.id<>2")
    Student_Batch_Reg getAllCountWithoutDelete(Integer bid);

    //delete count
    @Query(value = "select new Student_Batch_Reg(count(br.id)) from Student_Batch_Reg br where br.batch_id.id=?1 and br.reg_status_id.id=2")
    Student_Batch_Reg getDeleteCount(Integer bid);

    //leave count
    @Query(value = "select new Student_Batch_Reg(count(br.id)) from Student_Batch_Reg br where br.batch_id.id=?1 and br.reg_status_id.id=3")
    Student_Batch_Reg getLeaveCount(Integer bid);


    @Query("select b from Student_Batch_Reg b where b.batch_id.id=?1")
    List<Student_Batch_Reg> getByBatch(Integer id);

    //ee ee lamya register wela inna batch eka load kra ganima sadaha, ewagema e batch eka finish wela tyennat oni
    @Query(value = "SELECT stureg FROM Student_Batch_Reg stureg where stureg.student_id.id=?1 and stureg.batch_id.batch_status_id.id=2 and stureg.reg_status_id.id=2")
    List<Student_Batch_Reg> getStudentBatchregandfinishbaches(Integer studentno);

    @Query(value = "select stureg from Student_Batch_Reg stureg where stureg.student_id.id=?1 and stureg.batch_id.course_id.id=?2 and stureg.reg_status_id.id=2")
    Student_Batch_Reg getByStudentCourse(Integer student_id, Integer batch_id);



}

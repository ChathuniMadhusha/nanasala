package lk.nanasala.dao;


import lk.nanasala.entity.Employee;
import lk.nanasala.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student,Integer> {
  // Student getStudentByRegno(String number);


   @Query(value = "select s from Student s where s.guardian_id.id=?1 and s.stu_status_id.id=1")
   List<Student> activeStudentByGuardian(Integer guardianid);

    //check equelity student nic
    @Query(value = "select s from Student s where s.stu_nic = ?1")
    Student findStudentByStu_nic(String stu_nic);


    @Query(value = "select s from Student s where s.studentno = ?1")
    Student findStudentByStudentno(String studentno);

    // Student findStudentByStu_nic(String stu_nic);
    @Query(value = "select s from Student s where s.email = ?1")
    Student findStudentByEmail(String email);

    @Query (value = "select s from Student s where s.mobile_no = ?1")
    Student findStudentByMobile_no(String mobile_no);
   // Student getStudentByMobile_whatsap(String mobile_whatsap);

    //generate next number (native damme sql query ekak nisa) anith eka jpl
    @Query(value = "SELECT max(s.studentno) FROM nanasala.student as s;", nativeQuery = true)
    String getNextNumber();

    @Query(value = "select new Student(s.id, s.studentno, s.calling_name,  s.gender, s.mobile_whatsap, s.stu_status_id,s.added_date) from Student s order by s.id desc ")
    List<Student> findAll();

    @Query(value = "SELECT s FROM Student s where s.id in" +
            " (SELECT sbr.student_id.id FROM Student_Batch_Reg sbr where sbr.batch_id.id=?1)")
    List<Student> getStudentByBatchId(Integer batch_id);


    //student list eka genna ganna filtering query eka
   @Query(value = "select new Student(s.id, s.studentno, s.calling_name) from Student s where s.id in " +
           "(select sbr.student_id.id from Student_Batch_Reg sbr where sbr.batch_id.id=?1 and sbr.reg_status_id.id=1)")
    List<Student> getBySession(Integer bid);



    @Query(value = "select new Student(s.id, s.studentno, s.calling_name) from Student s where s.stu_status_id.id=1")
    List<Student> Slist();


    //Dash bord eke card wlata data ganna
    @Query(value = "select new Student(count(s.id)) from Student s where s.stu_status_id.id =1")
    Student findActiveStudent();

 @Query(value = "select s  from Student s where s.stu_status_id.id =1")
 String[][] getStuList(String sdate, String edate);

 @Query(value = "SELECT year(cp.pay_added_date), date(cp.pay_added_date), count(cp.id), sum(cp.amount) FROM " +
         "nanasala.course_payment as cp where cp.pay_added_date between ?1 and ?2 group " +
         "by year(cp.pay_added_date), date(cp.pay_added_date);", nativeQuery = true)
 String[][] getPaymentReportDaily(String sdate, String edate);


//registration eka finished kattyge list eka genna ganna
 @Query(value = "select new Student(s.id, s.studentno, s.calling_name) from Student s where s.id in " +
         "(select sbr.student_id.id from Student_Batch_Reg sbr where sbr.batch_id.course_id.id=?1 and sbr.reg_status_id.id=4)")
 List<Student> getByRegistration(Integer cid);


 //sirgen aha gana oni
     @Query(value = "select s from Student s where s.id in " +
             "(select ea.student_id.id from Exam_Application ea where ea.exam_id.id=?1)")
    List<Student> getStudentByExamApplicatioId(int eaid);


//    //student reg wela inna class list eka ganna
//    @Query(value = "select new Student(s.id, s.studentno, s.calling_name) from Student s where s.id in " +
//            "(select scr.student_id.id from Stu_Class_Reg scr where scr.class_details_id.id=?1 and scr.class_reg_status_id.id=1)")
//    List<Student> findStudentListByClassReg(String studentno);
}

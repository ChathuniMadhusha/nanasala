package lk.nanasala.dao;

import lk.nanasala.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface Report_Repository extends JpaRepository<Employee,Integer> {

    @Query(value = "SELECT year(cp.pay_added_date), month(cp.pay_added_date), count(cp.id), sum(cp.amount) FROM " +
            "nanasala.course_payment as cp where cp.pay_added_date between ?1 and ?2 group " +
            "by year(cp.pay_added_date), month(cp.pay_added_date);", nativeQuery = true)
    String[][] getPaymentReportMonthly(String sdate, String edate);


    @Query(value = "SELECT year(cp.pay_added_date), week(cp.pay_added_date), count(cp.id), sum(cp.amount) FROM " +
            "nanasala.course_payment as cp where cp.pay_added_date between ?1 and ?2 group " +
            "by year(cp.pay_added_date), week(cp.pay_added_date);", nativeQuery = true)
    String[][] getPaymentReportWeekly(String sdate, String edate);


    @Query(value = "SELECT year(cp.pay_added_date), date(cp.pay_added_date), count(cp.id), sum(cp.amount) FROM " +
            "nanasala.course_payment as cp where cp.pay_added_date between ?1 and ?2 group " +
            "by year(cp.pay_added_date), date(cp.pay_added_date);", nativeQuery = true)
    String[][] getPaymentReportDaily(String sdate, String edate);


    @Query(value = "SELECT year(cp.pay_added_date),count(cp.id), sum(cp.amount) FROM " +
            "nanasala.course_payment as cp where cp.pay_added_date between ?1 and ?2 group " +
            "by year(cp.pay_added_date);", nativeQuery = true)
    String[][] getPaymentReportYear(String sdate, String edate);


    //arrears
//    @Query(value = "select new Student_Batch_Reg (sbr.id, sbr.batch_id,sbr.student_id, sbr.course_fee , sbr.previous_balance)from Student_Batch_Reg sbr where sbr.batch_id.id=?1 and sbr.previous_balance<>0 and sbr.reg_status_id.id=1")
//    List<Student_Batch_Reg> getList(Integer bid);

    @Query(value = "SELECT s.calling_name, cp.amount FROM nanasala.course_payment as cp , nanasala.student as s, nanasala.registration as r where cp.registration_id=r.id and r.student_id = s.id and cp.pay_added_date between ?1 and ?2", nativeQuery = true)
    String[][] getStudentByPayment(String sdate, String edate);

    @Query(value = "SELECT e.empno, e.empcallingname, e.dob FROM nanasala.employee as e where e.gender=?1", nativeQuery = true)
    String[][] getEmployeeByGender(String gender);

    @Query(value = "SELECT e.empno, e.empcallingname, e.mobileno FROM nanasala.employee as e where e.designation_id=?1",nativeQuery = true)
    String[][] getEmployeeByDesignation(String desig);


    @Query(value = "SELECT e.exam_name , ehs.pass_or_fail FROM nanasala.examresult_has_student as ehs, nanasala.exam as e, nanasala.exam_result as er, nanasala.student as s where  er.exam_id=e.id and ehs.exam_result_id=er.id and ehs.student_id=s.id and s.id=?1",nativeQuery = true)
    String[][] getResult(Integer sid);

    @Query(value = "select r.reg_no, b.batch_name, cp.amount,  cp.pay_added_date FROM nanasala.course_payment as cp, nanasala.registration as r, nanasala.batch as b  where cp.registration_id=r.id and r.batch_id=b.id and student_id=?1",nativeQuery = true)
    String[][] getPaymentList(Integer studentid);

    //attendance report
    @Query(value = "SELECT  ahs.present_or_absent, s.calling_name FROM nanasala.attendance as a, nanasala.batch as b ,nanasala.attendance_has_student as ahs, nanasala.student as s where a.batch_id=b.id and ahs.student_id=s.id and a.id=ahs.attendance_id and a.batch_id=?1 and a.date=?2", nativeQuery = true)
    String[][] getAttendance(String batch_id, String date);

    //daily payments summery
    @Query(value = "SELECT sum(c.amount), e.empcallingname FROM nanasala.course_payment as c, nanasala.user as u, nanasala.employee as e where c.added_user_id=u.id and e.id=u.id and c.pay_added_date='2024-07-12' and c.added_user_id=1 group by e.empcallingname;", nativeQuery = true)
    String[][] getDailyPaymentsSum();

    //daily payment table
    @Query(value = "SELECT c.bill_no, s.studentno, s.calling_name, b.batch_name, c.installment_no, c.amount, c.after_balance, e.empcallingname, c.pay_added_date FROM nanasala.course_payment as c, nanasala.user as u, nanasala.employee as e, nanasala.registration as r, nanasala.student as s, nanasala.batch as b where c.added_user_id=u.id and e.id=u.employee_id and c.registration_id=r.id and r.student_id=s.id and r.batch_id=b.id and c.pay_added_date=?1", nativeQuery = true)
    String[][] getDailyPaymentsTbl(String date);

    //custom report table
    @Query(value = "SELECT c.bill_no, s.studentno, s.calling_name, b.batch_name, c.installment_no,  c.amount, c.after_balance, e.empcallingname, c.pay_added_date FROM nanasala.course_payment as c, nanasala.user as u, nanasala.employee as e, nanasala.registration as r, nanasala.batch as b, nanasala.student as s where c.added_user_id=u.id and u.employee_id=e.id and c.registration_id=r.id and r.batch_id=b.id and r.student_id=s.id and c.pay_added_date between ?1 and ?2",nativeQuery = true)
    String[][] getCustomPaymentTbl(String sdate, String edate);


    //arrears
    @Query(value = "SELECT s.studentno, s.calling_name, s.mobile_no, b.batch_name, c.course_fee, r.previous_balance FROM nanasala.registration as r, nanasala.batch as b, nanasala.course as c, nanasala.student as s where r.batch_id=b.id and b.course_id=c.id and r.student_id=s.id and b.course_id=?2 and r.batch_id=?1 and  r.previous_balance<>0",nativeQuery = true)
    String[][] getArrearsPayment(Integer bid, Integer cid);

    //batch count
    @Query(value = "SELECT b.batch_name, count(student_id) FROM nanasala.registration as r, nanasala.course as c, nanasala.batch as b, nanasala.student as s where r.student_id=s.id and r.batch_id=b.id and b.course_id=c.id and c.id=?1 group by b.batch_name", nativeQuery = true)
    String[][] getBatchCount(Integer cid);

    //regcount
    @Query(value = "SELECT s.calling_name, s.studentno, b.batch_name, r.reg_date FROM nanasala.registration as r, nanasala.student as s, nanasala.batch as b where r.student_id= s.id and r.batch_id=b.id and r.batch_id=?1 and r.reg_date=?2", nativeQuery = true)
    String[][] getBatchRegByDate(Integer bid, String date);


    //result ganna
    @Query(value = "SELECT s.studentno, s.calling_name, erhs.result, erhs.pass_or_fail FROM nanasala.examresult_has_student as erhs, nanasala.exam as e, nanasala.exam_result as er, nanasala.student as s where erhs.exam_result_id=er.id and er.exam_id=e.id and erhs.student_id=s.id and e.id=?1", nativeQuery = true)
    String[][] getResultReport(Integer eid);

}

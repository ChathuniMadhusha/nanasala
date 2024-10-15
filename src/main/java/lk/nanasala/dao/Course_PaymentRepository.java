package lk.nanasala.dao;


import lk.nanasala.entity.Batch_Implementation;
import lk.nanasala.entity.Course_Payment;
import lk.nanasala.entity.Student;
import lk.nanasala.entity.Student_Batch_Reg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Course_PaymentRepository extends JpaRepository<Course_Payment,Integer> {

    Course_Payment findCourse_PaymentById(Integer id);


    // course payment wla bill number eke next number eka gana
    @Query(value = "SELECT lpad(max(cp.bill_no)+1, 5, '0') FROM nanasala.course_payment as cp;", nativeQuery = true)
    String getNextNumber();

    @Query(value = "SELECT count(cp.id) from Course_Payment as cp where cp.registration_id.id=?1")
    Integer getInstallment_No(Integer installmentno);

//    @Query(value = "select cp from Course_Payment as cp where cp.pay_added_date like ?1%")
//    String[][] getStudentByPayment(String sdate, String edate);



}

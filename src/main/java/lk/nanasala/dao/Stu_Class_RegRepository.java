package lk.nanasala.dao;

import lk.nanasala.entity.Acadamic_Year;
import lk.nanasala.entity.Course;
import lk.nanasala.entity.Stu_Class_Reg;
import lk.nanasala.entity.Student_Batch_Reg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Stu_Class_RegRepository extends JpaRepository<Stu_Class_Reg,Integer> {


    @Query(value = "select new Stu_Class_Reg (scl.id, scl.student_id, scl.class_details_id, scl.monthly_fee, scl.week_day, scl.reg_date, scl.class_reg_status_id) from Stu_Class_Reg scl order by scl.id desc")
    List<Stu_Class_Reg> findAll();

    @Query(value = "SELECT stuclass FROM Stu_Class_Reg stuclass where stuclass.class_details_id.id=?1 and stuclass.student_id.id=?2")
    Stu_Class_Reg getStudentClassRegByClassNameAndStudentno(Integer classid, Integer stuid);

    @Query(value = "SELECT lpad(max(stuclreg.claa_reg_no)+1, 6, '0') FROM nanasala.class_registration as stuclreg;", nativeQuery=true)
    String getNextNumber();

    @Query(value = "SELECT count(scr.cl_reg_index) from Stu_Class_Reg scr where scr.class_details_id.id=?1")
    Integer getStudent_Class_RegByIndx(Integer classid);

    Stu_Class_Reg findStuClassregById(Integer id);


    //ee ee lamaya regester wela inna class load kraganna
    @Query(value = "SELECT stuclreg FROM Stu_Class_Reg stuclreg where stuclreg.student_id.id=?1")
    List<Stu_Class_Reg> getStudentClassReg(Integer studentno);

}

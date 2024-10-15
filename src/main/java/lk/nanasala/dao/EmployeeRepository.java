package lk.nanasala.dao;

import lk.nanasala.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface EmployeeRepository extends JpaRepository<Employee,Integer> {

    //JPA query liyadddi class name thama use wenne


    Employee getEmployeeByEmpno(String number);
    Employee getEmployeeByEmpnic(String empnic);
    Employee getEmployeeByEmail(String email);

    //next number eka generate kr ganna query eka (native damme sql query ekak nisa) anith eka jpl
    @Query(value = "SELECT lpad(max(e.empno)+1, 6, '0') FROM nanasala.employee as e;", nativeQuery = true)
    String getNextNumber();

    @Query(value = "select new Employee(e.id, e.empno,  e.empcallingname, e.mobileno, e.designation_id, e.emp_status_id) from Employee e order by e.id desc ")
    List<Employee> findAll();

    //user account nathi employee list eka genna gana query eka
    @Query(value = "select new Employee (e.id, e.empno, e.empcallingname) from Employee e where e.id not in(select u.employee_id.id from User u where u.employee_id is not null )")
    List<Employee> getEmployeeListWithoutUser();

   /* @Query(value = "select e from Employee e where e.designation_id.id= 2")
    List<Employee> getEmployeeWithTeacher();*/

    @Query(value = "select e from Employee e where e.designation_id.id = 2 and e.emp_status_id.id = 1 and e.id in (select ehc.employee_id.id from Employee_has_Catogary ehc where ehc.course_catogary_id.id = ?1 )")
    List<Employee> getEmployeesWithTecherAndCAtogary(Integer id);

    @Query(value = "select e from Employee e where e.emp_status_id.id = 1 and e.id in (select ehc.employee_id.id from Employee_has_Catogary ehc where ehc.course_catogary_id.id = ?1) and (e.designation_id.id = 2 or e.designation_id.id = 4)")
    List<Employee> getEmployeeWithTeacherAndDemo(Integer id);

    @Query(value = "select e from Employee e where e.designation_id.id = 2 and e.emp_status_id.id = 1 and e.id in (select ehcs.employee_id.id from Employee_has_Classsubject ehcs where ehcs.class_subject_id.id = ?1 )")
    List<Employee> getEmployeeWithTeacherAndSubject(Integer id);

    @Query(value = "select new Employee(count(e.id)) from Employee e where e.emp_status_id.id=1")
    Employee activeEmpList();


}

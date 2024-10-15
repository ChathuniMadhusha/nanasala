package lk.nanasala.dao;


import lk.nanasala.entity.Course;
import lk.nanasala.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course,Integer> {


      @Query(value = "select c from Course c where c.course_code = ?1")
      Course getCourseByCourse_code(String course_code);

      @Query(value = "select c from Course c where c.course_name = ?1")
      Course getCourseByCoursename(String course_name);


    Course findCourseById(Integer id);

    @Query(value = "select new Course (c.id, c.course_name, c.course_catogary_id, c.course_code, c.cordinator_employee_id, c.course_duration_id,c.course_status_id) from Course c order by c.id desc")
    List<Course> findAll();

    @Query(value = "select c from Course as c where c.course_catogary_id.id= ?1")
    List<Course> getCourseCodeAccoCourCat(Integer id);

    //course catogary ekata adaalwa course name eka ganna
    @Query(value = "select c from Course as c where c.course_catogary_id.id= ?1")
    List<Course> getCoursenameAccortoCat(Integer id);

    //active course list eka ganna
    @Query(value = "select c from Course as c where c.course_status_id.id= 1")
    List<Course> getActiveCourses();


}

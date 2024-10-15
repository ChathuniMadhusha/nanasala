package lk.nanasala.dao;

import lk.nanasala.entity.Came_from;
import lk.nanasala.entity.Course_Module;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Course_ModuleRepository extends JpaRepository<Course_Module,Integer> {

    @Query(value = "SELECT cm FROM Course_Module cm where cm.course_catogary_id.id = ?1")
   List<Course_Module> getCourseModuleAccoCatogary(Integer id);

    @Query("select new Course_Module(cm.id, cm.name, cm.course_catogary_id) from Course_Module cm where cm.id not in " +
            "(select chm.course_module_id.id from Course_Has_Module chm where chm.course_id.id=?1) and cm.course_catogary_id.id=?2")
    List<Course_Module> getListByCourse(Integer cid, Integer ccid);

}

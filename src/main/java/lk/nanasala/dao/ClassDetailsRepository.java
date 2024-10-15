package lk.nanasala.dao;

import lk.nanasala.entity.Came_from;
import lk.nanasala.entity.Class_Details;
import lk.nanasala.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassDetailsRepository extends JpaRepository<Class_Details,Integer> {

    @Query(value = "select cl from Class_Details cl where cl.code = ?1")
    Class_Details getClassByClasscode(String classcode);

    @Query(value = "select cl from Class_Details cl where cl.class_name = ?1")
    Class_Details getClassByClassname(String class_name);

    Class_Details findClass_DetailsById(Integer id);


}

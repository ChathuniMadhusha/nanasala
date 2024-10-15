package lk.nanasala.dao;


import lk.nanasala.entity.Course_Level;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Course_LevelRepository extends JpaRepository<Course_Level,Integer> {

}

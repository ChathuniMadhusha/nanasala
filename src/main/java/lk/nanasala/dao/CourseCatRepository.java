package lk.nanasala.dao;


import lk.nanasala.entity.Course_Cat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseCatRepository extends JpaRepository<Course_Cat,Integer> {
}

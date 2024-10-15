package lk.nanasala.dao;


import lk.nanasala.entity.Course_Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Course_TypeRepository extends JpaRepository<Course_Type,Integer> {
}

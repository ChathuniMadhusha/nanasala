package lk.nanasala.dao;


import lk.nanasala.entity.Course_Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Course_StatusRepository extends JpaRepository<Course_Status,Integer> {
}

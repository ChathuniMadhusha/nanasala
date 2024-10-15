package lk.nanasala.dao;


import lk.nanasala.entity.Student_Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Student_StatusRepository extends JpaRepository<Student_Status,Integer> {
}

package lk.nanasala.dao;

import lk.nanasala.entity.Emp_status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeStatusRepository extends JpaRepository<Emp_status,Integer> {
}

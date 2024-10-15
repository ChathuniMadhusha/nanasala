package lk.nanasala.dao;

import lk.nanasala.entity.Civil_status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
//<Entity name,Integer>
public interface CivilStatusRepository extends JpaRepository<Civil_status,Integer> {
}

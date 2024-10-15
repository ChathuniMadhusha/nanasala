package lk.nanasala.dao;

import lk.nanasala.entity.Hall_Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Hall_StatusRepository extends JpaRepository<Hall_Status,Integer> {
}

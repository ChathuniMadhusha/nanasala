package lk.nanasala.dao;

import lk.nanasala.entity.Batch_Status;
import lk.nanasala.entity.Came_from;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Batch_StatusRepository extends JpaRepository<Batch_Status,Integer> {
}

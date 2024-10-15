package lk.nanasala.dao;

import lk.nanasala.entity.Came_from;
import lk.nanasala.entity.Class_Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassStatusRepository extends JpaRepository<Class_Status,Integer> {
}

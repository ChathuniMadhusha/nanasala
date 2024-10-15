package lk.nanasala.dao;

import lk.nanasala.entity.Came_from;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CameFromRepository extends JpaRepository<Came_from,Integer> {
}

package lk.nanasala.dao;

import lk.nanasala.entity.Came_from;
import lk.nanasala.entity.Hall_Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HallTypeRepository extends JpaRepository<Hall_Type,Integer> {
}

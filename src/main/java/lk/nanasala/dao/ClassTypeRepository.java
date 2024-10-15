package lk.nanasala.dao;

import lk.nanasala.entity.Came_from;
import lk.nanasala.entity.Class_Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassTypeRepository extends JpaRepository<Class_Type,Integer> {
}

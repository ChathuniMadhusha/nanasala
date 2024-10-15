package lk.nanasala.dao;

import lk.nanasala.entity.Acadamic_Year;
import lk.nanasala.entity.Class_Acadamic_Year;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Class_Acadamic_YearRepository extends JpaRepository<Class_Acadamic_Year,Integer> {
}

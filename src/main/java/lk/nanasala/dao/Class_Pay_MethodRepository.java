package lk.nanasala.dao;

import lk.nanasala.entity.Acadamic_Year;
import lk.nanasala.entity.Class_Pay_Method;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Class_Pay_MethodRepository extends JpaRepository<Class_Pay_Method,Integer> {
}

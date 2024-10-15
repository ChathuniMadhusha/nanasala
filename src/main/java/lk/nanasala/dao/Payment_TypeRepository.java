package lk.nanasala.dao;

import lk.nanasala.entity.Acadamic_Year;
import lk.nanasala.entity.Payment_Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Payment_TypeRepository extends JpaRepository<Payment_Type,Integer> {
}

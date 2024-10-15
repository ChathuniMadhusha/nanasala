package lk.nanasala.dao;

import lk.nanasala.entity.Batch_Status;
import lk.nanasala.entity.Week_Day;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Week_DayRepository extends JpaRepository<Week_Day,Integer> {
}

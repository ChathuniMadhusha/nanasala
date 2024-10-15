package lk.nanasala.dao;

import lk.nanasala.entity.Acadamic_Year;
import lk.nanasala.entity.Registration_Status;
import lk.nanasala.entity.Student_Batch_Reg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Registration_StatusRepository extends JpaRepository<Registration_Status,Integer> {






}

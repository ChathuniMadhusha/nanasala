package lk.nanasala.dao;


import lk.nanasala.entity.Guardian;
import lk.nanasala.entity.GuardianStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Guardian_StatusRepository extends JpaRepository<GuardianStatus,Integer> {
}

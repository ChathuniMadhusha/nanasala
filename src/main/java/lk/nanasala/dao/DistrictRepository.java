package lk.nanasala.dao;

import lk.nanasala.entity.District;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.criteria.CriteriaBuilder;

@Repository
public interface DistrictRepository extends JpaRepository<District,Integer> {
}

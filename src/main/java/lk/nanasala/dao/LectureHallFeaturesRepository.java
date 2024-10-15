package lk.nanasala.dao;


import lk.nanasala.entity.LecturHall_Features;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LectureHallFeaturesRepository extends JpaRepository<LecturHall_Features,Integer> {
}

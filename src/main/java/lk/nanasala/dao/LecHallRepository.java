package lk.nanasala.dao;

import lk.nanasala.entity.Course;
import lk.nanasala.entity.LectureHall;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface LecHallRepository extends JpaRepository<LectureHall,Integer> {

    LectureHall findLectureHallById(Integer id);

    @Query(value = "SELECT lh FROM LectureHall lh where lh.id not in " +
            "(SELECT s.lec_hall_id.id FROM Session_Managment s where s.session_date=?1 and " +
            "(trim(s.start_time) between ?2 and ?3 or trim(s.end_time) between ?2 and ?3))")
    List<LectureHall> findLectureHallBySession(LocalDate sessiondate, String starttime, String endtime);

    @Query(value = "select l from LectureHall l where l.code = ?1")
    LectureHall getLecHallByLecHallCode(String code);

}

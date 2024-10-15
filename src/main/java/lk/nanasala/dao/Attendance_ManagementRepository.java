package lk.nanasala.dao;

import lk.nanasala.entity.Acadamic_Year;
import lk.nanasala.entity.Attendance_Management;
import lk.nanasala.entity.Batch_Implementation;
import lk.nanasala.entity.Session_Managment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface Attendance_ManagementRepository extends JpaRepository<Attendance_Management,Integer> {

    Attendance_Management findAttendance_ManagementById(Integer id);

    @Query(value = "select a from Attendance_Management a where a.date = ?1 and a.batch_id.id=?2")
    Attendance_Management getAttendancebydateandbatch(LocalDate date,Integer bid);


//    @Query(value = "select sa from Attendance_Management sa where sa.session_id.id=?1 and sa.date=?2")
//   Attendance_Management getAttendanceBySessionAndDate(Integer sid, LocalDate date);


}

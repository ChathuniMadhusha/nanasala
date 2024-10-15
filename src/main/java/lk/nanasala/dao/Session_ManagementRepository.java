package lk.nanasala.dao;

import lk.nanasala.entity.Acadamic_Year;
import lk.nanasala.entity.Batch_Implementation;
import lk.nanasala.entity.LectureHall;
import lk.nanasala.entity.Session_Managment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface Session_ManagementRepository extends JpaRepository<Session_Managment,Integer> {

    Session_Managment findSession_ManagmentById(Integer id);

    @Query(value = "select s from Session_Managment s where s.name = ?1")
    Session_Managment getSession_ManagmentByName(String name);

    @Query(value = "select s from Session_Managment s where s.session_date = ?1")
    List<Session_Managment> getSession_ManagmentBySession_date(LocalDate date);

    @Query(value = "select s from Session_Managment s where s.batch_id.id = ?1 and s.session_date = ?2 and s.start_time = ?3")
    Session_Managment getSession_ManagmentByAllDetails(Integer Batchid, LocalDate sessiondate, LocalTime starttime);


    @Query(value = "select s from Session_Managment s where s.batch_id.theory_lec_id.id=?1 and " +
            "s.id not in (select am from Attendance_Management am where am.date=?2 ) ")
    List<Session_Managment> listByUserAndCurrentDate(Integer id, LocalDate now);

    //get sessioby given loged user and current date. (not use)
    //given date ekata adalwa log unu userta adala session wlata attenadance watila nathi session tika araganna
//    @Query(value = "select s from Session_Managment s where s.session_status_id.id=1 and (s.batch_id.theory_lec_id.id=?1 or s.batch_id.practical_lec_id.id=?1) and " +
//            "s.id not in(select st.session_id.id from Attendance_Management st where st.date=?2 and (st.session_id.batch_id.theory_lec_id.id=?1 or st.session_id.batch_id.practical_lec_id.id=?1))")
//    List<Session_Managment> getlistbylogeduser(Integer id, LocalDate now);


    //all genna gannwa. contructor dana oni
    @Query(value = "select s from Session_Managment s ")
    List<Session_Managment> list();


    //batch eka select klhma session tika ganna. (current date ekata adalawa add wela nathi wena oni)
//    @Query(value="select s from Session_Managment  s where s.session_status_id.id=1 and s.batch_id.id=?1 and " +
//            " s.id not in(select st.session_id.id from Attendance_Management st where st.date=?2) and (s.session_date<?2 or s.session_date=?2)")
//    List<Session_Managment> getByBatch(Integer batchid,  LocalDate now);


    //adminta
    @Query(value = "select s from Session_Managment s where s.session_status_id.id=1 and s.batch_id.id=?1")
    List<Session_Managment> listByBatch(Integer batchid);
}

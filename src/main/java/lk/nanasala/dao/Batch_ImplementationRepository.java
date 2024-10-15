package lk.nanasala.dao;

import lk.nanasala.entity.Batch_Implementation;
import lk.nanasala.entity.LectureHall;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface Batch_ImplementationRepository extends JpaRepository<Batch_Implementation,Integer> {

    Batch_Implementation findBatch_ImplementationById(Integer id);

    //course catogary eka saha acadamic year ekata adaalawa batch list eka ganna
    @Query(value = "SELECT b FROM Batch_Implementation b where b.course_catogary_id.id = ?1 and b.acadamic_year_id.id = ?2")
    List<Batch_Implementation> findBatchListAccorCoursecatandAcadamicyera(Integer coursecat, Integer acadamicyear);



    @Query(value = "select b from Batch_Implementation b where b.batch_name = ?1")
    Batch_Implementation getBatchImplementatioByBatchName(String batch_name);

    //course ekat adalwa reg deadline panapu nathi batch tika load krganna
    @Query(value = "select b from Batch_Implementation as b where b.course_id.id = ?1 and b.reg_deadline>?2")
    List<Batch_Implementation> getBatch_ImplementationByCourseName(Integer id, LocalDate currentdate);

    //course ekat adalwa batch tika load krganna
    @Query(value = "select b from Batch_Implementation as b where b.course_id.id = ?1")
    List<Batch_Implementation> getBatch_ImplementationByCourseNameOnly(Integer id);

//    //course ekat adalwa batch tika load krganna
//    @Query(value = "select b from Batch_Implementation as b where b.course_id.id = ?1")
//    List<Batch_Implementation> getBatch_ImplementationByCourseName(Integer id);


    @Query(value = "select b from Batch_Implementation b where b.batch_status_id.id=1 and (b.theory_lec_id.id=?1 or b.practical_lec_id.id=?1)")
    List<Batch_Implementation> getlistbylogeduser(Integer id);

//    //batch eka start date ekai end date ekai athra ho samana dws wlta adala batch tika filter krgna
//    @Query("SELECT b FROM Batch_Implementation b WHERE b.start_date <= CURRENT_DATE AND b.end_date >= CURRENT_DATE")
//    List<Batch_Implementation> getlistbystartandenddate();

//    @Query(value = "SELECT b FROM Batch_Implementation b WHERE b.start_date <= :currentDate AND b.end_date >= :currentDate")
//    List<Batch_Implementation> getlistbystartandenddate(@Param("currentDate") LocalDate currentDate);

    @Query("SELECT b FROM Batch_Implementation b WHERE b.start_date <= :currentDate AND b.end_date >= :currentDate and (b.practical_day_id.week_day_no=:weekdayno or b.theory_day_id.week_day_no=:weekdayno)")
    List<Batch_Implementation> getlistbystartandenddate(@Param("currentDate") LocalDate currentDate,@Param("weekdayno") int weekdayno);

    //active batch list eka genna ganna
    @Query(value = "select b from Batch_Implementation b where b.batch_status_id.id=1")
    List<Batch_Implementation> list();


    //active batches kiyak tynwda kiyla genna ganna
    @Query(value = "select new Batch_Implementation(count(b.id)) from Batch_Implementation b where b.batch_status_id.id=1")
    Batch_Implementation activelist();

    //all batches genna ganna, delete eewa hara
    @Query(value = "select b from Batch_Implementation b where b.course_id.id=?1 and b.batch_status_id.id<>3")
    List<Batch_Implementation> getAllBatches(Integer cid);


//    //finish batch list eka genna ganna
//    @Query(value = "select b from Batch_Implementation b where b.batch_status_id.id=5")
//    List<Batch_Implementation> list();

    @Query(value = "select b from Batch_Implementation b where b.end_date <= ?1 and b.batch_status_id.id=1")
    List<Batch_Implementation> getFinishedBatch(LocalDate enddate);



    @Query(value = "select b from Batch_Implementation as b where b.course_id.id = ?1 order by b.end_date asc")
    List<Batch_Implementation> getBatch_ImplementationByCourseName(Integer cid);


    @Query(value = "SELECT MAX(b.end_date) FROM Batch_Implementation as b where b.course_id.id = ?1 ")
    Object[] getMaxEndDate(Integer cid);

    //batch wla start date eka
    @Query(value = "SELECT b.start_date FROM nanasala.batch as b where b.batch_name=?1",nativeQuery = true)
    Object[] getStartDate(String batchname);


}

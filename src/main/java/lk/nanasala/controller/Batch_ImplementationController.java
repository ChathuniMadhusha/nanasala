package lk.nanasala.controller;


import lk.nanasala.dao.*;
import lk.nanasala.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.persistence.criteria.CriteriaBuilder;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.zip.DataFormatException;

@RestController
@RequestMapping("/batch")
public class Batch_ImplementationController {

    @Autowired
    private Batch_ImplementationRepository batchimplementationDao;

    @Autowired
    private Batch_StatusRepository batchstatusDao;

    @Autowired
    private PrivilageController privilageController;

    @Autowired
    private Student_Batch_RegRepository studentBatchRegRepository;

    @Autowired
    private Registration_StatusRepository regstatusdao;

    @Autowired
    private UserRepository userDao;

    @GetMapping(value = "")
    public ModelAndView batchimplementationUI() {
        ModelAndView modelandview = new ModelAndView();
        modelandview.setViewName("Batch_Implementation.html");
        return modelandview;
    }

    @GetMapping(value = "/getbyid", produces = "application/json")
    public Batch_Implementation getQueryById(@RequestParam("id") int id) {
        return batchimplementationDao.findBatch_ImplementationById(id);
    }


    @GetMapping(value = "/batchnameaccortocourse", params = {"id"}, produces = "application/json")
    public List<Batch_Implementation> getBatch_ImplementationByCourseName(@RequestParam("id") Integer id
    ) {
        return batchimplementationDao.getBatch_ImplementationByCourseName(id, LocalDate.now());
    }

    //course ekta adalawa batch tika filter krgna
    @GetMapping(value = "/batchnameaccortoonlycourse", params = {"id"}, produces = "application/json")
    public List<Batch_Implementation> getBatch_ImplementationByCourseNameOnly(@RequestParam("id") Integer id
    ) {
        return batchimplementationDao.getBatch_ImplementationByCourseNameOnly(id);
    }


    @GetMapping(value = "/batchnameaccortocourse",params = {"id","currentdate"},produces = "application/json")
    public List<Batch_Implementation> getBatch_ImplementationByCourseName(@RequestParam("id")Integer id,
                                                                            @RequestParam("currentdate")LocalDate currentdate){
        return batchimplementationDao.getBatch_ImplementationByCourseName(id,currentdate);
    }


    //Dashboard card ekata count eka araganna
    @GetMapping(value = "/activeBatches", produces = "application/json")
    public Batch_Implementation activeBatchList() {
        return batchimplementationDao.activelist();
    }


    @GetMapping(value = "/findall", produces = "application/json")
    public List<Batch_Implementation> batch_implementations() {
        //return batchimplementationDao.findAll();

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPrive = privilageController.getPrivilage(authentication.getName(), "STUDENT_BATCH_IMPLEMENTATION");


        if (userPrive != null && userPrive.get("select")) {
            return batchimplementationDao.findAll(Sort.by(Sort.Direction.DESC, "id"));
        } else {
            List<Batch_Implementation> batch_implementations = new ArrayList<>();
            return batch_implementations();
        }
    }

    @GetMapping(value = "/listbyloggeduser", produces = "application/json")
    public List<Batch_Implementation> batch_implementationslistByLogedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User logedUser = userDao.getUserByUsername(authentication.getName());
        if (logedUser.getEmployee_id() != null) {
            if (logedUser.getEmployee_id().getDesignation_id().getName().equals("Teacher")) {
                return batchimplementationDao.getlistbylogeduser(logedUser.getEmployee_id().getId());
            } else {
                return batchimplementationDao.list();

            }
        } else {
            return batchimplementationDao.list();
        }

    }

//    //start date eka saha end date eka athara tyena batch list eka ganna, attendance mark kirima sadaha
//    @GetMapping(value = "/batchlistaccorsdateandenddate", produces = "application/json")
//    List<Batch_Implementation> batchlist() {
//        return batchimplementationDao.getlistbystartandenddate();
//    }


    @GetMapping(value = "/batchlistaccorsdateandenddate",params = {"date"},produces = "application/json")
    List<Batch_Implementation> batchlist(@RequestParam("date")String date) {
        return batchimplementationDao.getlistbystartandenddate(LocalDate.parse(date), LocalDate.parse(date).getDayOfWeek().getValue());
    }



    //batch list eka genna ganna
    // batch/getBatchList?coursecat=1&acadamicyear=1
    @GetMapping(value = "/getBatchList", produces = "application/json")
    public List<Batch_Implementation> getbatchlist(@RequestParam("coursecat") Integer coursecat,
                                                   @RequestParam("acadamicyear") Integer acadamicyear) {
        return batchimplementationDao.findBatchListAccorCoursecatandAcadamicyera(coursecat, acadamicyear);
    }


    @GetMapping(value = "/getfinishedbatchbycdlist", produces = "application/json")
    public List<Batch_Implementation> getfinishbatchlist() {
        return batchimplementationDao.getFinishedBatch(LocalDate.now());
    }


    //course ekta adala batch tik gnna oni. end date eka order ekta
    @GetMapping(value = "/batchnameaccortocourse", params = {"cid"}, produces = "application/json")
    public List<Batch_Implementation> getBatchNameEnddate(@RequestParam("cid") Integer cid
    ) {
        return batchimplementationDao.getBatch_ImplementationByCourseName(cid);
    }


    @GetMapping(value = "/getmaxenddate", params = {"cid"}, produces = "application/json")
    public Object[] getMaxEndDatee(@RequestParam("cid") Integer cid){
        return batchimplementationDao.getMaxEndDate(cid);
    }


    @GetMapping(value = "/getstartdate", params = {"batchname"}, produces = "application/json")
    public Object[] getsdate(@RequestParam("batchname") String batchname){
        return batchimplementationDao.getStartDate(batchname);
    }


    @DeleteMapping
    public String deleteBatch(@RequestBody Batch_Implementation batchImplementation) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPrive = privilageController.getPrivilage(authentication.getName(), "STUDENT_BATCH_IMPLEMENTATION");

        if (userPrive != null && userPrive.get("delete")) {
            Batch_Implementation extBatchImplementation = batchimplementationDao.getReferenceById(batchImplementation.getId());
            if (extBatchImplementation != null) {
                try {
                    //delete date eka set krnwa
                    //extBatchImplementation.setD(LocalDateTime.now());
                    //status eka deleted wenuwta maruw wenwa
                    extBatchImplementation.setBatch_status_id(batchstatusDao.getReferenceById(3));
                    //save wenwa
                    batchimplementationDao.save(extBatchImplementation);
                    return "0";
                } catch (Exception ex) {
                    return "Delete not Successfully : " + ex.getMessage();
                }
            } else {
                return "Delete not Successfully : This Batch Not Avilable";
            }
        } else {
            return "You can't Delete this Batch: You have not permission";
        }
    }

    @PostMapping
    public String postBatch(@RequestBody Batch_Implementation batchImplementation) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPrive = privilageController.getPrivilage(authentication.getName(), "STUDENT_BATCH_IMPLEMENTATION");


        if (userPrive != null && userPrive.get("insert")) {


            //userdao haraha user table eken mema username ekta adaalwa object ekak gennaganwa
            User logedUser = userDao.getUserByUsername(authentication.getName());


            //dublicate check krnwa
            Batch_Implementation extBatchName = batchimplementationDao.getBatchImplementatioByBatchName(batchImplementation.getBatch_name());
            if (extBatchName != null) {
                return "Cannot add this Batch : This Batch name is exist now";
            }
            try {

                System.out.println(batchImplementation);
                batchImplementation.setReg_date(LocalDate.now());
                batchImplementation.setUser_id(logedUser);

                batchimplementationDao.save(batchImplementation);
                return "0";
            } catch (Exception ex) {
                return "Save not successfully : " + ex.getMessage();

            }
        } else {
            return "You can't add this Batch: You have not permission";
        }
    }

    @PutMapping
    public String putBatchImplement(@RequestBody Batch_Implementation batchImplementation) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPrive = privilageController.getPrivilage(authentication.getName(), "STUDENT_BATCH_IMPLEMENTATION");

        if (userPrive != null && userPrive.get("update")) {
            User logedUser = userDao.getUserByUsername(authentication.getName());
            try {

                batchImplementation.setLast_update_user_id(logedUser);
                batchimplementationDao.save(batchImplementation);

                if (batchImplementation.getBatch_status_id().getName().equals("Finished")) {
                    List<Student_Batch_Reg> student_batch_regList = studentBatchRegRepository.getByBatch(batchImplementation.getId());

                    for (Student_Batch_Reg student_batch_reg : student_batch_regList) {
                        student_batch_reg.setLast_update_date(LocalDate.now());
                        //status eka finish wenuwta maruw wenwa
                        System.out.println(student_batch_reg);
                        student_batch_reg.setReg_status_id(regstatusdao.getReferenceById(2));
                        //save wenwa
                        studentBatchRegRepository.save(student_batch_reg);
                    }

                }

                return "0";
            } catch (Exception ex) {
                return "Update Not Succefully :" + ex.getMessage();
            }
        } else {
            return "You can't update this Batch: You have not permission";
        }

    }


}

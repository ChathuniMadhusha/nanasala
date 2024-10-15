package lk.nanasala.controller;

import lk.nanasala.dao.Acadamic_YearRepository;
import lk.nanasala.dao.Registration_StatusRepository;
import lk.nanasala.dao.Student_Batch_RegRepository;
import lk.nanasala.dao.UserRepository;
import lk.nanasala.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/stubatchreg")
public class Student_Batch_RegController {
    @Autowired
    private Student_Batch_RegRepository studentbatchregistrationDao;

    @Autowired
    private Registration_StatusRepository registrationDao;

    @Autowired
    private UserRepository userDao;

    @Autowired
    private PrivilageController privilageController;

    @GetMapping(value = "/findall", produces = "application/json")
    public List<Student_Batch_Reg> studentBatchRegs() {


        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPrive = privilageController.getPrivilage(authentication.getName(), "STUDENT_BATCH_REGISTRTAION");

        if (userPrive != null && userPrive.get("select")) {
            return studentbatchregistrationDao.findAll(Sort.by(Sort.Direction.DESC, "id"));
        }
        else {
            List<Student_Batch_Reg> studentBatchRegs = new ArrayList<>();
            return studentBatchRegs;
        }

    }

    @GetMapping (value = "/getbyid",produces = "application/json")
    public Student_Batch_Reg getQueryById(@RequestParam("id") int id){
        return studentbatchregistrationDao.findStudent_Batch_RegById(id);}


    @GetMapping(value = "")
    public ModelAndView studentbatchregistrationUI() {
        ModelAndView modelandview = new ModelAndView();
        modelandview.setViewName("Student_Batch_Registration.html");
        return modelandview;
    }



    //register wela inna student ta adalawa eya reg wela inna batches pennana []
    @GetMapping(value = "/batchaccrorstudent",params = "studentno",produces = "application/json")
    public List<Student_Batch_Reg> getStudent_Batch_RegByStudentno(@RequestParam("studentno")Integer studentno){
        return studentbatchregistrationDao.getStudent_Batch_RegByStudentno(studentno);
    }


    //register wela inna student ta adalawa eya reg wela inna batches pennana []
    @GetMapping(value = "/batchaccrorstudentandfinishbaches",params = "studentno",produces = "application/json")
    public List<Student_Batch_Reg> getStudentBatchregandfinishbaches(@RequestParam("studentno")Integer studentno){
        return studentbatchregistrationDao.getStudentBatchregandfinishbaches(studentno);
    }

    //registration eka genna ganna mapping eka []
    @GetMapping(value = "/getbystudentcourse",params = {"sid","cid"},produces = "application/json")
    public Student_Batch_Reg getByStudentCourse(@RequestParam("sid")Integer student_id,
                                                      @RequestParam("cid")Integer course_id){
        return studentbatchregistrationDao.getByStudentCourse(student_id,course_id);
    }




    @DeleteMapping
    public String deleteStuBatch(@RequestBody Student_Batch_Reg student_batch_reg){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPrive =  privilageController.getPrivilage(authentication.getName(), "STUDENT_BATCH_REGISTRTAION");

        if(userPrive != null && userPrive.get("delete")){
            Student_Batch_Reg extStudent_batch_reg = studentbatchregistrationDao.getReferenceById(student_batch_reg.getId());
            if(extStudent_batch_reg != null){
                try{
                    //delete date eka set krnwa
                    extStudent_batch_reg.setDelete_date(LocalDate.now());
                    //status eka deleted wenuwta maruw wenwa
                    extStudent_batch_reg.setReg_status_id(registrationDao.getReferenceById(2));
                    //save wenwa
                    studentbatchregistrationDao.save(extStudent_batch_reg);
                    return "0";
                } catch (Exception ex){
                    return "Delete not Successfully : "+ ex.getMessage();
                }
            }else {
                return "Delete not Successfully : This Registration is Not Avilable";
            }
        } else {
            return "You can't Delete this Registration: You have not permission";
        }
    }

    @PostMapping
    public String postStuBatch(@RequestBody Student_Batch_Reg student_batch_reg){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPrive =  privilageController.getPrivilage(authentication.getName(), "STUDENT_BATCH_REGISTRTAION");


        if(userPrive != null && userPrive.get("insert")){


            //userdao haraha user table eken mema username ekta adaalwa object ekak gennaganwa
            User logedUser = userDao.getUserByUsername(authentication.getName());


            //dublicate check krnwa
            Student_Batch_Reg extStudent_batch_reg = studentbatchregistrationDao.getStudentBatchRegByBatchNameAndStudentStudentno(student_batch_reg.getBatch_id().getId(),student_batch_reg.getStudent_id().getId());
            if(extStudent_batch_reg != null){
                return "Cannot add this Registration : This Registration is exist now";
            }
            try{
                student_batch_reg.setReg_no(studentbatchregistrationDao.getNextNumber());
                System.out.println(student_batch_reg);
                student_batch_reg.setIndx(studentbatchregistrationDao.getStudent_Batch_RegByIndx(student_batch_reg.getBatch_id().getId())+1);
                student_batch_reg.setReg_date(LocalDate.now());
                student_batch_reg.setAdded_user_id(logedUser);
                student_batch_reg.setPrevious_balance(student_batch_reg.getCourse_fee());

                studentbatchregistrationDao.save(student_batch_reg);
                return "0";
            } catch (Exception ex){
                return "Save not successfully : " + ex.getMessage();

            }
        } else {
            return "You can't add this Registration: You have not permission";
        }
    }

    @PutMapping
    public String putStuBatch(@RequestBody Student_Batch_Reg student_batch_reg) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPrive =  privilageController.getPrivilage(authentication.getName(), "STUDENT_BATCH_REGISTRTAION");

        if(userPrive != null && userPrive.get("update")){

            try {

                studentbatchregistrationDao.save(student_batch_reg);
                return "0";
            } catch (Exception ex) {
                return "Update not Successfully : " + ex.getMessage();
            }
        }else {
            return "You can't Update this Registration: You have not permission";
        }
    }






}

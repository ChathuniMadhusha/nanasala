package lk.nanasala.controller;


import lk.nanasala.dao.*;
import lk.nanasala.entity.Course;
import lk.nanasala.entity.Stu_Class_Reg;
import lk.nanasala.entity.Student_Batch_Reg;
import lk.nanasala.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/stuclassreg")
public class Stu_Class_RegController {

    @Autowired
    private Stu_Class_RegRepository stuClassRegDao;

    @Autowired
    private UserRepository userDao;

    @Autowired
    private Class_Reg_StatusRepository classRegStatusDao;

    @Autowired
    private PrivilageController privilageController;


    @GetMapping(value = "/findall", produces = "application/json")
    public List<Stu_Class_Reg> stuClassRegList() {
        //return courseDao.findAll(Sort.by(Sort.Direction.DESC,"id"));

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPrive =  privilageController.getPrivilage(authentication.getName(), "STUDENT_CLASS_REGISTRATION");
        if(userPrive != null && userPrive.get("select")){
            return stuClassRegDao.findAll();
        }else {
            List<Stu_Class_Reg> stuClassRegList = new ArrayList<>();
            return stuClassRegList;
        }
    }

    @GetMapping(value = "")
    public ModelAndView classRegUI() {
        ModelAndView modelandview = new ModelAndView();
        modelandview.setViewName("Student_Class_Registration.html");
        return modelandview;
    }

    @GetMapping (value = "/getbyid",produces = "application/json")
    public Stu_Class_Reg getQueryById(@RequestParam("id") int id){
        return stuClassRegDao.findStuClassregById(id);}

    //register wela inna student ta adalawa eya reg wela inna classes pennana
    @GetMapping(value = "/classaccorstudent",params = "studentno",produces = "application/json")
    public List<Stu_Class_Reg> getStudentClassRegByStudent(@RequestParam("studentno")Integer studentno){
        return stuClassRegDao.getStudentClassReg(studentno);
    }


    @PostMapping
    public String postStuClassReg(@RequestBody Stu_Class_Reg stu_class_reg){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPrive =  privilageController.getPrivilage(authentication.getName(), "STUDENT_CLASS_REGISTRATION");


        if(userPrive != null && userPrive.get("insert")){


            //userdao haraha user table eken mema username ekta adaalwa object ekak gennaganwa
            User logedUser = userDao.getUserByUsername(authentication.getName());


            //dublicate check krnwa
            Stu_Class_Reg extStu_Class_Reg = stuClassRegDao.getStudentClassRegByClassNameAndStudentno(stu_class_reg.getClass_details_id().getId(),stu_class_reg.getStudent_id().getId());
            if(extStu_Class_Reg != null){
                return "Cannot add this Registration : This Registration is exist now";
            }
            try{
                stu_class_reg.setClaa_reg_no(stuClassRegDao.getNextNumber());
                //System.out.println(student_batch_reg);
                stu_class_reg.setCl_reg_index(stuClassRegDao.getStudent_Class_RegByIndx(stu_class_reg.getClass_details_id().getId())+1);
                stu_class_reg.setReg_date(LocalDateTime.now());
                stu_class_reg.setAdded_user_id(logedUser);

                stuClassRegDao.save(stu_class_reg);
                return "0";
            } catch (Exception ex){
                return "Save not successfully : " + ex.getMessage();

            }
        } else {
            return "You can't add this Registration: You have not permission";
        }
    }

    @PutMapping
    public String putStuClassReg(@RequestBody Stu_Class_Reg  stu_class_reg) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPrive =  privilageController.getPrivilage(authentication.getName(), "STUDENT_CLASS_REGISTRATION");

        if(userPrive != null && userPrive.get("update")){

            try {

                stuClassRegDao.save(stu_class_reg);
                return "0";
            } catch (Exception ex) {
                return "Update not Successfully : " + ex.getMessage();
            }
        }else {
            return "You can't Update this Registration: You have not permission";
        }
    }


    @DeleteMapping
    public String deleteStuClassReg(@RequestBody Stu_Class_Reg stu_class_reg){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPrive =  privilageController.getPrivilage(authentication.getName(), "STUDENT_CLASS_REGISTRATION");

        if(userPrive != null && userPrive.get("delete")){
            Stu_Class_Reg extStu_Class_Reg = stuClassRegDao.getReferenceById(stu_class_reg.getId());
            if(extStu_Class_Reg != null){
                try{
                    //delete date eka set krnwa
                    //extStu_Class_Reg.setDelete_date(LocalDate.now());
                    //status eka deleted wenuwta maruw wenwa
                    extStu_Class_Reg.setClass_reg_status_id(classRegStatusDao.getReferenceById(2));
                    //save wenwa
                    stuClassRegDao.save(extStu_Class_Reg);
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

}

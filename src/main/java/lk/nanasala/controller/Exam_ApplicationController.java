package lk.nanasala.controller;

import lk.nanasala.dao.Exam_ApplicationRepository;
import lk.nanasala.dao.Exam_DefineRepository;
import lk.nanasala.dao.Exam_StatusRepository;
import lk.nanasala.dao.UserRepository;
import lk.nanasala.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/exam_application")
public class Exam_ApplicationController {
    @Autowired
    private Exam_ApplicationRepository examapplicationDao;

    @Autowired
    private PrivilageController privilageController;

    @Autowired
    private UserRepository userDao;



    @GetMapping(value = "/findall", produces = "application/json")
    public List<Exam_Application> exam_applications() {return examapplicationDao.findAll();}

    @GetMapping(value = "")
    public ModelAndView examapplicationUI() {
        ModelAndView modelandview = new ModelAndView();
        modelandview.setViewName("Exam_Application.html");
        return modelandview;
    }



    @GetMapping (value = "/getbyid",produces = "application/json")
    public Exam_Application getQueryById(@RequestParam("id") int id){
        return examapplicationDao.findExamApplicationById(id);}



 @PostMapping
 public String postExamApplication(@RequestBody Exam_Application exam_application){

     //check privilege
     Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
     HashMap<String, Boolean> userPrive =  privilageController.getPrivilage(authentication.getName(), "EXAM_APPLICATION");

     if(userPrive != null && userPrive.get("insert")){
         Authentication athenthicatedObjec = SecurityContextHolder.getContext().getAuthentication();
         System.out.println(athenthicatedObjec);

         User logedUser = userDao.getUserByUsername(athenthicatedObjec.getName());

//         //uniqe check krnwa
//         Exam_Application extExamApplication = examapplicationDao.getExamApplicationByStudentnameAndExam(exam_application.getExam_id().getId(),exam_application.getStudent_id().getId());
//         if(extExamApplication != null){
//             return "Cannot add this Exam application : This Exam application is exist now";
//         }


         try {
             exam_application.setExamapplication_added_date(LocalDateTime.now());
             exam_application.setAdded_user(logedUser);



             examapplicationDao.save(exam_application);
           return "0";

             }
         catch (Exception ex){
         return "Save not successfully : " + ex.getMessage();
         }

     } else {
         return "Can't add this Student: You have not permission";
     }
 }


    @PutMapping
    public String putExamApplication(@RequestBody Exam_Application exam_application) {


        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPrive = privilageController.getPrivilage(authentication.getName(), "EXAM_APPLICATION");


        if (userPrive != null && userPrive.get("update")) {
            User logedUser = userDao.getUserByUsername(authentication.getName());
            try {
                examapplicationDao.save(exam_application);
                exam_application.setUpdate_user(logedUser);
                return "0";
            } catch (Exception ex) {
                return "Update Not Succefully :" + ex.getMessage();
            }
        } else {
            return "You can't update this Exam Application: You have not permission";
        }


    }}

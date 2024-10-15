package lk.nanasala.controller;

import lk.nanasala.dao.CameFromRepository;
import lk.nanasala.dao.ClassDetailsRepository;
import lk.nanasala.dao.ClassStatusRepository;
import lk.nanasala.dao.UserRepository;
import lk.nanasala.entity.Came_from;
import lk.nanasala.entity.Class_Details;
import lk.nanasala.entity.Course;
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
@RequestMapping("/class")
public class ClassDetailsController {
    @Autowired
    private ClassDetailsRepository classdetailsDao;

    @Autowired
    private ClassStatusRepository classstatusDao;

    @Autowired
    private PrivilageController privilageController;

    @Autowired
    private UserRepository userDao;

    @GetMapping(value = "/findall", produces = "application/json")
    //public List<Class_Details> class_details() {return classdetailsDao.findAll();}
    public List<Class_Details> class_details() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPrive =  privilageController.getPrivilage(authentication.getName(), "CLASS_IMPLEMENTATION");
        if(userPrive != null && userPrive.get("select")){
            return classdetailsDao.findAll();
        }else {
            List<Class_Details> classlist = new ArrayList<>();
            return classlist;
        }
    }

    @GetMapping (value = "/getbyid",produces = "application/json")
    public Class_Details getQueryById(@RequestParam("id") int id){
        return classdetailsDao.findClass_DetailsById(id);}

    @GetMapping (value = "/byclasscode/{classcode}",produces = "application/json")
    public Class_Details getCodeBycode(@PathVariable("classcode") String classcode) {
      //  System.out.println(classdetailsDao.getClassByClasscode(classcode));
        if (classdetailsDao.getClassByClasscode(classcode) != null)
            return classdetailsDao.getClassByClasscode(classcode);
        else return new Class_Details();
    }


    @GetMapping(value = "")
    public ModelAndView classUI() {
        ModelAndView modelandview = new ModelAndView();
        modelandview.setViewName("Class_Details.html");
        return modelandview;
    }



    @DeleteMapping
    public String deleteClass(@RequestBody Class_Details class_details){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPrive =  privilageController.getPrivilage(authentication.getName(), "CLASS_IMPLEMENTATION");

        if(userPrive != null && userPrive.get("delete")){
            Class_Details extClass = classdetailsDao.getReferenceById(class_details.getId());
            if(extClass != null){
                try{
                    //delete date eka set krnwa
                    extClass.setLast_update_date(LocalDateTime.now());
                    //status eka deleted wenuwta maruw wenwa
                    extClass.setClass_status_id(classstatusDao.getReferenceById(2));
                    //save wenwa
                    classdetailsDao.save(extClass);
                    return "0";
                } catch (Exception ex){
                    return "Delete not Successfully : "+ ex.getMessage();
                }
            }else {
                return "Delete not Successfully : This Class Not Avilable";
            }
        } else {
            return "You can't Delete this Class: You have not permission";
        }
    }

    @PostMapping
    public String postClassDetails(@RequestBody Class_Details classDetails){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPrive =  privilageController.getPrivilage(authentication.getName(), "CLASS_IMPLEMENTATION");


        if(userPrive != null && userPrive.get("insert")){


            //userdao haraha user table eken mema username ekta adaalwa object ekak gennaganwa
            User logedUser = userDao.getUserByUsername(authentication.getName());


            //dublicate check krnwa
            Class_Details extclasscode = classdetailsDao.getClassByClasscode(classDetails.getCode());
            if(extclasscode != null){
                return "Cannot add this Class : This Class code is exist now";
            }
            Class_Details extclassname = classdetailsDao.getClassByClassname(classDetails.getClass_name());
            if(extclassname != null){
                return "Cannot add this Class : This Class name is exist now";
            }
            try{

                //System.out.println(classDetails);
                classDetails.setAdded_date(LocalDateTime.now());
                classDetails.setUser_id(logedUser);
                classdetailsDao.save(classDetails);
                return "0";
            } catch (Exception ex){
                return "Save not successfully : " + ex.getMessage();

            }
        } else {
            return "You can't add this Class: You have not permission";
        }


    }


    @PutMapping
    public String putClassDetails(@RequestBody Class_Details class_details){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPrive =  privilageController.getPrivilage(authentication.getName(), "CLASS_IMPLEMENTATION");

        if(userPrive != null && userPrive.get("update")){
            User logedUser = userDao.getUserByUsername(authentication.getName());
            try{
                classdetailsDao.save(class_details);
                class_details.setLast_update_user_id(logedUser);
                return "0";
            }catch (Exception ex){
                return "Update Not Succefully :" + ex.getMessage();
            }
        }else {
            return "You can't update this Course: You have not permission";
        }

    }




}

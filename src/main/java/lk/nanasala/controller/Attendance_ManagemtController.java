package lk.nanasala.controller;

import lk.nanasala.dao.Attendance_ManagementRepository;
import lk.nanasala.dao.Session_ManagementRepository;
import lk.nanasala.dao.Session_StatusRepository;
import lk.nanasala.dao.UserRepository;
import lk.nanasala.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/attendance")
public class Attendance_ManagemtController {
    @Autowired
    private Attendance_ManagementRepository attendanceManagementDao;

    @Autowired
    private PrivilageController privilageController;

    @Autowired
    private UserRepository userDao;


    @GetMapping(value = "/findall", produces = "application/json")
    public List<Attendance_Management> attendance_managements() {return attendanceManagementDao.findAll();}

    @GetMapping(value = "")
    public ModelAndView attendanceManagementUI() {
        ModelAndView modelandview = new ModelAndView();
        modelandview.setViewName("Attendance_Management.html");
        return modelandview;
    }


    @GetMapping (value = "/getbyid",produces = "application/json")
    public Attendance_Management getQueryById(@RequestParam("id") int id){
        return attendanceManagementDao.findAttendance_ManagementById(id);}



    @PostMapping
    public String postAttendance(@RequestBody Attendance_Management attendance_management){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPrive =  privilageController.getPrivilage(authentication.getName(), "ATTENDANCE_MANAGEMENT");


        if(userPrive != null && userPrive.get("insert")){


            //userdao haraha user table eken mema username ekta adaalwa object ekak gennaganwa
            User logedUser = userDao.getUserByUsername(authentication.getName());

            Attendance_Management extAttendance = attendanceManagementDao.getAttendancebydateandbatch(attendance_management.getDate(),attendance_management.getBatch_id().getId());
            if (extAttendance != null) {
                return "Cannot add this Attendance : This Attendance is exist now";
            }



            try{

                attendance_management.setAdded_date(LocalDateTime.now());
                attendance_management.setUser_id(logedUser);

                System.out.println(attendance_management);
                for(Attendance_Has_Student ahs :attendance_management.getAttendance_has_students()){
                    ahs.setAttendance_id(attendance_management);
                }
                attendanceManagementDao.save(attendance_management);
                return "0";
            } catch (Exception ex){
                return "Save not successfully : " + ex.getMessage();

            }
        } else {
            return "You can't add this Attendance: You have not permission";
        }


    }


    @PutMapping
    public String putAttendance(@RequestBody Attendance_Management attendance_management){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPrive =  privilageController.getPrivilage(authentication.getName(), "ATTENDANCE_MANAGEMENT");

        if(userPrive != null && userPrive.get("update")){
            User logedUser = userDao.getUserByUsername(authentication.getName());
            try{
                attendanceManagementDao.save(attendance_management);
                attendance_management.setLast_update_user_id(logedUser);
                return "0";
            }catch (Exception ex){
                return "Update Not Succefully :" + ex.getMessage();
            }
        }else {
            return "You can't update this Attendance: You have not permission";
        }

    }






}

package lk.nanasala.controller;

import lk.nanasala.dao.Acadamic_YearRepository;
import lk.nanasala.dao.Session_ManagementRepository;
import lk.nanasala.dao.Session_StatusRepository;
import lk.nanasala.dao.UserRepository;
import lk.nanasala.entity.*;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
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
@RequestMapping("/session")
public class Session_ManagementController {
    @Autowired
    private Session_ManagementRepository sessionmanagementDao;

    @Autowired
    private Session_StatusRepository sessionstatusDao;

    @Autowired
    private PrivilageController privilageController;

    @Autowired
    private UserRepository userDao;

    @GetMapping(value = "/findall", produces = "application/json")
    public List<Session_Managment> session_managments() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPrive = privilageController.getPrivilage(authentication.getName(), "SESSION_MANAGEMENT");
        if (userPrive != null && userPrive.get("select")) {
            return sessionmanagementDao.findAll(Sort.by(Sort.Direction.DESC, "id"));
        }
    else {
        List<Session_Managment> session_managments = new ArrayList<>();
        return session_managments();
    }

}


//log unu kenata adaalwa session genn ganna ( not use )
//    @GetMapping(value = "/listbylogeduser", produces = "application/json")
//    public List<Session_Managment> sessionListBySessionLogedUser(){
//
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        User logedUser = userDao.getUserByUsername(authentication.getName());
//
//        if(logedUser.getEmployee_id()!=null){
//            return sessionmanagementDao.getlistbylogeduser(logedUser.getEmployee_id().getId(),LocalDate.now());
//        }else {
//            return sessionmanagementDao.list();
//        }
//    }

    //bat tika select klhmaa attendance dapu nathi session tika genna ganna
//    @GetMapping(value ="/listbybatch", params={"batchid"}, produces = "application/json")
//    public List<Session_Managment> sessionListByBatch(@RequestParam("batchid") Integer batchid){
//
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        User logedUser = userDao.getUserByUsername(authentication.getName());
//
//        if(logedUser.getEmployee_id()!=null){
//            return sessionmanagementDao.getByBatch(batchid, LocalDate.now());
//        }else {
//            return sessionmanagementDao.listByBatch(batchid);
//        }
//    }




@GetMapping(value = "")
    public ModelAndView sessionManagementUI() {
        ModelAndView modelandview = new ModelAndView();
        modelandview.setViewName("Session_Management.html");
        return modelandview;
    }


    @GetMapping (value = "/getbyid",produces = "application/json")
    public Session_Managment getQueryById(@RequestParam("id") int id){
        return sessionmanagementDao.findSession_ManagmentById(id);}


    @GetMapping(value = "/sessionnameaccordate",produces = "application/json")
    public List<Session_Managment> getSession_ManagmentBySession_date(@RequestParam("date")String date){
        return sessionmanagementDao.getSession_ManagmentBySession_date(LocalDate.parse(date));
    }

    @PostMapping
    public String postSession(@RequestBody Session_Managment session_managment){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPrive =  privilageController.getPrivilage(authentication.getName(), "SESSION_MANAGEMENT");


        if(userPrive != null && userPrive.get("insert")){


            //userdao haraha user table eken mema username ekta adaalwa object ekak gennaganwa
            User logedUser = userDao.getUserByUsername(authentication.getName());


            //dublicate check krnwa
            Session_Managment extSessionName = sessionmanagementDao.getSession_ManagmentByName(session_managment.getName());
            if(extSessionName != null){
                return "Cannot add this Session : This Session is exist now";
            }
            Session_Managment extSessionDetails = sessionmanagementDao.getSession_ManagmentByAllDetails(session_managment.getBatch_id().getId(),session_managment.getSession_date(),session_managment.getStart_time());
            if(extSessionDetails != null){
                return "Cannot add this Session : This Session Details is exist now";
            }

            try{
                session_managment.setSession_added_date(LocalDateTime.now());
                session_managment.setUser_id(logedUser);
                sessionmanagementDao.save(session_managment);
                return "0";
            } catch (Exception ex){
                return "Save not successfully : " + ex.getMessage();

            }
        } else {
            return "You can't add this Session: You have not permission";
        }
    }

    @PutMapping
    public String putSession(@RequestBody Session_Managment session_managment){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPrive =  privilageController.getPrivilage(authentication.getName(), "SESSION_MANAGEMENT");

        if(userPrive != null && userPrive.get("update")){
            User logedUser = userDao.getUserByUsername(authentication.getName());
            try{
                sessionmanagementDao.save(session_managment);
                session_managment.setUpdate_user_id(logedUser);
                return "0";
            }catch (Exception ex){
                return "Update Not Succefully :" + ex.getMessage();
            }
        }else {
            return "You can't update this Session: You have not permission";
        }

    }

    @DeleteMapping
    public String deleteSession(@RequestBody Session_Managment session_managment){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPrive =  privilageController.getPrivilage(authentication.getName(), "SESSION_MANAGEMENT");

        if(userPrive != null && userPrive.get("delete")){
            Session_Managment extSessionManagement = sessionmanagementDao.getReferenceById(session_managment.getId());
            if(extSessionManagement != null){
                try{
                    //delete date eka set krnwa
                    //extBatchImplementation.setD(LocalDateTime.now());
                    //status eka deleted wenuwta maruw wenwa
                    extSessionManagement.setSession_status_id(sessionstatusDao.getReferenceById(3));
                    //save wenwa
                    sessionmanagementDao.save(extSessionManagement);
                    return "0";
                } catch (Exception ex){
                    return "Delete not Successfully : "+ ex.getMessage();
                }
            }else {
                return "Delete not Successfully : This Session Not Avilable";
            }
        } else {
            return "You can't Delete this Session: You have not permission";
        }
    }



}

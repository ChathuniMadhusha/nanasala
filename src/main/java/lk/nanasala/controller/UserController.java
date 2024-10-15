package lk.nanasala.controller;


import lk.nanasala.dao.EmployeeRepository;
import lk.nanasala.dao.UserRepository;
import lk.nanasala.entity.Employee;
import lk.nanasala.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder; (comment kla)
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userDao;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private PrivilageController privilageController;

    @GetMapping(value = "/findall", produces = "application/json")
    public List<User> listUser() {

        //return employeeDao.findAll(Sort.by(Sort.Direction.DESC,"id"));

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPrive =  privilageController.getPrivilage(authentication.getName(), "MANAGE_USER_DETAILS");


        //security configuration eke thibba log wechcha userge name eka gatta
        if(userPrive != null && userPrive.get("select")){
           // return userDao.findAll(authentication.getName());

            return userDao.findAll();
        }else {
            List<User> userList = new ArrayList<>();
            return userList;
        }
    }

    @GetMapping(value = "")
    public ModelAndView userUI() {
        ModelAndView modelandview = new ModelAndView();
        modelandview.setViewName("User_Details.html");
        return modelandview;
    }

    @GetMapping(value = "/getbyid", produces = "application/json")
    public User getByQueryId(@RequestParam("id") int id) {
        return userDao.getReferenceById(id);
    }




    @PostMapping
    public String postUser(@RequestBody User user) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPrive =  privilageController.getPrivilage(authentication.getName(), "MANAGE_USER_DETAILS");

        if(userPrive != null && userPrive.get("insert")){
            System.out.println(user);
            User extUserName = userDao.getUserByUsername(user.getUsername());
            if (extUserName != null) {
                return "Cannot Add this User";
            }
            User extUserEmail = userDao.getUserByEmail(user.getEmail());
            if (extUserEmail != null) {
                return "Cannot Add this User";
            }
            try {
                //System.out.println(passwordEncoder.encode(user.getPassword()));
                user.setPassword(passwordEncoder.encode(user.getPassword()));
                user.setAdded_date(LocalDateTime.now());
                user.setPhoto_name("user.jpg");
                user.setUser_photo_path("/assets/img/user_photo/");
                userDao.save(user);
                return "0";
            } catch (Exception ex) {
                return "Save not Successfully " + ex.getMessage();
            }
        }else {
            return "You can't add this User: You have not permission";
        }
    }

    @DeleteMapping
    public String deleteUser(@RequestBody User user) {


        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPrive =  privilageController.getPrivilage(authentication.getName(), "MANAGE_USER_DETAILS");

        //managerta managerge account eka diactivate krna bari wenna
        if(userPrive != null && userPrive.get("delete")){
            if(user.getUsername()==authentication.getName()){
                return "user cannnot be delete";
            }
            //check User exist
            User extUser = userDao.getReferenceById(user.getId());
            if (extUser != null) {
                try {
                    extUser.setDelete_date(LocalDate.now());
                    extUser.setLast_update_date(LocalDateTime.now());
                    //status eka wenas krnna
                    extUser.setStatus(false);
                    userDao.save(extUser);
                    return "0";
                } catch (Exception ex) {
                    return "Delete Not Succesfully : " + ex.getMessage();
                }
            } else {
                return "Delete not Successfully ";
            }
        }else {
            return "You can't delete this User: You have not permission";
        }
    }



    @PutMapping
    public String putUser(@RequestBody User user){


        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPrive =  privilageController.getPrivilage(authentication.getName(), "MANAGE_USER_DETAILS");


        if(userPrive != null && userPrive.get("update")){

            User extUser = userDao.getReferenceById(user.getId());

            if(extUser!=null){
                try{
                    Authentication athenthicatedObjec = SecurityContextHolder.getContext().getAuthentication();
                    User logeduser = userDao.getUserByUsername(athenthicatedObjec.getName());

                    if(logeduser.getId().equals(extUser.getId()) && !user.getStatus()){
                        user.setStatus(true);
                        userDao.save(user);
                        return "0";
                    }
                    userDao.save(user);
                    return "0";
                }catch (Exception ex){
                    return "Update Not Succefully :" + ex.getMessage();
                }
            }
            else {
                return "You can't update this User: user does not exist :";
            }
        }else {
            return "You can't update this User: You have not permission";
        }

    }

}
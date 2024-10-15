package lk.nanasala.controller;

import lk.nanasala.dao.CameFromRepository;
import lk.nanasala.dao.Hall_StatusRepository;
import lk.nanasala.dao.LecHallRepository;
import lk.nanasala.dao.UserRepository;
import lk.nanasala.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/lecturehall")
public class LectureHallController {

    @Autowired
    private LecHallRepository lecturehallDao;

    @Autowired
    private PrivilageController privilageController;

    @Autowired
    private UserRepository userDao;

    @Autowired
    private Hall_StatusRepository hallstatusDao;

//    @GetMapping(value = "/findall", produces = "application/json")
//    public List<LectureHall> lectureHalls() {return lecturehallDao.findAll();}

    @GetMapping(value = "")
    public ModelAndView lecturehallUI() {
        ModelAndView modelandview = new ModelAndView();
        modelandview.setViewName("LectureHallManagement.html");
        return modelandview;
    }


    @GetMapping(value = "/findall", produces = "application/json")
    public List<LectureHall> lectureHalls() {
        //return lecturehallDao.findAll();

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPrive =  privilageController.getPrivilage(authentication.getName(), "LECTURE_HALL_MANAGEMENT");
        if(userPrive != null && userPrive.get("select")){
            return lecturehallDao.findAll(Sort.by(Sort.Direction.DESC,"id"));
        }else {
            List<LectureHall> lectureHalls = new ArrayList<>();
            return lectureHalls();
        }
    }


    @GetMapping (value = "/getbyid",produces = "application/json")
    public LectureHall getQueryById(@RequestParam("id") int id){return lecturehallDao.findLectureHallById(id);}

    // lecturehall/getByLecturehall?sessiondate=2023-04-11&starttime=08:00:00&endtime=10:00:00
    @GetMapping(value = "/getByLecturehall",produces = "application/json")
    public List<LectureHall> getBylecturehall(@RequestParam("sessiondate") String sessiondate,
                                        @RequestParam("starttime") String starttime,
                                        @RequestParam("endtime") String endtime){
        return lecturehallDao.findLectureHallBySession(LocalDate.parse(sessiondate),starttime,endtime);}


    @PostMapping
    @Transactional // table dekak use wena nisa
    public String postLecturehall(@RequestBody LectureHall lectureHall){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPrive =  privilageController.getPrivilage(authentication.getName(), "LECTURE_HALL_MANAGEMENT");


        if(userPrive != null && userPrive.get("insert")){


            //userdao haraha user table eken mema username ekta adaalwa object ekak gennaganwa
            User logedUser = userDao.getUserByUsername(authentication.getName());


//            //dublicate check krnwa
//
            LectureHall extLecHall = lecturehallDao.getLecHallByLecHallCode(lectureHall.getCode());
            if(extLecHall != null){
                return "Cannot add this Lec hall : This Lecture hall code is exist now";
            }
            try{
                System.out.println(lectureHall);
                lectureHall.setAdded_date(LocalDateTime.now());
                lectureHall.setUser_id(logedUser);

                for(LecHall_Has_Feature lecHall_has_feature : lectureHall.getLecHall_has_featureList()){
                    lecHall_has_feature.setLec_hall_id(lectureHall);
                }
                lecturehallDao.save(lectureHall);

                return "0";
            } catch (Exception ex){
                return "Save not successfully : " + ex.getMessage();

            }
        } else {
            return "You can't add this Payment: You have not permission";
        }
    }

    @PutMapping
    public String putCourse(@RequestBody LectureHall lectureHall){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPrive =  privilageController.getPrivilage(authentication.getName(), "LECTURE_HALL_MANAGEMENT");

        if(userPrive != null && userPrive.get("update")){
            User logedUser = userDao.getUserByUsername(authentication.getName());
            try{
                lectureHall.setLast_update_user_id(logedUser);
                for(LecHall_Has_Feature lecHall_has_feature : lectureHall.getLecHall_has_featureList()){
                    lecHall_has_feature.setLec_hall_id(lectureHall);
                }
                lecturehallDao.save(lectureHall);
                return "0";
            }catch (Exception ex){
                return "Update Not Succefully :" + ex.getMessage();
            }
        }else {
            return "You can't update this Lecture Hall: You have not permission";
        }

    }


    @DeleteMapping
    public String deleteLecturehall(@RequestBody LectureHall lectureHall){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPrive =  privilageController.getPrivilage(authentication.getName(), "LECTURE_HALL_MANAGEMENT");

        if(userPrive != null && userPrive.get("delete")){
            LectureHall extLecturehall = lecturehallDao.getReferenceById(lectureHall.getId());
            if(extLecturehall != null){
                try{
                    //delete date eka set krnwa
                    extLecturehall.setDelete_date(LocalDateTime.now());
                    //status eka deleted wenuwta maruw wenwa
                    extLecturehall.setLec_hall_status_id(hallstatusDao.getReferenceById(2));
                    //save wenwa
                    lecturehallDao.save(extLecturehall);
                    return "0";
                } catch (Exception ex){
                    return "Delete not Successfully : "+ ex.getMessage();
                }
            }else {
                return "Delete not Successfully : This Lecturehall Not Avilable";
            }
        } else {
            return "You can't Delete this Lecturehall: You have not permission";
        }
    }






}

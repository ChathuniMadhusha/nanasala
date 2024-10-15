package lk.nanasala.controller;


import lk.nanasala.dao.*;
import lk.nanasala.entity.Batch_Implementation;
import lk.nanasala.entity.Course;
import lk.nanasala.entity.Employee;
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
@RequestMapping("/course")
public class CourseController {

    @Autowired
    private CourseRepository courseDao;

    @Autowired
    private UserRepository userDao;

    @Autowired
    private Course_StatusRepository coursestatusDao;

    @Autowired
    private PrivilageController privilageController;


    @GetMapping(value = "/coursecodeaccorcoursecat",params = "id",produces = "application/json")
    public List<Course> getCourseCodeAccoCourCat(@RequestParam("id")int id){
        return courseDao.getCourseCodeAccoCourCat(id);
    }

    //course catogary ekata adalwa course name eka ganna
    @GetMapping(value = "/coursenameaccortocat",params = "id",produces = "application/json")
    public List<Course> getCoursenameAccortoCat(@RequestParam("id")int id){
        return courseDao.getCoursenameAccortoCat(id);
    }

    @GetMapping(value = "/findall", produces = "application/json")
    public List<Course> listCourse() {
        //return courseDao.findAll(Sort.by(Sort.Direction.DESC,"id"));

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPrive =  privilageController.getPrivilage(authentication.getName(), "COURSE_IMPLEMENTATION");
        if(userPrive != null && userPrive.get("select")){
            return courseDao.findAll();
        }else {
            List<Course> courseList = new ArrayList<>();
            return courseList;
        }
    }

    @GetMapping(value = "")
    public ModelAndView courseUI() {
        ModelAndView modelandview = new ModelAndView();
        modelandview.setViewName("Course_Details.html");
        return modelandview;
    }

    @GetMapping (value = "/getbyid",produces = "application/json")
    public Course getQueryById(@RequestParam("id") int id){return courseDao.findCourseById(id);}

    @GetMapping (value = "/bycode/{code}",produces = "application/json")
    public Course getCodeBycode(@PathVariable("code") String code) {
        System.out.println(courseDao.getCourseByCourse_code(code));
        if (courseDao.getCourseByCourse_code(code) != null)
            return courseDao.getCourseByCourse_code(code);
        else return new Course();
    }


    @GetMapping(value = "/activecourses", produces = "application/json")
    public List<Course> getCourse() {
        return courseDao.getActiveCourses();
    }


    @DeleteMapping
    public String deleteCourse(@RequestBody Course course){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPrive =  privilageController.getPrivilage(authentication.getName(), "COURSE_IMPLEMENTATION");

        if(userPrive != null && userPrive.get("delete")){
            Course extCourse = courseDao.getReferenceById(course.getId());
            if(extCourse != null){
                try{
                    //delete date eka set krnwa
                    extCourse.setDelete_date(LocalDateTime.now());
                    //status eka deleted wenuwta maruw wenwa
                    extCourse.setCourse_status_id(coursestatusDao.getReferenceById(2));
                    //save wenwa
                    courseDao.save(extCourse);
                    return "0";
                } catch (Exception ex){
                    return "Delete not Successfully : "+ ex.getMessage();
                }
            }else {
                return "Delete not Successfully : This Course Not Avilable";
            }
        } else {
            return "You can't Delete this User: You have not permission";
        }
    }


    @PostMapping
    public String postCourse(@RequestBody Course course){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPrive =  privilageController.getPrivilage(authentication.getName(), "COURSE_IMPLEMENTATION");


        if(userPrive != null && userPrive.get("insert")){


            //userdao haraha user table eken mema username ekta adaalwa object ekak gennaganwa
            User logedUser = userDao.getUserByUsername(authentication.getName());


            //dublicate check krnwa
            Course extCourseCode = courseDao.getCourseByCourse_code(course.getCourse_code());
            if(extCourseCode != null){
                return "Cannot add this Course : This Course code is exist now";
            }
            Course extCourseName = courseDao.getCourseByCoursename(course.getCourse_name());
            if(extCourseName != null){
                return "Cannot add this Course : This Course name is exist now";
            }
            try{

                System.out.println(course);
                course.setAdded_date(LocalDate.now());
                course.setAdded_user_id(logedUser);

                courseDao.save(course);
                return "0";
            } catch (Exception ex){
                return "Save not successfully : " + ex.getMessage();

            }
        } else {
            return "You can't add this User: You have not permission";
        }


    }



    @PutMapping
    public String putCourse(@RequestBody Course course){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPrive =  privilageController.getPrivilage(authentication.getName(), "COURSE_IMPLEMENTATION");

        if(userPrive != null && userPrive.get("update")){
            User logedUser = userDao.getUserByUsername(authentication.getName());
            try{

               
                courseDao.save(course);
                course.setLast_update_user_id(logedUser);
                return "0";
            }catch (Exception ex){
                return "Update Not Succefully :" + ex.getMessage();
            }
        }else {
            return "You can't update this Course: You have not permission";
        }

    }

}

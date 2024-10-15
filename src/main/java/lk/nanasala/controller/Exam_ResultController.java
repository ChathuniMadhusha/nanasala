package lk.nanasala.controller;

import lk.nanasala.dao.Exam_ApplicationRepository;
import lk.nanasala.dao.Exam_ResultRepository;
import lk.nanasala.dao.UserRepository;
import lk.nanasala.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/exam_result")
public class Exam_ResultController {
    @Autowired
    private Exam_ApplicationRepository examapplicationDao;

    @Autowired
    private Exam_ResultRepository exaResultDao;

    @Autowired
    private PrivilageController privilageController;

    @Autowired
    private UserRepository userDao;


    @GetMapping(value = "/findall", produces = "application/json")
    public List<Exam_Result> exam_results() {
        return exaResultDao.findAll();
    }

    @GetMapping (value = "/getbyid",produces = "application/json")
    public Exam_Result getQueryById(@RequestParam("id") int id){
        return exaResultDao.findExam_ResultByid(id);}

//    @GetMapping (value = "/byExam/{examname}",produces = "application/json")
//    public ExamResult getexambyexamname(@PathVariable("examname") String examname) {
//        //  System.out.println(classdetailsDao.getClassByClasscode(classcode));
//        if (exaResultDao.findStudentByExam(examname) != null)
//            return exaResultDao.findStudentByExam(examname);
//        else return new ExamResult();
//    }





    @GetMapping(value = "")
    public ModelAndView examresultUI() {
        ModelAndView modelandview = new ModelAndView();
        modelandview.setViewName("Exam_Result.html");
        return modelandview;
    }


    @PostMapping
    public String postExamResult(@RequestBody Exam_Result exam_result) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPrive = privilageController.getPrivilage(authentication.getName(), "EXAM_RESULT");

        if (userPrive != null && userPrive.get("insert")) {


            //userdao haraha user table eken mema username ekta adaalwa object ekak gennaganwa
            User logedUser = userDao.getUserByUsername(authentication.getName());


            //dublicate check krnwa
            Exam_Result extExamResult = exaResultDao.getExamResultByCoursenameAndExamName(exam_result.getExam_id().getCourse_id().getId(), exam_result.getExam_id().getId());
            if (extExamResult != null) {
                return "Cannot add this Exam result : This Exam result is exist now by given course name and given exam name";
            }

            try {

                exam_result.setExam_result_added_date(LocalDateTime.now());
                exam_result.setExam_reult_added_user(logedUser);

                //System.out.println(attendance_management);
                for (Examresult_has_student ehs : exam_result.getExamresult_has_students()) {
                    ehs.setExam_result_id(exam_result);
                }
                exaResultDao.save(exam_result);
                return "0";
            } catch (Exception ex) {
                return "Save not successfully : " + ex.getMessage();

            }
        } else {
            return "You can't add this Attendance: You have not permission";
        }

    }



@PutMapping
public String putExamResult(@RequestBody Exam_Result exam_result){

    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    HashMap<String, Boolean> userPrive =  privilageController.getPrivilage(authentication.getName(), "EXAM_RESULT");

    if(userPrive != null && userPrive.get("update")){
        User logedUser = userDao.getUserByUsername(authentication.getName());
        try{
            exaResultDao.save(exam_result);
            exam_result.setExam_result_update_user(logedUser);
            return "0";
        }catch (Exception ex){
            return "Update Not Succefully :" + ex.getMessage();
        }
    }else {
        return "You can't update this Exam result: You have not permission";
    }

}

}

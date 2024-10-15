package lk.nanasala.controller;

import lk.nanasala.dao.Acadamic_YearRepository;
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
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/exam")
public class Exam_DefineController {
    @Autowired
    private Exam_DefineRepository examdefineDao;

    @Autowired
    private PrivilageController privilageController;

    @Autowired
    private UserRepository userDao;

    @Autowired
    private Exam_StatusRepository examstatusDao;

    @GetMapping(value = "/findall", produces = "application/json")
    public List<Exam_Define> examDefines() {return examdefineDao.findAll();}

    @GetMapping(value = "")
    public ModelAndView examUI() {
        ModelAndView modelandview = new ModelAndView();
        modelandview.setViewName("Exam_Define.html");
        return modelandview;
    }

    @GetMapping (value = "/getbyid",produces = "application/json")
    public Exam_Define getQueryById(@RequestParam("id") int id){return examdefineDao.findExamById(id);}



    //course name ekata adalwa exam list eka ganna
    @GetMapping(value = "/examlistaccorcourse",params = "course_name",produces = "application/json")
    public List<Exam_Define> getExamAccorCourse(@RequestParam("course_name")String course_name){
        return examdefineDao.getExamAccortoCourse(course_name);
    }


    @GetMapping(value = "/examlistaccorcourseandbatch",params = {"courseid","studentid"}, produces = "application/json")
    public List<Exam_Define> getExamAccorCourseBatch(@RequestParam("courseid")Integer courseid,
                                                        @RequestParam("studentid")Integer studentid
                                                     ){
      return examdefineDao.getExamAccortoCourseandBatch(courseid,studentid, LocalDate.now());
    }


    @GetMapping(value = "/getfinishedexamlist", produces = "application/json")
    public List<Exam_Define> getfinishexamlist() {
        return examdefineDao.getFineshedExamList(LocalDate.now());
    }



    @GetMapping (value = "/byExam/{examname}",produces = "application/json")
    public Exam_Define getexambyexamname(@PathVariable("examname") String examname) {
        //  System.out.println(classdetailsDao.getClassByClasscode(classcode));
        if (examdefineDao.findStudentByExam(examname) != null)
            return examdefineDao.findStudentByExam(examname);
        else return new Exam_Define();
    }

    @PostMapping
    @Transactional // table dekak use wena nisa
    public String postExamDefine(@RequestBody Exam_Define exam_define){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPrive =  privilageController.getPrivilage(authentication.getName(), "EXAM_DEFINE");


        if(userPrive != null && userPrive.get("insert")){


            //userdao haraha user table eken mema username ekta adaalwa object ekak gennaganwa
            User logedUser = userDao.getUserByUsername(authentication.getName());


//            //dublicate check krnwa
            Exam_Define extExamDefine = examdefineDao.getExamByExamName(exam_define.getExam_name());
            if (extExamDefine != null){
                return "Cannot add this Exam: This Exam is Exist now";
            }
            try{
                System.out.println(exam_define);
                exam_define.setExam_added_date(LocalDateTime.now());
                exam_define.setAdded_user_id(logedUser);

                for(Exam_has_Examtype exam_has_examtype : exam_define.getExam_has_examtypes()){
                    exam_has_examtype.setExam_id(exam_define);
                }
                System.out.println(exam_define.getExam_name());
                examdefineDao.save(exam_define);

                return "0";
            } catch (Exception ex){
                return "Save not successfully : " + ex.getMessage();

            }
        } else {
            return "You can't add this Exam: You have not permission";
        }
    }


    @PutMapping
    public String putExam(@RequestBody Exam_Define exam_define){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPrive =  privilageController.getPrivilage(authentication.getName(), "EXAM_DEFINE");

        if(userPrive != null && userPrive.get("update")){
            User logedUser = userDao.getUserByUsername(authentication.getName());
            try{
                //update userwa genna gana
                for(Exam_has_Examtype exam_has_examtype : exam_define.getExam_has_examtypes()){
                    exam_has_examtype.setExam_id(exam_define);
                }
                examdefineDao.save(exam_define);
                return "0";
            }catch (Exception ex){
                return "Update Not Succefully :" + ex.getMessage();
            }
        }else {
            return "You can't update this Exam: You have not permission";
        }

    }


    @DeleteMapping
    public String deleteExam(@RequestBody Exam_Define exam_define){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPrive =  privilageController.getPrivilage(authentication.getName(), "EXAM_DEFINE");

        if(userPrive != null && userPrive.get("delete")){
            Exam_Define extExamDefine = examdefineDao.getReferenceById(exam_define.getId());
            if(extExamDefine != null){
                try{
                    //delete date eka set krnwa
                    //extExamDefine.set(LocalDateTime.now());
                    //status eka deleted wenuwta maruw wenwa
                    extExamDefine.setExam_status(examstatusDao.getReferenceById(2));
                    //save wenwa
                    examdefineDao.save(extExamDefine);
                    return "0";
                } catch (Exception ex){
                    return "Delete not Successfully : "+ ex.getMessage();
                }
            }else {
                return "Delete not Successfully : This Exam Not Avilable";
            }
        } else {
            return "You can't Delete this Exam: You have not permission";
        }
    }


}

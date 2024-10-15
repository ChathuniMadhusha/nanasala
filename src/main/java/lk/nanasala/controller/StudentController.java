package lk.nanasala.controller;

import lk.nanasala.dao.*;
import lk.nanasala.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.kafka.KafkaProperties;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.persistence.criteria.CriteriaBuilder;
import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController //awashya services denna
@RequestMapping("/student")
public class StudentController {

    @Autowired
    private StudentRepository studentDao;

    @Autowired
    private UserRepository userDao;

    @Autowired
    private Student_StatusRepository student_statusDao;

    @Autowired
    private Guardian_StatusRepository guardianstatusDao ;

    @Autowired
    private GuardianRepository guardianDao;



    @Autowired
    private PrivilageController privilageController;


    @GetMapping(value = "/findall", produces = "application/json")
    public List<Student> listStudent() {
        //return employeeDao.findAll(Sort.by(Sort.Direction.DESC,"id"));


        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPrive =  privilageController.getPrivilage(authentication.getName(), "STUDENT_DETAILS");

        if(userPrive != null && userPrive.get("select")){
            return studentDao.findAll();
        }else {
            List<Student> studentList = new ArrayList<>();
            return studentList;
        }
    }

    //Dashboard card ekata count eka araganna
    @GetMapping(value = "/activestudent", produces = "application/json")
    public Student activeList() {
        return studentDao.findActiveStudent();
    }


    @GetMapping(value = "/list", produces = "application/json")
    public List<Student> studentList() {

        return studentDao.Slist();
    }


//request maping for get student list (Query param) [student/bysession?bid=1]
    @GetMapping(value = "/bysession", params={"bid"}, produces="application/json")
    public List<Student> studentListBySession(@RequestParam ("bid") Integer bid){

        return studentDao.getBySession(bid);
    }

    //course eka finish unu ayage list eka ganna
    @GetMapping(value = "/bycourseregistration", params={"cid"}, produces="application/json")
    public List<Student> studentListByCourseReg(@RequestParam ("cid") Integer cid){

        return studentDao.getByRegistration(cid);
    }



//    //request maping for get student list by class registration [student/getClassRegAccoStudent?studentno=1]
//    @GetMapping (value = "/getClassRegAccoStudent",params = {"studentno"} ,produces = "application/json")
//    public List<Student> findStudentListByClassReg(@RequestParam("studentno") String studentno){
//        return studentDao.findStudentListByClassReg(studentno);}



    @GetMapping(value = "")
    public ModelAndView studentUI() {
        ModelAndView modelandview = new ModelAndView();
        modelandview.setViewName("Student_Details.html");
        return modelandview;
    }


    //get output using path varibale
    //student/getbyid/1
    @GetMapping (value = "/getbyid/{id}",produces="application/json")
    public Student getByPathId(@PathVariable("id") int id){return studentDao.getReferenceById(id);}

    //get output using query path variable
    //student/getbyid?id=1
    @GetMapping (value = "/getbyid",produces = "application/json")
    public Student getByQueryId(@RequestParam("id") int id){return studentDao.getReferenceById(id);}

    @GetMapping (value = "/getbystudentno",produces = "application/json")
    public Student getByStudentno(@RequestParam("studentno") String studentno){
        return studentDao.findStudentByStudentno(studentno);}

        //get students according to batch
    @GetMapping (value = "/getstunamebybatch",produces = "application/json")
    public List<Student> getStudentByBatchId(@RequestParam("batch_id")int batch_id){
      return studentDao.getStudentByBatchId(batch_id);}

    @GetMapping (value = "/byNic/{nic}",produces = "application/json")
    public Student getNicByNic(@PathVariable("nic") String nic) {
        //  System.out.println(classdetailsDao.getClassByClasscode(classcode));
        if (studentDao.findStudentByStu_nic(nic) != null)
            return studentDao.findStudentByStu_nic(nic);
        else return new Student();
    }

    //get students according to examapplication
    @GetMapping (value = "/getstunamebyexamapplication",params={"eaid"}, produces = "application/json")
    public List<Student> getStudentByExamApplicatioId(@RequestParam("eaid")int eaid){
        return studentDao.getStudentByExamApplicatioId(eaid);}



    @PostMapping//(add)
    public String postStudent(@RequestBody Student student){

        //check privilege
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPrive =  privilageController.getPrivilage(authentication.getName(), "STUDENT_DETAILS");

        if(userPrive != null && userPrive.get("insert")){
            //find loggin user
            //make authentication object
            Authentication athenthicatedObjec = SecurityContextHolder.getContext().getAuthentication();
            System.out.println(athenthicatedObjec);

            //get object according to username using user table through userDao
            User logedUser = userDao.getUserByUsername(athenthicatedObjec.getName());

            //check uniqe(ex:Email,NIC)

            //check nic
            if(student.getStu_nic() != null){
                Student extStuNIC = studentDao.findStudentByStu_nic(student.getStu_nic());
                if(extStuNIC != null ){
                    return "Cannot Add this Student : Student NIC is Exist Now";
                }
            }

            //check student email
            Student extStuEmail = studentDao.findStudentByEmail(student.getEmail());
            if(extStuEmail != null){
                return " Cannot add this Student becuse Email is Exist now";
            }

            //check student mobile
            Student extStuMobile1 = studentDao.findStudentByMobile_no(student.getMobile_no());
            if(extStuMobile1 != null){
                return " Cannot add this Student becuse Mobile Number is Exist now";

            }

            try{

                //tyena last reg number eka gannwa
               String lastRegNo = studentDao.getNextNumber();
               String nextRegNo = "";

               //ada date eka gannawa
               LocalDate nowDate = LocalDate.now();

               //eeka enne int agayak nisa eka string wlata harawa gannwa
               String nowYearLastTwo = String.valueOf(nowDate.getYear()).substring(2,4);

                System.out.println(lastRegNo);
                System.out.println(lastRegNo.substring(2,4));

                //awasana number ekak tynwda nadda kiyla check krnwa
                //tynwnm......
               if(lastRegNo != null){
                   //NS230010
                    String lastRegNoLastTwo = lastRegNo.substring(2,4);
                    if(nowYearLastTwo.equals(lastRegNoLastTwo)){
                        nextRegNo = "NS" + lastRegNoLastTwo + String.format("%04d", Integer.valueOf(lastRegNo.substring(4))+1);
                    }else {
                        nextRegNo = "NS" + nowYearLastTwo + "0001";
                    }

               }else {
                   nextRegNo = "NS" + nowYearLastTwo + "0001";
               }

                System.out.println(nextRegNo);

                student.setStudentno(nextRegNo);
                student.setAdded_date(LocalDate.now());
                student.setAdd_user_id(logedUser);
                studentDao.save(student);
                return student.getStudentno();
            }
            catch (Exception ex){
                return "Save not Successfully : "+ ex.getMessage();
            }
        }else {
            return "Can't add this Student: You have not permission";
        }


    }




    @PutMapping//(Update ekta)
    public String putStudent(@RequestBody Student student) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPrive =  privilageController.getPrivilage(authentication.getName(), "STUDENT_DETAILS");

        if(userPrive != null && userPrive.get("update")){
            //log wena user kenekwa genna gna oni
            //authentication object ekak hda gnwa
            Authentication athenthicatedObjec = SecurityContextHolder.getContext().getAuthentication();
            System.out.println(athenthicatedObjec);
            //userdao haraha user table eken mema username ekta adaalwa object ekak gennaganwa
            User logedUser = userDao.getUserByUsername(athenthicatedObjec.getName());
            //######################## log unu userta put operation eke privilage tynwda kiyla check krna oni #####################################

            //mobile number wage dublicate values check rkna oni (ex: nic, mobile , email)
            Student extStu = studentDao.getReferenceById(student.getId());
            //mehem student knk inwda kiyla check krnwa
            if(extStu != null){
                //user account tynawda kiyla check krna ooni
            }
            try {
                student.setUpdate_user_id(logedUser);
                student.setLastupdate_date(LocalDate.now());
                studentDao.save(student);



                return "0";
            } catch (Exception ex) {
                return "Update not Successfully : " + ex.getMessage();
            }
        }else {
            return "Can't update this Student: You have not permission";
        }

    }

    @DeleteMapping
    //student athule guardian save krna nisa guardianta adala link eka student ta dagena yna nisa meka use krnwa
    //ekak athule many process sidda wenwa
    //@Transactional
    public String deleteStudent(@RequestBody Student student){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPrive =  privilageController.getPrivilage(authentication.getName(), "STUDENT_DETAILS");

        if(userPrive != null && userPrive.get("delete")){
            //student dao eken genna gana oni me id eka tyna lmyek inwd kiyla
            Student extStu = studentDao.getReferenceById(student.getId());
            //mehem student knk inwda kiyla check krnwa
            if(extStu != null){
                //user account tynawda kiyla check krna ooni
            } try {
                //delete date eka set krnwa
                extStu.setDelete_date(LocalDate.now());
                //delete krpu userwa dannath oni
                //student status eka set krnnalu student status dao eke Id eka 2 wena eka
                extStu.setStu_status_id(student_statusDao.getReferenceById(3));
                //save krnwa
                studentDao.save(extStu);

                //status eka check krna onni. in-activ da blnwa.
                //guardianta adaalwa active lamai list ekak ho lamai count ekak genna gana oni
               if(extStu.getGuardian_id() != null){
                   List<Student> activeStudentList = studentDao.activeStudentByGuardian(extStu.getGuardian_id().getId());
                   //student list eke length eka 0 ta asamaninm in active krna baha
                   if(activeStudentList.size() == 0){
                       Guardian extGuardian = extStu.getGuardian_id();
                       extGuardian.setGuardian_status_id(guardianstatusDao.getReferenceById(2));
                       guardianDao.save(extGuardian);
                   }

               }

                return "0";
            } catch(Exception ex) {
                return "Delete not succefully " + ex.getMessage();
            }
        }else {
            return "Can't delete this Student: You have not permission";
        }

    }

}

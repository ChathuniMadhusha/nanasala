package lk.nanasala.controller;


import lk.nanasala.dao.*;
import lk.nanasala.entity.Course_Payment;
import lk.nanasala.entity.Student_Batch_Reg;
import lk.nanasala.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController // need to act as service provider
@RequestMapping("/coursepayment") //class level mapping
public class Course_PaymentController {

    @Autowired
    private Course_PaymentRepository coursepaymentDao;

    @Autowired
    private PrivilageController privilageController;

    @Autowired
    private UserRepository userDao;

    @Autowired
    private Student_Batch_RegRepository studentbatchregistrationDao;

    @GetMapping(value = "")
    public ModelAndView coursepaymentUI() {
        ModelAndView modelandview = new ModelAndView();
        modelandview.setViewName("Course_Payment.html");
        return modelandview;
    }

    @GetMapping (value = "/getbyid",produces = "application/json")
    public Course_Payment getQueryById(@RequestParam("id") int id){
        return coursepaymentDao.findCourse_PaymentById(id);}




    @GetMapping(value = "/findall", produces = "application/json")
    public List<Course_Payment> course_payments() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPrive = privilageController.getPrivilage(authentication.getName(), "COURSE_PAYMENT");

        if (userPrive != null && userPrive.get("select")) {
            return coursepaymentDao.findAll(Sort.by(Sort.Direction.DESC, "id"));
        }
        else {
            List<Course_Payment> course_payments = new ArrayList<>();
            return course_payments;
        }
    }


//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        HashMap<String, Boolean> userPrive =  privilageController.getPrivilage(authentication.getName(), "STUDENT_BATCH_IMPLEMENTATION");
//        if(userPrive != null && userPrive.get("select")){
//            return batchimplementationDao.findAll();
//        }else {
//            List<Batch_Implementation> batch_implementations = new ArrayList<>();
//            return batch_implementations();
//        }
//
//
//
//    }



    @PostMapping
    @Transactional // table dekak use wena nisa
    public String postCoursePay(@RequestBody Course_Payment course_payment){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPrive =  privilageController.getPrivilage(authentication.getName(), "COURSE_PAYMENT");


        if(userPrive != null && userPrive.get("insert")){


            //userdao haraha user table eken mema username ekta adaalwa object ekak gennaganwa
            User logedUser = userDao.getUserByUsername(authentication.getName());


//            //dublicate check krnwa
//            Course_Payment extCourse_pay = coursepaymentDao.getStudentBatchRegByBatchNameAndStudentStudentno(student_batch_reg.getBatch_id().getId(),student_batch_reg.getStudent_id().getId());
//            if(extStudent_batch_reg != null){
//                return "Cannot add this Registration : This Registration is exist now";
//            }
            try{
                course_payment.setBill_no(coursepaymentDao.getNextNumber());
                System.out.println(course_payment);
                //course_payment.setIndx(studentbatchregistrationDao.getStudent_Batch_RegByIndx(student_batch_reg.getBatch_id().getId())+1);
                course_payment.setPay_added_date(LocalDateTime.now());
                course_payment.setAdded_user_id(logedUser);
                course_payment.setInstallment_no(coursepaymentDao.getInstallment_No(course_payment.getRegistration_id().getId())+1);
                coursepaymentDao.save(course_payment);

                Student_Batch_Reg paidregistration = studentbatchregistrationDao.getReferenceById(course_payment.getRegistration_id().getId());
                paidregistration.setPrevious_balance(course_payment.getAfter_balance());

                studentbatchregistrationDao.save(paidregistration);
                return "0";
            } catch (Exception ex){
                return "Save not successfully : " + ex.getMessage();

            }
        } else {
            return "You can't add this Payment: You have not permission";
        }
    }


    @PutMapping
    public String putCoursePay(@RequestBody Course_Payment course_payment){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPrive =  privilageController.getPrivilage(authentication.getName(), "COURSE_PAYMENT");

        if(userPrive != null && userPrive.get("update")){
            User logedUser = userDao.getUserByUsername(authentication.getName());
            try{
                coursepaymentDao.save(course_payment);
                course_payment.setLast_update_user_id(logedUser);
                return "0";
            }catch (Exception ex){
                return "Update Not Succefully :" + ex.getMessage();
            }
        }else {
            return "You can't update this Payment: You have not permission";
        }

    }


    }

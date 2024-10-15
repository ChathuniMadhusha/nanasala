package lk.nanasala.controller;

import lk.nanasala.dao.ClassDetailsRepository;
import lk.nanasala.dao.ClassStatusRepository;
import lk.nanasala.dao.Class_PaymentRepository;
import lk.nanasala.dao.UserRepository;
import lk.nanasala.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/classpayment")
public class ClassPaymentController {
    @Autowired
    private Class_PaymentRepository classpaymentDao;

    @Autowired
    private PrivilageController privilageController;

    @Autowired
    private UserRepository userDao;

    @GetMapping(value = "/findall", produces = "application/json")
    //public List<Class_Payment> class_payments() {return classdetailsDao.findAll();}
    public List<Class_Payment> class_payments() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPrive =  privilageController.getPrivilage(authentication.getName(), "CLASS_PAYMENT");
        if(userPrive != null && userPrive.get("select")){
            return classpaymentDao.findAll();
        }else {
            List<Class_Payment> class_paymentList = new ArrayList<>();
            return class_paymentList;
        }
    }


    @GetMapping(value = "")
    public ModelAndView classUI() {
        ModelAndView modelandview = new ModelAndView();
        modelandview.setViewName("Class_Payment.html");
        return modelandview;
    }

//    @GetMapping (value = "/getbyid",produces = "application/json")
//    public Class_Payment getQueryById(@RequestParam("id") int id){
//        return classpaymentDao.findClass_PaymentById(id);}



    @PostMapping
    @Transactional // table dekak use wena nisa
    public String postClassPayment(@RequestBody Class_Payment class_payment){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPrive =  privilageController.getPrivilage(authentication.getName(), "CLASS_PAYMENT");


        if(userPrive != null && userPrive.get("insert")){


            //userdao haraha user table eken mema username ekta adaalwa object ekak gennaganwa
            User logedUser = userDao.getUserByUsername(authentication.getName());


//            //dublicate check krnwa
//            Course_Payment extCourse_pay = coursepaymentDao.getStudentBatchRegByBatchNameAndStudentStudentno(student_batch_reg.getBatch_id().getId(),student_batch_reg.getStudent_id().getId());
//            if(extStudent_batch_reg != null){
//                return "Cannot add this Registration : This Registration is exist now";
//            }
            try{
                class_payment.setBill_no(classpaymentDao.getNextNumber());
                //course_payment.setIndx(studentbatchregistrationDao.getStudent_Batch_RegByIndx(student_batch_reg.getBatch_id().getId())+1);
                class_payment.setAdded_date(LocalDateTime.now());
                class_payment.setAdded_user_id(logedUser);
                classpaymentDao.save(class_payment);

//                Student_Batch_Reg paidregistration = studentbatchregistrationDao.getReferenceById(course_payment.getRegistration_id().getId());
//                paidregistration.setPrevious_balance(course_payment.getAfter_balance());
//
//                studentbatchregistrationDao.save(paidregistration);
                return "0";
            } catch (Exception ex){
                return "Save not successfully : " + ex.getMessage();

            }
        } else {
            return "You can't add this Payment: You have not permission";
        }
    }
}

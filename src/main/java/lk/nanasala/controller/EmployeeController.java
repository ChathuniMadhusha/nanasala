package lk.nanasala.controller;


import lk.nanasala.dao.EmployeeRepository;
import lk.nanasala.dao.EmployeeStatusRepository;
import lk.nanasala.dao.RoleRepository;
import lk.nanasala.dao.UserRepository;
import lk.nanasala.email.EmailDetails;
import lk.nanasala.email.EmailService;
import lk.nanasala.email.EmailServiceImpl;
import lk.nanasala.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@RestController //Siyalu services use krna oni nisa
@RequestMapping("/employee")
public class EmployeeController {


    //instance ekak create kra ganna auto wired ganwa
    @Autowired
    private EmployeeRepository employeeDao;

    @Autowired
    private UserRepository userDao;

    @Autowired
    private EmployeeStatusRepository employeestatusDao;

    @Autowired
    private PrivilageController privilageController;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private RoleRepository roleDao;

    @Autowired
    private EmailService emailService;

    //data genna ganne json wlin
    @GetMapping(value = "/findall", produces = "application/json")
    public List<Employee> listEmployee() {
        //return employeeDao.findAll(Sort.by(Sort.Direction.DESC,"id"));

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPrive =  privilageController.getPrivilage(authentication.getName(), "MANAGE_EMPLOYEE_DETAILS");
        if(userPrive != null && userPrive.get("select")){
            return employeeDao.findAll();
        }else {
            List<Employee> employeeList = new ArrayList<>();
            return employeeList;
        }
    }


    //user account nathi ayage list eka genna ganna ghna mapping eka [/employee/listbywithoutuseraccount]
    @GetMapping(value = "/listbywithoutuseraccount", produces = "application/json")
    public List<Employee> getEmployeeWithoutUserAccount(){
        return employeeDao.getEmployeeListWithoutUser();
    }

    /*@GetMapping(value = "/employeewithteacher", produces = "application/json")
    public List<Employee> getEmployeeWithTeacher() {return employeeDao.getEmployeeWithTeacher();}*/


    //Dashboard card ekata count eka araganna
    @GetMapping(value = "/activeEmployee", produces = "application/json")
    public Employee activeList() {
        return employeeDao.activeEmpList();
    }

    @GetMapping(value = "/getEmployeesWithTecherAndCAtogary", params = "id",produces = "application/json")
    public List<Employee> getEmployeesWithTecherAndCAtogary(@RequestParam("id")int id) {return employeeDao.getEmployeesWithTecherAndCAtogary(id);}

    @GetMapping(value = "/getEmployeeWithTeacherAndDemo", params = "id", produces = "application/json")
    public List<Employee> getEmployeeWithTeacherAndDemo(@RequestParam("id")int id) {return employeeDao.getEmployeeWithTeacherAndDemo(id);}



    @GetMapping(value = "/employeewithteacherandsubject", params = "id",produces = "application/json")
    public List<Employee> getEmployeeWithTeacherAndSubject(@RequestParam("id")int id) {return employeeDao.getEmployeeWithTeacherAndSubject(id);}


    @GetMapping(value = "")
    public ModelAndView employeeUI() {
        ModelAndView modelandview = new ModelAndView();
        modelandview.setViewName("Employee_Details.html");
        return modelandview;
    }

    @GetMapping (value = "/getbyid",produces = "application/json")
    public Employee getByQueryId(@RequestParam("id") int id){return employeeDao.getReferenceById(id);}



    @DeleteMapping
    @Transactional
    public String deleteEmployee(@RequestBody Employee employee){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPrive =  privilageController.getPrivilage(authentication.getName(), "MANAGE_EMPLOYEE_DETAILS");

        Employee extEmp = employeeDao.getReferenceById(employee.getId());
        if(extEmp == null){
            return "Delete not completed : Employee not avilable..!";
        }

        try{
            Emp_status deleteStatus = employeestatusDao.getReferenceById(3);
            extEmp.setEmp_status_id(deleteStatus);

            employeeDao.save(extEmp);

            //dependendance
            // need to change user account if user account is exist
            User extUserr = userDao.getByEmployee(employee.getId());
            if (extUserr!=null){
                extUserr.setStatus(false);
                userDao.save(extUserr);
            }
            return "0";
        }
        catch (Exception ex){
                        return "Delete not Successfully : "+ ex.getMessage();
                    }
    }

//        if(userPrive != null && userPrive.get("delete")){
//            Employee extEmp = employeeDao.getReferenceById(employee.getId());
//            //mehema employee knk innwda kiyla blnwa, uniqe check krnwa
//            if(extEmp != null){
//                User extUser = userDao.findUserByEmployee_id(extEmp.getId());
//                //User account ekak tynwda kiyla check krla tynwnnm delete krna dena bha
//                if(extUser != null){
//                    return "Delete not Succesfully : This Emloyee has User Acount";
//                } else {
//                    //user account ekak nathi kenawa delete krnwa
//                    try {
//                        //employee.setDelet_date(LocalDateTime.now());
//                        //employeeDao.delete(employeeDao.getReferenceById(employee.getId()));
//
//                        //deleted date eka set kala
//                        extEmp.setDelete_date(LocalDate.now());
//                        //status eka thibba status eka wenuwta "deleted" walata maru kala
//                        extEmp.setEmp_status_id(employeestatusDao.getReferenceById(3));
//                        //update employee object
//                        employeeDao.save(extEmp);
//
//                        //dependendance
//                        //need to change user account if user account is exist
//                        User extUserr = userDao.getByEmployee(employee.getId());
//                        if (extUserr!=null){
//                            extUserr.setStatus(false);
//                            userDao.save(extUserr);
//                        }
//                        return "0";
//                    }
//                    catch (Exception ex){
//                        return "Delete not Successfully : "+ ex.getMessage();
//                    }
//                }
//            }else{
//                return "Delete Not Successfully : This Employee Not Available";
//            }
//        }else {
//            return "You can't delete this employee: You have not permission";
//        }


    @PostMapping
    @Transactional
    public String postEmployee(@RequestBody Employee employee){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPrive =  privilageController.getPrivilage(authentication.getName(), "MANAGE_EMPLOYEE_DETAILS");

        if(userPrive != null && userPrive.get("insert")){
            //employee knkwa save krddi (add krddi) uniqe dewal check krna oni (ex:Email,NIC, Mobile)
            Employee extEmpNIC = employeeDao.getEmployeeByEmpnic(employee.getEmpnic());
            if(extEmpNIC != null){
                return "Cannot Add this Employee : NIC is Exist now ";
            }
            Employee extEmpEmail = employeeDao.getEmployeeByEmail(employee.getEmail());
            if(extEmpEmail != null){
                return "Cannot Add this Employee : Email is Exist now ";
            }

            try{
                //save krpu date eka ganna
                //employee.setEmpno("Emp010");
                employee.setEmpno(employeeDao.getNextNumber());
                employee.setAssigndate(LocalDate.now());
                Employee savedNewEmployee = employeeDao.save(employee);

                //dependencies ( add new user account if required )
                if (employee.getDesignation_id().getUseraccount()){
                //create new user employ object
                User newUser = new User();

                //set properties one by one
                newUser.setUsername(employee.getEmpno());
                newUser.setPassword(bCryptPasswordEncoder.encode(employee.getEmpnic()));
                newUser.setEmail(employee.getEmail());
                newUser.setAdded_date(LocalDateTime.now());
                newUser.setStatus(true);
                newUser.setEmployee_id(savedNewEmployee);

                //role set ekakata instance ekak hada gatta mkd userge role ekta oni nisa
                Set<Role> userRole = new HashSet<>();// create emplty role set object for add new user as user role
                 //get role object usign employee designation and store role variable
                Role newObject = roleDao.getByRoleName(employee.getDesignation_id().getName());
                userRole.add(newObject); // set role object into role set
                newUser.setRoles(userRole); //add role set into role set

                //save user
                userDao.save(newUser);
                }
                //need update dependancy
                return "0";
            }
            catch (Exception ex){
                return "Save not Successfully : "+ ex.getMessage();
            }
        }else {
            return "Can't add this Employee: You have not permission";
        }


    }

    @PutMapping
    public String putEmployee(@RequestBody Employee employee) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPrive =  privilageController.getPrivilage(authentication.getName(), "MANAGE_EMPLOYEE_DETAILS");

        if(userPrive != null && userPrive.get("update")){

            try {
                employeeDao.save(employee);


                //send Email
                EmailDetails emailDetail = new EmailDetails();
                emailDetail.setSendto(employee.getEmail());
                String emailBody = "Emp No " + employee.getEmpno();
                emailDetail.setMsgBody(emailBody);
                emailDetail.setSubject("Employee details change..");

                emailService.sendSimpleMail(emailDetail);

                return "0";


            } catch (Exception ex) {
                return "Update not Successfully : " + ex.getMessage();
            }
        }else {
return "You can't Update this Employee: You have not permission";
        }
    }

}

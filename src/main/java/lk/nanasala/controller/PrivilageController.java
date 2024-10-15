package lk.nanasala.controller;


import lk.nanasala.dao.EmployeeRepository;
import lk.nanasala.dao.EmployeeStatusRepository;
import lk.nanasala.dao.PrivilageRepository;
import lk.nanasala.dao.UserRepository;
import lk.nanasala.entity.Course;
import lk.nanasala.entity.Employee;
import lk.nanasala.entity.Privilage;
import lk.nanasala.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

@RestController //service liya ganna oni nisa
@RequestMapping("/privilage")
public class PrivilageController {


    //instance ekak create kra ganna auto wired ganwa
    @Autowired
    private PrivilageRepository privilageDao;

    @Autowired
    private UserRepository userDao;

    //get privilage by logged user given module name
    @GetMapping(value = "/bymodule/{modulename}")
    public HashMap<String, Boolean> getPrivilegeByUserModule(@PathVariable("modulename") String modulename){
        //get logged user authentication object
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        //User loggeduser = userDao.getUserByUsername(authentication.getName());
        HashMap<String, Boolean> userPriv = getPrivilage(authentication.getName(), modulename);

        return userPriv;
    }

    //data genna ganne json wlin
    @GetMapping(value = "/findall", produces = "application/json")
    public List<Privilage> ListPrivilge() {
        //return privilageDao.findAll(Sort.by(Sort.Direction.DESC,"id"));
        return privilageDao.findAll();
    }

    //user account nathi ayage list eka genna ganna ghna mapping eka [/employee/listbywithoutuseraccount]
    /*@GetMapping(value = "/listbywithoutuseraccount", produces = "application/json")
    public List<Employee> getEmployeeWithoutUserAccount(){
        return employeeDao.getEmployeeListWithoutUser();
    }*/

    
    @GetMapping(value = "")
    public ModelAndView privilegeUI() {
        ModelAndView modelandview = new ModelAndView();
        modelandview.setViewName("Privilege_Management.html");
        return modelandview;
    }

    @GetMapping (value = "/getbyid",produces = "application/json")
    public Privilage getByQueryId(@RequestParam("id") int id){return privilageDao.getReferenceById(id);}



    @DeleteMapping

    public String deletePrivilege(@RequestBody Privilage privilage){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> userPriv = getPrivilage(authentication.getName(), "MANAGE_PRIVILAGE");
        if(userPriv != null && userPriv.get("delete")){

            Privilage extPrivilege = privilageDao.getReferenceById(privilage.getId());
            if(extPrivilege != null){
                try{
                    //delete date eka set krnwa
                    extPrivilege.setDelete_date(LocalDateTime.now());
                    extPrivilege.setLast_update_user_id(userDao.getReferenceById(1));
                    extPrivilege.setSel(false);
                    extPrivilege.setIns(false);
                    extPrivilege.setUpd(false);
                    extPrivilege.setDel(false);

                    //save wenwa
                    privilageDao.save(extPrivilege);
                    return "0";
                } catch (Exception ex){
                    return "Delete not Successfully : "+ ex.getMessage();
                }
            }else {
                return "Delete not Successfully : This Privilege Not Avilable";
            }
        }else {
                return "Delete not Successfully : You don't have permission";
        }

    }

  @PostMapping
    public String postPrivilege(@RequestBody Privilage privilage){
      //checked privilage for loged user



      //check dublicate
      Privilage extPriv = privilageDao.getByRoleAndModule(privilage.getRole_id().getId(), privilage.getModule_id().getId());
      if(extPriv != null){
                return "Insert not Completed because Privilage is already exist";
      }

     try{
    //check update value
         privilage.setAdded_date(LocalDateTime.now());
         privilage.setAdded_user_id(userDao.getReferenceById(1));
         //operator
         privilageDao.save(privilage);
         return "0";
     } catch (Exception ex){
return "Insert not compleleted : " + ex.getMessage();
     }
  }

  @PutMapping
    public String putPrivilege (@RequestBody Privilage privilage){
    //check privilege for logged user

      //check duplicate
      Privilage extPriv = privilageDao.getReferenceById(privilage.getId());
      if(extPriv == null){
          return "Update not Completed because Privilage nor exists in database";
      }

      try{
          //set auto set value
    privilage.setLast_update_date(LocalDateTime.now());
    privilage.setLast_update_user_id(userDao.getReferenceById(1));
          //operator
          privilageDao.save(privilage);
          return "0";
      }catch (Exception ex){
    return "Upadate not completed : " + ex.getMessage();
      }
  }

  public HashMap<String, Boolean> getPrivilage(String username, String modulename){

      User loggeduser = userDao.getUserByUsername(username);
      HashMap<String, Boolean> userPriv = new HashMap<>();
      if(loggeduser != null){
          if(loggeduser.getUsername().equals("Admin")){
              userPriv.put("select", true);
              userPriv.put("insert", true);
              userPriv.put("update", true);
              userPriv.put("delete", true);
              //userPriv.put("print",true);
          }else{
              String userPri = privilageDao.getPrivilageByUserModule(modulename,loggeduser.getUsername() );
              String[] userPrivList = userPri.split(",");

              userPriv.put("select", userPrivList[0].equals("1"));
              userPriv.put("insert", userPrivList[1].equals("1"));
              userPriv.put("update", userPrivList[2].equals("1"));
              userPriv.put("delete", userPrivList[3].equals("1"));
             // userPriv.put("print", userPrivList[4].equals("1"));

          }
          //admin nowana knk nm data base ekata ghin provilage tika illa gatta
      }else{
          userPriv.put("select", false);
          userPriv.put("insert", false);
          userPriv.put("update", false);
          userPriv.put("delete", false);
          //userPriv.put("print", false);
      }

      return userPriv;
  }

  }



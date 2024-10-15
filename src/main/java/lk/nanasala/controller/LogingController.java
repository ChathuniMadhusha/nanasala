package lk.nanasala.controller;


import lk.nanasala.dao.ModuleRepository;
import lk.nanasala.dao.RoleRepository;
import lk.nanasala.dao.UserRepository;
import lk.nanasala.entity.LogedUser;
import lk.nanasala.entity.Role;
import lk.nanasala.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.awt.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
public class LogingController {

    @Autowired
    private UserRepository userDao;

    @Autowired
    private RoleRepository roleDao;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private ModuleRepository moduleRepository;

    @GetMapping(value = {"/login"})
    public ModelAndView loginUI() {
        ModelAndView modelandview = new ModelAndView();
        modelandview.setViewName("login.html");
        return modelandview;


    }

    @GetMapping(value = "/login",params = "error")
    public ModelAndView loginErrorUI(@RequestParam("error") String error) {
        ModelAndView modelandview = new ModelAndView();
        modelandview.setViewName("login.html");

//authentication object eka aragena securitycoontet eka aragena eka clear krla
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if(auth != null || auth instanceof AnonymousAuthenticationToken){
            SecurityContextHolder.clearContext();
        }
        return modelandview;

    }

    @GetMapping(value = "/logeduser", produces = "application/json")
    public LogedUser getlogeduser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User extUser = userDao.getUserByUsername(authentication.getName());

        //loged user kiyla instance ekak hadagena ekta log wecha kenage properties tika set kala.
        //apita awashaya dewal wtrk genna gana front end ekta genna gana. mokada user ta godak details tynwa.. e okkma awshya naha
        LogedUser logeduser = new LogedUser(); //logged user instance ekak
        logeduser.setUsername(extUser.getUsername());
        logeduser.setPhoto_name(extUser.getPhoto_name());
        logeduser.setUser_photo_path(extUser.getUser_photo_path());
        logeduser.setRole(extUser.getRoles().iterator().next().getName());

        //employee knk innwnm .....
        if(extUser.getEmployee_id() != null){
            logeduser.setName(extUser.getEmployee_id().getEmpcallingname());
        }else{
            //#####################################################student awahma eyta loging eka deddi hdnwa##########################################################
        }

        return logeduser;
    }


    @GetMapping(value = "/dashboard")
    public ModelAndView dashUI(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("dashboard.html");
        return modelAndView;
    }

    @GetMapping(value = "/error")
    public ModelAndView errorUI(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("error-404.html");
        return modelAndView;
    }

    @GetMapping(value = "/createadmin")
    public String createAdminAccount(){
        User extAdminUser =  userDao.getUserByUsername("Admin");
        if(extAdminUser == null){
            User adminuser = new User();
            adminuser.setStatus(true);
            adminuser.setUsername("Admin");
            adminuser.setPassword(passwordEncoder.encode("1234"));
            adminuser.setAdded_date(LocalDateTime.now());
            adminuser.setEmail("admin1234@gmail.com");
            Set<Role> roles = new HashSet<>();
            roles.add(roleDao.getReferenceById(1));
            adminuser.setRoles(roles);
            userDao.save(adminuser);
        }
        return "<script> window.location.replace('/login'); </script>"; //loging ekata return wena
    }

    //path varibale ekak
    @GetMapping(value = "/modulenamebyuser/{username}")
    public List getModuleNameByUser(@PathVariable("username") String username){
        return moduleRepository.getByUser(username);
    }




}

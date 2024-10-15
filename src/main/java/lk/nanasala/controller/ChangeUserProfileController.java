package lk.nanasala.controller;

import lk.nanasala.dao.UserRepository;
import lk.nanasala.email.EmailDetails;
import lk.nanasala.email.EmailService;
import lk.nanasala.entity.ChangeUser;
import lk.nanasala.entity.ForgetPasswordUser;
import lk.nanasala.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Random;

@RestController
@RequestMapping("/changeuser")
public class ChangeUserProfileController {

    @Autowired
    private UserRepository userDao;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserRepository getUserDao;

    @GetMapping(value = "/loggeduser", produces = "application/json")
    public ChangeUser getloggeduser() {
        //log unu userwa ganna
        Authentication athenthicatedObjec = SecurityContextHolder.getContext().getAuthentication();
        User logeduser = userDao.getUserByUsername(athenthicatedObjec.getName());
        logeduser.setPassword(null);

        ChangeUser changeuser = new ChangeUser();
        changeuser.setId(logeduser.getId());
        changeuser.setUsername(logeduser.getUsername());
        changeuser.setEmail(logeduser.getEmail());
        changeuser.setCurrentpassword(null);
        changeuser.setChangepassword(null);

        return changeuser;
    }


    @PutMapping
    public String userupdate(@RequestBody ChangeUser changeUser) {

        try {

            //password eka change krla submit klham eka saved password ekamda kiyla blna oni
            //isselama existing userwa ganna oni
            User extUser = userDao.getReferenceById(changeUser.getId()); // id eka deela object eka gennagnwa

            extUser.setUsername(changeUser.getUsername());
            extUser.setEmail(changeUser.getEmail());

            if (changeUser.getCurrentpassword() != null) {
                //password eka null wlata asamaninm check krnwa, userge password eka extuserge( database eke tyena pass word eka) password ekath ekka check krnwa

                if(passwordEncoder.matches(changeUser.getCurrentpassword(),extUser.getPassword())){
                    //user gawa thama raw password eka tyenne, encrupted password eka tyenne extUser laga
                    if (passwordEncoder.matches(changeUser.getChangepassword(), extUser.getPassword())) {
                        return "User profile change not completed : Password same as previous password";
                    } else {
                        extUser.setPassword(passwordEncoder.encode(changeUser.getChangepassword()));
                    }
                } else {
                    return "User profile change not completed : curent password dosen't match";
                }


            } else { // password ekak nathuwa awoth? ( password eka change nokrpu awasthwk nm )
                extUser.setPassword(extUser.getPassword());
            }


            //dena password eka encode krla eyatama set krla save krnwa
            //user.setPassword(passwordEncoder.encode(user.getPassword()));
            userDao.save(extUser);
            return "Ok";
        } catch (Exception e) {
            return "User profile change not completed :" + e.getMessage();
        }


    }



    @PostMapping("/sendotp")
    public String postMethodName(@RequestBody ForgetPasswordUser forgetPasswordUser){

        try {
            User extUser = userDao.getUserByUsernameEmail(forgetPasswordUser.getUsername(),forgetPasswordUser.getEmail());

            if(extUser == null){
                return "Error Password change: User not Exist..!";
            }

            EmailDetails emailDetails = new EmailDetails();
            emailDetails.setSendto(extUser.getEmail());
            emailDetails.setSubject("OTP for change user account Password");
            String otpCode = OTP();
            String msgbody = "OTP code: " + otpCode;
            emailDetails.setMsgBody(msgbody);
            emailService.sendSimpleMail(emailDetails);

            extUser.setOtpcode(otpCode);
            userDao.save(extUser);

           return "OK";
        } catch (Exception e) {
            return "Error Password Change;";
        }

    }

    @PostMapping("/checkotp")
    public String checkUserOtp(@RequestBody ForgetPasswordUser forgetPasswordUser){

        try {
            User extUser = userDao.getUserByUsernameEmail(forgetPasswordUser.getUsername(),forgetPasswordUser.getEmail());

            if(extUser == null){
                return "Error Password change: User not Exist..!";
            }

            if(forgetPasswordUser.getOtp().equals(extUser.getOtpcode())){

                extUser.setOtpcode(null);
                userDao.save(extUser);
                return "OK";
            } else {
                return "Error OTP check: OTP not matching...!";
            }
            
        } catch (Exception e) {
            return "Error OTP code";
        }

    }

    @PostMapping("/changeforgetuserpassword")
    public String changeForgotUserPassword(@RequestBody ForgetPasswordUser forgetPasswordUser){

        try {
            User extUser = userDao.getUserByUsernameEmail(forgetPasswordUser.getUsername(), forgetPasswordUser.getEmail());


                if (extUser == null) {
                    return "Error Password change: User not Exist..!";
                }

                if (forgetPasswordUser.getNewPassword() != null) {
                    if (passwordEncoder.matches(forgetPasswordUser.getNewPassword(), extUser.getPassword())) {
                        return "User change password not completed: password same as previous password";
                    } else {
                        extUser.setPassword(passwordEncoder.encode(forgetPasswordUser.getNewPassword()));
                    }
                } else {
                    return "Error Password Change;";
                }


            extUser.setOtpcode(null);
            userDao.save(extUser);
            return "OK";


        } catch (Exception e) {
            return "Error Password Change;";
        }

    }



   // @GetMapping(value = "/getotp")
    public String OTP() {
    System.out.println("Generating OTP using random() : ");
    System.out.print("You OTP is : ");

    // Using numeric values
    String numbers = "0123456789";

    // Using random method
    Random rndm_method = new Random();

    char[] otp = new char[6];

    for (int i = 0; i < 6; i++)
    {
        // Use of charAt() method : to get character value
        // Use of nextInt() as it is scanning the value as int
        otp[i] =
                numbers.charAt(rndm_method.nextInt(numbers.length()));
    }
    String otpString = "";
    for(int i = 0; i < otp.length; i++){
        otpString = otpString + otp[i];
    }
    return otpString;
}



}

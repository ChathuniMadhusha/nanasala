package lk.nanasala.controller;


import lk.nanasala.dao.CameFromRepository;
import lk.nanasala.dao.GuardianRepository;
import lk.nanasala.entity.Came_from;
import lk.nanasala.entity.Guardian;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Guard;
import java.util.List;

@RestController
@RequestMapping("/guardian")
public class GuardianController {

    @Autowired
    private GuardianRepository guardianDao;

    @GetMapping(value = "/getlist", produces = "application/json")
    public List<Guardian> cameFrom() {
        return guardianDao.findAll();
    }

    @GetMapping(value = "/getbymobile", produces = "application/json")
    public Guardian getByQueryMobile(@RequestParam ("emergency_con") String emergency_con){
        return guardianDao.findGuardianByEmergency_con(emergency_con);
    }



    @PostMapping //add guardian
    public String postGuardian(@RequestBody Guardian guardian) {
        if (guardian.getEmergency_con() != null) {

            Guardian extGuarCon = guardianDao.findGuardianByEmergency_con(guardian.getEmergency_con());

            if (extGuarCon != null) {
                return "Cannot Add this Guardian : Guardian Contact Number is Exist Now";
            }

    }
        try {
            guardianDao.save(guardian);
            return "0";
        }
        catch (Exception ex) {
            return "Save not Successfully " + ex.getMessage();
        }
}
}
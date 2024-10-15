package lk.nanasala.controller;


import lk.nanasala.dao.Guardian_StatusRepository;
import lk.nanasala.dao.Student_StatusRepository;
import lk.nanasala.entity.GuardianStatus;
import lk.nanasala.entity.Student_Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/guardianstatus")
public class GuardianStatusController {



    @Autowired
    private Guardian_StatusRepository guardianstatusDao ;

    @GetMapping(value = "/getlist", produces = "application/json")
    public List<GuardianStatus> guardianStatuses() {return guardianstatusDao.findAll();}
}

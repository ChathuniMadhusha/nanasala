package lk.nanasala.controller;

import lk.nanasala.dao.Acadamic_YearRepository;
import lk.nanasala.dao.Registration_StatusRepository;
import lk.nanasala.entity.Acadamic_Year;
import lk.nanasala.entity.Registration_Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/regstatus")
public class Registration_StatusController {
    @Autowired
    private Registration_StatusRepository registrationstatusDao;

    @GetMapping(value = "/getlist", produces = "application/json")
    public List<Registration_Status> registration_statuses() {return registrationstatusDao.findAll();}
}

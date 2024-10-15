package lk.nanasala.controller;

import lk.nanasala.dao.Acadamic_YearRepository;
import lk.nanasala.entity.Acadamic_Year;
import lk.nanasala.entity.Session_Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/sessionstatus")
public class Session_StatusController {
    @Autowired
    private lk.nanasala.dao.Session_StatusRepository sessionstatusDao;

    @GetMapping(value = "/getlist", produces = "application/json")
    public List<Session_Status> session_statuses() {return sessionstatusDao.findAll();}
}

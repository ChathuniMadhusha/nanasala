package lk.nanasala.controller;

import lk.nanasala.dao.Acadamic_YearRepository;
import lk.nanasala.dao.Hall_StatusRepository;
import lk.nanasala.entity.Acadamic_Year;
import lk.nanasala.entity.Hall_Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/lechallstatus")
public class Lecture_Hall_StatusController {
    @Autowired
    private Hall_StatusRepository hallstatusDao;

    @GetMapping(value = "/getlist", produces = "application/json")
    public List<Hall_Status> hall_statuses() {return hallstatusDao.findAll();}
}

package lk.nanasala.controller;

import lk.nanasala.dao.Acadamic_YearRepository;
import lk.nanasala.dao.Attendance_StatusRepository;
import lk.nanasala.entity.Acadamic_Year;
import lk.nanasala.entity.Attendance_Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/attendancestatus")
public class Attendance_StatusController {
    @Autowired
    private Attendance_StatusRepository attendanceStatusDao;

    @GetMapping(value = "/getlist", produces = "application/json")
    public List<Attendance_Status> attendance_statuses() {return attendanceStatusDao.findAll();}
}

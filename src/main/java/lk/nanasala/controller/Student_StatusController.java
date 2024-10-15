package lk.nanasala.controller;


import lk.nanasala.dao.EmployeeStatusRepository;
import lk.nanasala.dao.Student_StatusRepository;
import lk.nanasala.entity.Emp_status;
import lk.nanasala.entity.Student_Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/stustatus")
public class Student_StatusController {

    @Autowired
    private Student_StatusRepository studentstatusDao;

    @GetMapping(value = "/getlist", produces = "application/json")
    public List<Student_Status> student_statuses() {return studentstatusDao.findAll();}

}

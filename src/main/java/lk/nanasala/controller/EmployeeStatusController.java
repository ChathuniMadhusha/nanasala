package lk.nanasala.controller;


import lk.nanasala.dao.EmployeeStatusRepository;
import lk.nanasala.entity.Emp_status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/empstatus")
public class EmployeeStatusController {

    @Autowired
    private EmployeeStatusRepository employeestatusDao;

    @GetMapping(value = "/getlist", produces = "application/json")
    public List<Emp_status> employeeStatuse() {return employeestatusDao.findAll();}




}

package lk.nanasala.controller;

import lk.nanasala.dao.Acadamic_YearRepository;
import lk.nanasala.dao.Class_Reg_StatusRepository;
import lk.nanasala.entity.Acadamic_Year;
import lk.nanasala.entity.Class_Reg_Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/classregstatus")
public class Class_Reg_StatusController {
    @Autowired
    private Class_Reg_StatusRepository classRegStatusDao;

    @GetMapping(value = "/getlist", produces = "application/json")
    public List<Class_Reg_Status> class_reg_statuses() {return classRegStatusDao.findAll();}
}

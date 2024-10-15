package lk.nanasala.controller;

import lk.nanasala.dao.Acadamic_YearRepository;
import lk.nanasala.dao.Class_Pay_MethodRepository;
import lk.nanasala.entity.Acadamic_Year;
import lk.nanasala.entity.Class_Pay_Method;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/classpaymethod")
public class Class_Pay_MethodController {
    @Autowired
    private Class_Pay_MethodRepository classpaymethodDao;

    @GetMapping(value = "/getlist", produces = "application/json")
    public List<Class_Pay_Method> class_pay_methods() {return classpaymethodDao.findAll();}
}

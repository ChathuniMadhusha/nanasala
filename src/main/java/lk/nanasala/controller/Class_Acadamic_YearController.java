package lk.nanasala.controller;

import lk.nanasala.dao.Acadamic_YearRepository;
import lk.nanasala.dao.Class_Acadamic_YearRepository;
import lk.nanasala.entity.Acadamic_Year;
import lk.nanasala.entity.Class_Acadamic_Year;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/classacadamicyear")
public class Class_Acadamic_YearController {
    @Autowired
    private Class_Acadamic_YearRepository classAcadamicYearDao;

    @GetMapping(value = "/getlist", produces = "application/json")
    public List<Class_Acadamic_Year> class_acadamic_years() {return classAcadamicYearDao.findAll();}
}

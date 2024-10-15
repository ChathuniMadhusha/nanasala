package lk.nanasala.controller;

import lk.nanasala.dao.Acadamic_YearRepository;
import lk.nanasala.dao.Class_SubjectRepository;
import lk.nanasala.entity.Acadamic_Year;
import lk.nanasala.entity.Class_Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/classsubject")
public class Class_SubjectController {
    @Autowired
    private Class_SubjectRepository classSubjectDao;

    @GetMapping(value = "/getlist", produces = "application/json")
    public List<Class_Subject> class_subjects() {return classSubjectDao.findAll();}
}

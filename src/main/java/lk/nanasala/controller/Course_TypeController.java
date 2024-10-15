package lk.nanasala.controller;


import lk.nanasala.dao.Course_StatusRepository;
import lk.nanasala.dao.Course_TypeRepository;
import lk.nanasala.entity.Course_Status;
import lk.nanasala.entity.Course_Type;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/course_type")
public class Course_TypeController {

    @Autowired
    private Course_TypeRepository coursetypeDao;

    @GetMapping(value = "/getlist", produces = "application/json")
    public List<Course_Type> listCourse_Type() {
        //return courselevelDao.findAll(Sort.by(Sort.Direction.DESC,"id"));
        return coursetypeDao.findAll();

    }
}

package lk.nanasala.controller;


import lk.nanasala.dao.Course_LevelRepository;
import lk.nanasala.dao.Course_StatusRepository;
import lk.nanasala.entity.Course_Level;
import lk.nanasala.entity.Course_Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/coursestatus")
public class Course_StatusController {

    @Autowired
    private Course_StatusRepository coursestatusDao;

    @GetMapping(value = "/getlist", produces = "application/json")
    public List<Course_Status> listCourse_Status() {
        //return courselevelDao.findAll(Sort.by(Sort.Direction.DESC,"id"));
        return coursestatusDao.findAll();

    }



}

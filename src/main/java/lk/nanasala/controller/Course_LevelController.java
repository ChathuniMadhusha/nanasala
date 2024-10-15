package lk.nanasala.controller;


import lk.nanasala.dao.CourseCatRepository;
import lk.nanasala.dao.Course_LevelRepository;
import lk.nanasala.entity.Course_Cat;
import lk.nanasala.entity.Course_Level;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/courselevel")
public class Course_LevelController {

    @Autowired
    private Course_LevelRepository courselevelDao;

    @GetMapping(value = "/getlist", produces = "application/json")
    public List<Course_Level> listCourse_Level() {
        //return courselevelDao.findAll(Sort.by(Sort.Direction.DESC,"id"));
        return courselevelDao.findAll();
    }

}

package lk.nanasala.controller;


import lk.nanasala.dao.CourseCatRepository;
import lk.nanasala.dao.CourseRepository;
import lk.nanasala.entity.Course;
import lk.nanasala.entity.Course_Cat;
import lk.nanasala.entity.Duration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/coursecatogary")
public class Course_CatController {

    @Autowired
    private CourseCatRepository course_catDao;

    @GetMapping(value = "/getlist", produces = "application/json")
    public List<Course_Cat> listCourse_Cat() {
        //return courseDao.findAll(Sort.by(Sort.Direction.DESC,"id"));
        return course_catDao.findAll();
    }


    @PostMapping //add catogary
    public String postCourseCatogary(@RequestBody Course_Cat course_cat) {

        try {
            course_catDao.save(course_cat);
            return "0";
        }
        catch (Exception ex) {
            return "Save not Successfully " + ex.getMessage();
        }
    }

}

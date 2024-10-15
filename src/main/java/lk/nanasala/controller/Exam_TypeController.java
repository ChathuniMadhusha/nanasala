package lk.nanasala.controller;

import lk.nanasala.dao.Acadamic_YearRepository;
import lk.nanasala.dao.Exam_TypeRepository;
import lk.nanasala.entity.Acadamic_Year;
import lk.nanasala.entity.Course;
import lk.nanasala.entity.Exam_Type;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/examtype")
public class Exam_TypeController {
    @Autowired
    private Exam_TypeRepository examtypeDao;

    @GetMapping(value = "/getlist", produces = "application/json")
    public List<Exam_Type> examTypes() {return examtypeDao.findAll();}



    @GetMapping(value = "/examtypeaccorexam",params = "id",produces = "application/json")
    public List<Exam_Type> getexamtype(@RequestParam("id")int id){
        return examtypeDao.getExamTypeAccorExam(id);
    }

    @GetMapping(value = "/examtypeaccorcourse",params = "cid",produces = "application/json")
    public List<Exam_Type> getetypeaccocourse(@RequestParam("cid")int cid){
        return examtypeDao.getExamTypeAccorCourse(cid);
    }

    }




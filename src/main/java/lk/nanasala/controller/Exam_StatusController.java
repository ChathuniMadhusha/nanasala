package lk.nanasala.controller;

import lk.nanasala.dao.Acadamic_YearRepository;
import lk.nanasala.dao.Exam_StatusRepository;
import lk.nanasala.entity.Acadamic_Year;
import lk.nanasala.entity.Exam_Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/examstatus")
public class Exam_StatusController {
    @Autowired
    private Exam_StatusRepository examstatusDao;

    @GetMapping(value = "/getlist", produces = "application/json")
    public List<Exam_Status> examStatuses() {return examstatusDao.findAll();}




}

package lk.nanasala.controller;

import lk.nanasala.dao.LecHallRepository;
import lk.nanasala.dao.LectureHallFeaturesRepository;
import lk.nanasala.entity.LecturHall_Features;
import lk.nanasala.entity.LectureHall;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping("/lecturehallfeatures")
public class LecFeaturesController {
    @Autowired
    private LectureHallFeaturesRepository lecturHall_featuresDao;

    @GetMapping(value = "/getlist", produces = "application/json")
    public List<LecturHall_Features> lecturHall_featuresList() {return lecturHall_featuresDao.findAll();}




}

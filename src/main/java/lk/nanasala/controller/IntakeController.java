package lk.nanasala.controller;

import lk.nanasala.dao.Acadamic_YearRepository;
import lk.nanasala.dao.IntakeRepository;
import lk.nanasala.entity.Acadamic_Year;
import lk.nanasala.entity.Intake;
import lk.nanasala.entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/intake")
public class IntakeController {
    @Autowired
    private IntakeRepository intakeDao;

    @GetMapping(value = "/getlist", produces = "application/json")
    public List<Intake> intakes() {return intakeDao.findAll();}


    // lecturehall/getByLecturehall?sessiondate=2023-04-11&starttime=08:00:00&endtime=10:00:00
    @GetMapping(value = "/byacadamicycoursetheory", params={"aid","cid","tid"}, produces="application/json")
    public List<Intake> intakeListByAcadamic(@RequestParam("aid") Integer aid,
                                             @RequestParam("cid") Integer cid,
                                             @RequestParam("tid") Integer tid){

        return intakeDao.getByacadamicycoursetheory(aid,cid,tid);
    }



}

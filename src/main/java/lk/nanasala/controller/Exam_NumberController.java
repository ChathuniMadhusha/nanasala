package lk.nanasala.controller;

import lk.nanasala.dao.Acadamic_YearRepository;
import lk.nanasala.dao.Exam_NumberRepository;
import lk.nanasala.entity.Acadamic_Year;
import lk.nanasala.entity.Exam_Number;
import lk.nanasala.entity.Intake;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/examnumber")
public class Exam_NumberController {
    
    @Autowired
    private Exam_NumberRepository examnumberDao;

    @GetMapping(value = "/getlist", produces = "application/json")
    public List<Exam_Number> exam_numbers() {return examnumberDao.findAll();}


//    @PostMapping //add catogary
//    public String postAcadamicYear(@RequestBody Acadamic_Year acadamic_year) {
//
//        try {
//            acadamicyearDao.save(acadamic_year);
//            return "0";
//        }
//        catch (Exception ex) {
//            return "Save not Successfully " + ex.getMessage();
//        }
//    }

    // lecturehall/getByLecturehall?sessiondate=2023-04-11&starttime=08:00:00&endtime=10:00:00
    @GetMapping(value = "/byCourCatNameAcadYear", params={"caid","cnid","ayid"}, produces="application/json")
    public List<Exam_Number> exam_numbers(@RequestParam("caid") Integer caid,
                                     @RequestParam("cnid") Integer cnid,
                                     @RequestParam("ayid") Integer ayid){

        return examnumberDao.getExamNumberAccorcatNameyear(caid,cnid,ayid);
    }


}

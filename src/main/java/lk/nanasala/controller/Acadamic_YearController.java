package lk.nanasala.controller;

import lk.nanasala.dao.Acadamic_YearRepository;
import lk.nanasala.dao.Batch_StatusRepository;
import lk.nanasala.entity.Acadamic_Year;
import lk.nanasala.entity.Batch_Status;
import lk.nanasala.entity.Course_Cat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/acadamicyear")
public class Acadamic_YearController {
    @Autowired
    private Acadamic_YearRepository acadamicyearDao;

    @GetMapping(value = "/getlist", produces = "application/json")
    public List<Acadamic_Year> acadamic_years() {return acadamicyearDao.findAll();}


    @PostMapping //add catogary
    public String postAcadamicYear(@RequestBody Acadamic_Year acadamic_year) {

        try {
            acadamicyearDao.save(acadamic_year);
            return "0";
        }
        catch (Exception ex) {
            return "Save not Successfully " + ex.getMessage();
        }
    }



}

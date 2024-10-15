package lk.nanasala.controller;

import lk.nanasala.dao.Batch_StatusRepository;
import lk.nanasala.dao.Week_DayRepository;
import lk.nanasala.entity.Batch_Status;
import lk.nanasala.entity.Week_Day;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/weekdays")
public class Week_DayController {
    @Autowired
    private Week_DayRepository weekdayDao;

    @GetMapping(value = "/getlist", produces = "application/json")
    public List<Week_Day> week_days() {return weekdayDao.findAll();}
}

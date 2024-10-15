package lk.nanasala.controller;

import lk.nanasala.dao.CameFromRepository;
import lk.nanasala.dao.DurationRepository;
import lk.nanasala.entity.Came_from;
import lk.nanasala.entity.Duration;
import lk.nanasala.entity.Guardian;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/duration")
public class DurationController {
    @Autowired
    private DurationRepository durationDao;

    @GetMapping(value = "/getlist", produces = "application/json")
    public List<Duration> cameFrom() {return durationDao.findAll();}



    @PostMapping //add duration
    public String postDuration(@RequestBody Duration duration) {

        try {
            durationDao.save(duration);
            return "0";
        }
        catch (Exception ex) {
            return "Save not Successfully " + ex.getMessage();
        }
    }


}


package lk.nanasala.controller;

import lk.nanasala.dao.HallTypeRepository;
import lk.nanasala.dao.Hall_StatusRepository;
import lk.nanasala.entity.Hall_Status;
import lk.nanasala.entity.Hall_Type;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/lechalltype")
public class Lecture_Hall_TypeController {
    @Autowired
    private HallTypeRepository halltypeDao;

    @GetMapping(value = "/getlist", produces = "application/json")
    public List<Hall_Type> hall_types() {return halltypeDao.findAll();}
}

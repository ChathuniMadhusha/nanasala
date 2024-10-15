package lk.nanasala.controller;


import lk.nanasala.dao.DesignationRepository;
import lk.nanasala.entity.Designation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/designations")
public class DesignationController {

    @Autowired
    private DesignationRepository designationDao;

    @GetMapping(value = "/getlist", produces = "application/json")
    public List<Designation> designation() {return designationDao.findAll();}
}

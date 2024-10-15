package lk.nanasala.controller;

import lk.nanasala.dao.CameFromRepository;
import lk.nanasala.dao.ClassTypeRepository;
import lk.nanasala.entity.Came_from;
import lk.nanasala.entity.Class_Type;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/classtype")
public class ClassTypeController {
    @Autowired
    private ClassTypeRepository classtypeDao;

    @GetMapping(value = "/getlist", produces = "application/json")
    public List<Class_Type> classTypes() {return classtypeDao.findAll();}
}

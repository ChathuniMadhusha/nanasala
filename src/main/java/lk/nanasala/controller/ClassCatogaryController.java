package lk.nanasala.controller;

import lk.nanasala.dao.CameFromRepository;
import lk.nanasala.dao.ClassCatogaryRepository;
import lk.nanasala.entity.Came_from;
import lk.nanasala.entity.Class_Catogary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/classcatogary")
public class ClassCatogaryController {
    @Autowired
    private ClassCatogaryRepository classcatogaryDao;

    @GetMapping(value = "/getlist", produces = "application/json")
    public List<Class_Catogary> classCatogaries() {return classcatogaryDao.findAll();}
}

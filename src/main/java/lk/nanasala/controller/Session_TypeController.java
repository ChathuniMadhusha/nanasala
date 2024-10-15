package lk.nanasala.controller;

import lk.nanasala.dao.Acadamic_YearRepository;
import lk.nanasala.dao.Session_TypeRepository;
import lk.nanasala.entity.Acadamic_Year;
import lk.nanasala.entity.Session_Type;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/sessiontype")
public class Session_TypeController {
    @Autowired
    private Session_TypeRepository sessiontypeDao;

    @GetMapping(value = "/getlist", produces = "application/json")
    public List<Session_Type> session_types() {return sessiontypeDao.findAll();}
}

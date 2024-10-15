package lk.nanasala.controller;


import lk.nanasala.dao.CourseCatRepository;
import lk.nanasala.dao.RoleRepository;
import lk.nanasala.entity.Course_Cat;
import lk.nanasala.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/role")
public class RoleController {

    @Autowired
    private RoleRepository roleDao;

    @GetMapping(value = "/getlist", produces = "application/json")
    public List<Role> listRole() {
        //return courseDao.findAll(Sort.by(Sort.Direction.DESC,"id"));
        //return roleDao.findAll();
        return roleDao.List();
    }


}

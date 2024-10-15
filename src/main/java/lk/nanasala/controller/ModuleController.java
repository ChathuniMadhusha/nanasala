package lk.nanasala.controller;


import lk.nanasala.dao.ModuleRepository;
import lk.nanasala.dao.RoleRepository;
import lk.nanasala.entity.Course_Module;
import lk.nanasala.entity.Module;
import lk.nanasala.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/module")
public class ModuleController {

    @Autowired
    private ModuleRepository moduleDao;

    @GetMapping(value = "/getlist", produces = "application/json")
    public List<Module> listModule() {
        //return courseDao.findAll(Sort.by(Sort.Direction.DESC,"id"));
        return moduleDao.findAll();
    }


    @GetMapping(value = "/getModuleListByRole" ,params = {"id"},produces = "application/json")
    public List<Module> getModuleListByRole(@RequestParam("id")int id)
    {return moduleDao.getModuleListByRole(id);}


}

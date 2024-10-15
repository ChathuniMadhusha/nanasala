package lk.nanasala.controller;

import lk.nanasala.dao.CameFromRepository;
import lk.nanasala.dao.Course_ModuleRepository;
import lk.nanasala.entity.Came_from;
import lk.nanasala.entity.Course_Module;
import lk.nanasala.entity.Duration;
import lk.nanasala.entity.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/coursemodule")
public class Course_ModuleController {
    @Autowired
    private Course_ModuleRepository coursemoduleDao;

    @GetMapping(value = "/getlist", produces = "application/json")
    public List<Course_Module> courseModules() {return coursemoduleDao.findAll();}

    @GetMapping(value = "/getMoudleWithCatogary" ,params = {"id"},produces = "application/json")
    public List<Course_Module> getCourseModuleAccoCatogary(@RequestParam("id")int id)
    {return coursemoduleDao.getCourseModuleAccoCatogary(id);}


    //get course module by given course (/coursemodule/getlistbycourse?cid=&ccid=)
    @GetMapping(value = "/getlistbycourse" , params = {"cid","ccid"}, produces = "application/json")
    public List<Course_Module> getListByCid(@RequestParam("cid")int cid, @RequestParam("ccid") int ccid)
    {return coursemoduleDao.getListByCourse(cid, ccid);}


    @PostMapping //add duration
    public String postCourseModile(@RequestBody Course_Module courseModule) {

        try {
            coursemoduleDao.save(courseModule);
            return "0";
        }
        catch (Exception ex) {
            return "Save not Successfully " + ex.getMessage();
        }
    }


}

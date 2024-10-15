package lk.nanasala.controller;

import lk.nanasala.dao.CameFromRepository;
import lk.nanasala.dao.CivilStatusRepository;
import lk.nanasala.entity.Came_from;
import lk.nanasala.entity.Civil_status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/camefrom")
public class CameFromController {
    @Autowired
    private CameFromRepository camefromDao;

    @GetMapping(value = "/getlist", produces = "application/json")
    public List<Came_from> cameFrom() {return camefromDao.findAll();}
}

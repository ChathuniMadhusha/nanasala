package lk.nanasala.controller;

import lk.nanasala.dao.Batch_StatusRepository;
import lk.nanasala.dao.CameFromRepository;
import lk.nanasala.entity.Batch_Status;
import lk.nanasala.entity.Came_from;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/batchstatus")
public class Batch_StatusController {
    @Autowired
    private Batch_StatusRepository batchstatusDao;

    @GetMapping(value = "/getlist", produces = "application/json")
    public List<Batch_Status> batch_statuses() {return batchstatusDao.findAll();}








}

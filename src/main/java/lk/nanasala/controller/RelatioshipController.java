package lk.nanasala.controller;


import lk.nanasala.dao.GuardianRepository;
import lk.nanasala.dao.RelationshipRepository;
import lk.nanasala.entity.Guardian;
import lk.nanasala.entity.Relationship;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/relashionship")
public class RelatioshipController {

    @Autowired
    private RelationshipRepository relationshipDao;

    @GetMapping(value = "/getlist", produces = "application/json")
    public List<Relationship> cameFrom() {return relationshipDao.findAll();}
}

package lk.nanasala.controller;

import lk.nanasala.dao.DistrictRepository;
import lk.nanasala.entity.District;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/district")
public class DistrictController {
    @Autowired
    private DistrictRepository districtDao;

    @GetMapping(value = "/getlist", produces = "application/json")
    public List<District> district() {return districtDao.findAll();}
}

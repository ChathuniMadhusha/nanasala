package lk.nanasala.controller;

import lk.nanasala.dao.Acadamic_YearRepository;
import lk.nanasala.dao.Payment_TypeRepository;
import lk.nanasala.entity.Acadamic_Year;
import lk.nanasala.entity.Payment_Type;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/paymenttype")
public class Payment_TypeController {
    @Autowired
    private Payment_TypeRepository paymenttypeDao;

    @GetMapping(value = "/getlist", produces = "application/json")
    public List<Payment_Type> payment_types() {return paymenttypeDao.findAll();}
}

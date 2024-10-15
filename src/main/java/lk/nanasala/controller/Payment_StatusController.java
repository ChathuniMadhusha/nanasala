package lk.nanasala.controller;

import lk.nanasala.dao.Acadamic_YearRepository;
import lk.nanasala.dao.Payment_StatusRepository;
import lk.nanasala.entity.Acadamic_Year;
import lk.nanasala.entity.Payment_Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/paymentstatus")
public class Payment_StatusController {
    @Autowired
    private Payment_StatusRepository paymentstatusDao;

    @GetMapping(value = "/getlist", produces = "application/json")
    public List<Payment_Status> payment_statuses() {return paymentstatusDao.findAll();}
}

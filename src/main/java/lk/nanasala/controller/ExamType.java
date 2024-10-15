//package lk.nanasala.controller;
//
//
//import lk.nanasala.dao.Exam_TypeRepository;
//import lk.nanasala.dao.RoleRepository;
//import lk.nanasala.entity.Exam_Type;
//import lk.nanasala.entity.Role;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/examtype")
//public class ExamType {
//
//    @Autowired
//    private Exam_TypeRepository examtypeDao;
//
//    @GetMapping(value = "/getlist", produces = "application/json")
//    public List<Exam_Type> listexamtype() {
//        return examtypeDao.findAll();
//    }
//
//
//}

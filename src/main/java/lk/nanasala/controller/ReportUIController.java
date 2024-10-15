package lk.nanasala.controller;

import lk.nanasala.dao.Attendance_ManagementRepository;
import lk.nanasala.entity.Attendance_Management;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping()
public class ReportUIController {
    @GetMapping(value = "/paymentreport")
    public ModelAndView paymentreportUI() {
        ModelAndView modelandview = new ModelAndView();
        modelandview.setViewName("Paymentreport.html");
        return modelandview;
    }

    @GetMapping(value = "/samplechart")
    public ModelAndView psamplechartUI() {
        ModelAndView modelandview = new ModelAndView();
        modelandview.setViewName("SampleChart.html");
        return modelandview;
    }

    @GetMapping(value = "/arrearsreport")
    public ModelAndView arrearsreportUI(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("reports/ArrearsPayment.html");
        return modelAndView;
    }


    @GetMapping(value = "/batchreport")
    public ModelAndView batchReportUI(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("reports/BatchReport.html");
        return modelAndView;
    }


    @GetMapping(value = "/genderreport")
    public ModelAndView genderReportUI(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("Genderreport.html");
        return modelAndView;
    }


    @GetMapping(value = "/designationreport")
    public ModelAndView designationreportUI(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("DesignationReport.html");
        return modelAndView;
    }


    @GetMapping(value = "/resultreport")
    public ModelAndView examResultReportUI(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("reports/ExamResultReport.html");
        return modelAndView;
    }

    @GetMapping(value = "/paymentbystudent")
    public ModelAndView paymentReportUI(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("reports/Paymentreport.html");
        return modelAndView;
    }


    @GetMapping(value = "/attendancebydate")
    public ModelAndView attendancereportUI(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("reports/AttendanceReport.html");
        return modelAndView;
    }

    @GetMapping(value = "/dailypaymenttbl")
    public ModelAndView dailypaymentreportUI(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("reports/DailyPayments.html");
        return modelAndView;
    }

    @GetMapping(value = "/custompaymenttbl")
    public ModelAndView custompaymentreportUI(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("reports/CustomPayments.html");
        return modelAndView;
    }

    @GetMapping(value = "/batchcount")
    public ModelAndView batchcountUI(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("reports/BatchCount.html");
        return modelAndView;
    }

    @GetMapping(value = "/dailyregcount")
    public ModelAndView dailyregcountUI(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("reports/DailyRegCount.html");
        return modelAndView;
    }


    @GetMapping(value = "/finalresultreport")
    public ModelAndView finalresultreport(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("reports/ResultReport.html");
        return modelAndView;
    }



}

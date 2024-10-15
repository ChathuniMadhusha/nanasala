package lk.nanasala.controller;

import lk.nanasala.dao.*;
import lk.nanasala.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class Report_DataController {

    @Autowired
    private Report_Repository reportDao;

    @Autowired
    private StudentRepository studentDao;
    @Autowired
    private UserRepository userDao;

    @Autowired
    private Batch_ImplementationRepository batch_implementationDao;

    @Autowired
    private Student_Batch_RegRepository studentBatchRegDao;

    @GetMapping(value = "/paymentreport/bysdateedatetype", params = {"sdate", "edate", "type"}, produces = "application/json")
    public List<PaymentReport> getPaymentBySdateEdateType(@RequestParam("sdate")String sdate,
                                           @RequestParam("edate")String edate,
                                           @RequestParam("type")String type){

        String[][] reportDataList =  new String[100][4];
        if(type.equals("Daily"))
            //reportDataList =  reportDao.getPaymentReportDaily(sdate,edate);
            reportDataList =  reportDao.getStudentByPayment(sdate,edate);
//        if(type.equals("Weekly"))
//            reportDataList =  reportDao.getPaymentReportWeekly(sdate,edate);
//        if(type.equals("Monthly"))
//            reportDataList =  reportDao.getPaymentReportMonthly(sdate,edate);
//        if(type.equals("Anualy"))
//            reportDataList =  reportDao.getPaymentReportYear(sdate,edate);




        List<PaymentReport> paymentReportList = new ArrayList<>();
      //  for(Object reportData: reportDataList){}
        for (int p=0; p<reportDataList.length; p++ ){
            PaymentReport paymentReport = new PaymentReport();
            if(type.equals("Daily")){
                paymentReport.setName(reportDataList[p][0]);
                paymentReport.setFee(reportDataList[p][1]);
//                PaymentReport.setDate(reportDataList[p][0]);
//                PaymentReport.setPaymentcount(reportDataList[p][1]);
//                PaymentReport.setTotalamount(reportDataList[p][2]);
            }else {
//                PaymentReport.setDate(reportDataList[p][0]+"-"+reportDataList[p][1]);
//                PaymentReport.setPaymentcount(reportDataList[p][2]);
//                PaymentReport.setTotalamount(reportDataList[p][3]);
            }

            paymentReportList.add(paymentReport);

        }
            return paymentReportList;
    }




//    @GetMapping(value = "/arrearsreport/bybatch", params = {"bid"}, produces = "application/json")
//    public List<Student_Batch_Reg> getArrearspayment(@RequestParam("bid")Integer bid) {
//        return reportDao.getList(bid);
//
//    }

    @GetMapping(value = "/batchreport/bybatch", params = {"cid"}, produces = "application/json")
    public List<BatchReport> getBatchReport(@RequestParam("cid")Integer cid) {
       List<Batch_Implementation> allbaches = batch_implementationDao.getAllBatches(cid);

        List<BatchReport> batchReports = new ArrayList<>();//
        for(Batch_Implementation b : allbaches){//
            BatchReport br = new BatchReport(); //
            br.setBatchName(b.getBatch_name()); //
            br.setBatchStatus(b.getBatch_status_id().getName()); //
            br.setRegCount(studentBatchRegDao.getAllCountWithoutDelete(b.getId()).getId());//
            br.setDeleteCount(studentBatchRegDao.getDeleteCount(b.getId()).getId());//
            br.setLeaveCount(studentBatchRegDao.getLeaveCount(b.getId()).getId());//
            batchReports.add(br);//
        }
        return batchReports;
    }


//    @GetMapping(value = "/genderreport/bygender", params = {"gender"}, produces = "application/json")
//    public String[][] testGenderReport(@RequestParam ("gender") String gender){
//        return reportDao.getEmployeeByGender(gender);
//    }

    @GetMapping(value = "/genderreport/bygender", params = {"gender"}, produces = "application/json")
        public List<GenderReport> testGenderReport(@RequestParam ("gender") String gender){
        List<GenderReport> genderReportList = new ArrayList<>(); // create empty array

       String[][] GenderreportString = reportDao.getEmployeeByGender(gender); // data list query eken apu
         for( String[] genderrs : GenderreportString){ // read one by one
             //genderreport type eke object ekak
             GenderReport newGendereport = new GenderReport();
             newGendereport.setEmpno(genderrs[0]);
             newGendereport.setEmpcallingname(genderrs[1]);
             newGendereport.setDob(genderrs[2]);

             genderReportList.add(newGendereport); // add object into list
         }
         return genderReportList;
        }



//        @GetMapping(value = "/designationreport/bydesig", produces = "application/json")
//        public String[][] testDesigReport(){
//        return reportDao.getEmployeeByDesignation();
//        }


    //http://localhost:8080/designationreport/bydesig?desig=1
    @GetMapping(value = "/designationreport/bydesig", params = {"desig"}, produces = "application/json")
    public List<DesigReport> testDesigReport(@RequestParam ("desig") String desig){
        List<DesigReport> designationReportlits = new ArrayList<>(); //empty array ekak create krgatta
        String[][] DesignationreportString = reportDao.getEmployeeByDesignation(desig);
        for( String[] designationrs : DesignationreportString){
            DesigReport newdesignationReport = new DesigReport();
            newdesignationReport.setEmpno(designationrs[0]);
            newdesignationReport.setEmpcallingname(designationrs[1]);
            newdesignationReport.setMobileno(designationrs[2]);
            designationReportlits.add(newdesignationReport);
        }

            return designationReportlits;
    }


//    @GetMapping(value = "/resultreport/bystudent", params = {"sid"}, produces = "application/json")
//       public String[][] testResultReport(){
//      return reportDao.getResult();
//}


    @GetMapping(value = "/resultreport/bystudent", params = {"sid"}, produces = "application/json")
    public List<ResultReport> testResultReport(@RequestParam ("sid") Integer sid){
        List<ResultReport> resultReportlits = new ArrayList<>(); //empty array ekak create krgatta
        String[][] ResultreportString = reportDao.getResult(sid);
        for( String[] resultreportrs : ResultreportString){
            ResultReport newreportReport = new ResultReport();
            newreportReport.setExam_name(resultreportrs[0]);
            if (resultreportrs[1].equals("Pass")){
                newreportReport.setPass_or_fail("Pass");
            }
            else {
                newreportReport.setPass_or_fail("Fail");
            }

            resultReportlits.add(newreportReport);
        }

        return resultReportlits;
    }






    //http://localhost:8080/Paymentreport/Paymentreport?studentid=1
    @GetMapping(value = "/Paymentreport/Paymentreport", params = {"studentid"},produces = "application/json")
    public List<Paymentbystudent> paymentbystudents(@RequestParam ("studentid") Integer studentid){
        List<Paymentbystudent> paymentreportlist = new ArrayList<>(); //empty array

        String[][] paymetnreportString = reportDao.getPaymentList(studentid);
        for(String[] paymentrs : paymetnreportString){
            Paymentbystudent newPaymentReport = new Paymentbystudent();
            newPaymentReport.setReg_no(paymentrs[0]);
            newPaymentReport.setBatch_name(paymentrs[1]);
            newPaymentReport.setAmount(paymentrs[2]);
            newPaymentReport.setPay_added_date(paymentrs[3]);
            paymentreportlist.add(newPaymentReport);
        }

        return paymentreportlist;
    }

    //attendance report
    //attendancereport/bydate?batch_id=3&date='2024-07-11'
//    @GetMapping(value = "/attendancereport/bydate", produces = "application/json")
//    public String[][] testattendancereport(){
//        return reportDao.getAttendance();
//    }


    //attendancereport/bydate?batch_id=3&date='2024-07-11'
    @GetMapping(value = "/attendancereport/bydate", params = {"batch_id","date"} ,produces = "application/json")
    public List<AttendanceReport> testattendancereport(@RequestParam("batch_id") String batch_id,
                                                       @RequestParam("date") String date){
        List<AttendanceReport> attendancereportlist = new ArrayList<>();
        String[][] attendancereportstring = reportDao.getAttendance(batch_id,date);
        for (String[] attendancers : attendancereportstring){
            AttendanceReport newAttendancereport = new AttendanceReport();
            newAttendancereport.setCalling_name(attendancers[1]);
            if (attendancers[0].equals("1")){
                newAttendancereport.setPresent_or_absent("Attend");
            }
             else {
                newAttendancereport.setPresent_or_absent("Not-Attend");
            }

            attendancereportlist.add(newAttendancereport);
        }
        return attendancereportlist;
    }


    @GetMapping(value = "/dailypaymentsum/bydateanduser", produces = "application/json")
            public String[][] testDailypaymentsumreport(){
            return reportDao.getDailyPaymentsSum();
            }

    @GetMapping(value = "/dailypaymenttbl/bydateanduser", params = {"date"}, produces = "application/json")
    public List<DailypaymentTblReport> testDailypaymenttblreport(@RequestParam("date") String date){
        System.out.println(date);
        List<DailypaymentTblReport> dailypaymentTblReportlist = new ArrayList<>();
        String[][] dailypaymentTblstring = reportDao.getDailyPaymentsTbl(date);
        System.out.println(dailypaymentTblstring);
        for(String[] dailypaymenttblrs : dailypaymentTblstring){
            DailypaymentTblReport newDailypaymenttblreport = new DailypaymentTblReport();
            newDailypaymenttblreport.setBill_no(dailypaymenttblrs[0]);
            newDailypaymenttblreport.setStudentno(dailypaymenttblrs[1]);
            newDailypaymenttblreport.setCalling_name(dailypaymenttblrs[2]);
            newDailypaymenttblreport.setBatch_name(dailypaymenttblrs[3]);
            newDailypaymenttblreport.setInstallment_no(dailypaymenttblrs[4]);
            newDailypaymenttblreport.setAmount(dailypaymenttblrs[5]);
            newDailypaymenttblreport.setAfter_balance(dailypaymenttblrs[6]);
            newDailypaymenttblreport.setEmpcallingname(dailypaymenttblrs[7]);
            newDailypaymenttblreport.setPay_added_date(dailypaymenttblrs[8]);

            dailypaymentTblReportlist.add(newDailypaymenttblreport);


        }

        return dailypaymentTblReportlist;
    }




    @GetMapping(value = "/custompaymenttbl/bydates", params = {"sdate","edate"}, produces = "application/json")
    public List<CustompaymentTblReport> testCustompaymenttblreport(@RequestParam("sdate") String sdate,
                                                                   @RequestParam("edate") String edate){

        List<CustompaymentTblReport> custompaymentTblReportlist = new ArrayList<>();
        String[][] custompaymentTblstring = reportDao.getCustomPaymentTbl(sdate, edate);
        System.out.println(custompaymentTblstring);
        for(String[] custompaymenttblrs : custompaymentTblstring){
            CustompaymentTblReport newCustompaymenttblreport = new CustompaymentTblReport();
            newCustompaymenttblreport.setBill_no(custompaymenttblrs[0]);
            newCustompaymenttblreport.setStudentno(custompaymenttblrs[1]);
            newCustompaymenttblreport.setCalling_name(custompaymenttblrs[2]);
            newCustompaymenttblreport.setBatch_name(custompaymenttblrs[3]);
            newCustompaymenttblreport.setInstallment_no(custompaymenttblrs[4]);
            newCustompaymenttblreport.setAmount(custompaymenttblrs[5]);
            newCustompaymenttblreport.setAfter_balance(custompaymenttblrs[6]);
            newCustompaymenttblreport.setEmpcallingname(custompaymenttblrs[7]);
            newCustompaymenttblreport.setPay_added_date(custompaymenttblrs[8]);

            custompaymentTblReportlist.add(newCustompaymenttblreport);
        }
        return custompaymentTblReportlist;
    }


//    @GetMapping(value = "/arrearsreport/bybatch", params = {"bid"}, produces = "application/json")
//    public List<Student_Batch_Reg> getArrearspayment(@RequestParam("bid")Integer bid) {
//        return reportDao.getArrearsPayment(bid);
//
//    }


    //arrearsreport/bybatch?bid=3&cid=2
//    @GetMapping(value = "/arrearsreport/bybatch", produces = "application/json")
//        public String[][] testarrearsreport(){
//            return reportDao.getArrearsPayment();
//            }

    @GetMapping(value = "/arrearsreport/bybatch", params = {"bid","cid"}, produces = "application/json")
    public List<ArrearsReport> testarrearsreport(@RequestParam("bid") Integer bid,
                                                 @RequestParam("cid") Integer cid){

        List<ArrearsReport> newArrearspaymentreportlist = new ArrayList<>();
        String[][] arrearsaymentstring = reportDao.getArrearsPayment(bid, cid);

        for(String[] arrearspaymentrs : arrearsaymentstring){
            ArrearsReport newArrearspaymentreport = new ArrearsReport();
            newArrearspaymentreport.setStudentno(arrearspaymentrs[0]);
            newArrearspaymentreport.setCalling_name(arrearspaymentrs[1]);
            newArrearspaymentreport.setMobile_no(arrearspaymentrs[2]);
            newArrearspaymentreport.setBatch_name(arrearspaymentrs[3]);
            newArrearspaymentreport.setPrevious_balance(arrearspaymentrs[4]);
            newArrearspaymentreport.setCourse_fee(arrearspaymentrs[5]);


            newArrearspaymentreportlist.add(newArrearspaymentreport);
        }
        return newArrearspaymentreportlist;
    }


    @GetMapping(value = "/batchcountreport/bycourse", params = {"cid"}, produces = "application/json")
    public List<BatchCountReport> testbatchcountreport(@RequestParam("cid") Integer cid){

        List<BatchCountReport> newBatchCountReportList = new ArrayList<>();
        String[][] bacthcountreportstring = reportDao.getBatchCount(cid);

        for(String[] bacthcountreportrs : bacthcountreportstring){
            BatchCountReport newBatchCountreport = new BatchCountReport();
            newBatchCountreport.setBatch_name(bacthcountreportrs[0]);
            newBatchCountreport.setS_count(bacthcountreportrs[1]);



            newBatchCountReportList.add(newBatchCountreport);
        }
        return newBatchCountReportList;
    }

    @GetMapping(value = "/dailybacthcount/bydate", params = {"bid","date"}, produces = "application/json")
    public List<DailyBatchReport> testbatchcountreport(@RequestParam("bid") Integer bid,
                                                       @RequestParam("date") String date){

        List<DailyBatchReport> newDailyBatchReportList = new ArrayList<>();
        String[][] dailybatchcountreportstring = reportDao.getBatchRegByDate(bid,date);
        System.out.println(dailybatchcountreportstring.length);
        for(String[] dailybatchreportrs : dailybatchcountreportstring){
            DailyBatchReport newDailyBatchreport = new DailyBatchReport();
            newDailyBatchreport.setStudentno(dailybatchreportrs[0]);
            newDailyBatchreport.setCalling_name(dailybatchreportrs[1]);
            newDailyBatchreport.setBatch_name(dailybatchreportrs[2]);

            newDailyBatchReportList.add(newDailyBatchreport);
        }
        return newDailyBatchReportList;
    }


    @GetMapping(value = "/getreuslt/byexam", params = {"eid"}, produces = "application/json")
    public List<ExamResult> testgetresult(@RequestParam("eid") Integer eid){

        List<ExamResult> examresultlist = new ArrayList<>();
        String[][] examresultliststring = reportDao.getResultReport(eid);

        for(String[] examresultrs : examresultliststring){
            ExamResult newexamresultlist = new ExamResult();
            newexamresultlist.setStudentno(examresultrs[0]);
            newexamresultlist.setCalling_name(examresultrs[1]);
            newexamresultlist.setResult(examresultrs[2]);
            newexamresultlist.setPass_or_fail(examresultrs[3]);

            examresultlist.add(newexamresultlist);
        }

        return examresultlist;
    }






}






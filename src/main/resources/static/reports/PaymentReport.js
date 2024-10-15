window.addEventListener('load', loadUI);

//window eka load weddi watena function eka
function loadUI() {
    console.log("Browser onload");

  refreshPaymentReport();
    // $( "#cmbCourseName" ).select2({
    //     theme: "bootstrap"
    // });

    loggedUserPrivilege = getServiceRequest("/privilage/bymodule/"+"ATTENDANCE_MANAGEMENT" );

    // refreshAttendanceTable();
    // refreshAttendanceForm();


    //enable tooltip
    $('[data-bs-toggle = "tooltip"]').tooltip();
}


function rowDelete(sessionob){

}

// function refreshPaymentReport(){
//
//     courselist = getServiceRequest("/course/findall");
//     fillSelectFeild (cmbCourseName, "Select Course name", courselist, 'course_name', '');
//
// }

function refreshPaymentReport(){

}


const btnGenReport = () => {

    paymentReports = getServiceRequest("/paymentreport/bysdateedatetype?sdate="+startDate.value+"&edate="+endDate.value+"&type="+cmbReportType.value);
    console.log(paymentReports);
    let displayPropertyList = ['name','fee'];
    let displayDataList = ['text','text'];
    fillDataTable (tblPaymentReport, paymentReports, displayPropertyList,displayDataList,formRefill, rowDelete, rowView,false, true,[],loggedUserPrivilege);


   }

const btnPrintReport = () => {

    let newwindow = window.open();
    let tablehtml = tblPaymentReport.outerHTML;
    newwindow.document.write(
        "<link rel='stylesheet' href='assets/vendor/bootstrap/css/bootstrap.min.css'>"+

        "<div>"+tablehtml+"</div>"
    );

}

// const btnPrintReportArr = () => {
//     let newwindow = window.open();
//     let tablehtml = tblArrearsPayment.outerHTML;
//     newwindow.document.write(
//         "<link rel='stylesheet' href='assets/vendor/bootstrap/css/bootstrap.min.css'>"+
//
//         "<div>"+tablehtml+"</div>"
//     );
// }






function getBatchName(){

    batchname = getServiceRequest("/batch/batchnameaccortocourse?id="+JSON.parse(cmbCourseName.value).id);
    fillSelectFeild(cmbBatchname,"Select Batch Name",batchname,'batch_name','');


}

const getMonthlyArrears = () => {

    console.log(JSON.parse(cmbBatchname.value))



}

const formRefill = () => {


}

const rowView = () => {

}





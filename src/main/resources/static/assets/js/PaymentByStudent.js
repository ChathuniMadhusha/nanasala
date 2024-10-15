window.addEventListener('load', loadUI);

//window eka load weddi watena function eka
function loadUI() {
    console.log("Browser onload");

    refreshBatchReport();
   // refreshBatchReportTable();

    loggedUserPrivilege = getServiceRequest("/privilage/bymodule/"+"ATTENDANCE_MANAGEMENT" );

    //enable tooltip
    $('[data-bs-toggle = "tooltip"]').tooltip();
}


function refreshBatchReport(){

    // courselist = getServiceRequest("/course/findall");
    // fillSelectFeild (cmbCourseName, "Select Course name", courselist, 'course_name', '');

}


const btnGenReportBatch = () => {

    paymentbystudent = getServiceRequest("/Paymentreport/Paymentreport?studentid="+stu.id)

    let displayPropertyList = ['reg_no','batch_name','amount','pay_added_date'];
    let displayDataList = ['text','text','text','text'];

    fillDataTable (tblPaymentbystudent, paymentbystudent, displayPropertyList,displayDataList,formRefill, rowDelete, rowView,false, true,[],loggedUserPrivilege);


}

const btnPrintReportBatch = () => {
    let newwindow = window.open();
    let tablehtml = tblBatchList.outerHTML;
    newwindow.document.write(
        "<link rel='stylesheet' href='assets/vendor/bootstrap/css/bootstrap.min.css'>" +

        "<div>" + tablehtml + "</div>"
    );
}


function getStudentName() {

    let exLenth = txtStuNo.value;
    if(exLenth.length == 8){

        stu = getServiceRequest("student/getbystudentno?studentno=" + exLenth);
        stuName.value = stu.calling_name;

        setValid(stuName)

    }else {

    }
}

const formRefill = () => {


}

const rowView = () => {

}

const rowDelete = () => {

}




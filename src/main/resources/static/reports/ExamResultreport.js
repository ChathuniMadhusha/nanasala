window.addEventListener('load', loadUI);

//window eka load weddi watena function eka
function loadUI() {
    console.log("Browser onload");

    //refreshBatchReport();
   // refreshBatchReportTable();

    loggedUserPrivilege = getServiceRequest("/privilage/bymodule/"+"ATTENDANCE_MANAGEMENT" );

    //enable tooltip
    $('[data-bs-toggle = "tooltip"]').tooltip();
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



const btnGenReportBatch = () => {

    resultreport = getServiceRequest("/resultreport/bystudent?sid="+stu.id)

    let displayPropertyList = ['exam_name','pass_or_fail'];
    let displayDataList = ['text','text'];

    fillDataTable (tblExamResult, resultreport, displayPropertyList,displayDataList,formRefill, rowDelete, rowView,false, true,[],loggedUserPrivilege);


}

const btnPrintReportBatch = () => {
    let newwindow = window.open();
    let tablehtml = tblBatchList.outerHTML;
    newwindow.document.write(
        "<link rel='stylesheet' href='assets/vendor/bootstrap/css/bootstrap.min.css'>" +

        "<div>" + tablehtml + "</div>"
    );
}

const formRefill = () => {


}

const rowView = () => {

}

const rowDelete = () => {

}




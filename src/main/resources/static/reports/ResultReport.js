window.addEventListener('load', loadUI);

//window eka load weddi watena function eka
function loadUI() {
    console.log("Browser onload");

    refreshResultReport();
    // refreshreport();
   // refreshBatchReportTable();

    loggedUserPrivilege = getServiceRequest("/privilage/bymodule/"+"ATTENDANCE_MANAGEMENT" );

    //enable tooltip
    $('[data-bs-toggle = "tooltip"]').tooltip();
}


// function refreshreport(){
//     batch_names = getServiceRequest("/batch/listbyloggeduser");
//     fillSelectFeild (cmbBatchName, "Select Batch name", batch_names, 'batch_name', '');
// }

function refreshResultReport(){

    coursename = getServiceRequest("/course/findall");
    fillSelectFeild(cmbCourseName,"Select Course Name",coursename,'course_name','');
}



const btnGenReportBatch = () => {

    // dailypayments = getServiceRequest("/dailypaymenttbl/bydateanduser?date="+dateD.value+"&user=")
console.log(JSON.parse(cmbExamName.value).id);
     finalresult= getServiceRequest("/getreuslt/byexam?eid="+JSON.parse(cmbExamName.value).id)
    console.log(finalresult);

    let displayPropertyList = ['studentno','calling_name','result','pass_or_fail'];
    let displayDataList = ['text','text','text','text'];

    fillDataTable (tblFinalResult, finalresult, displayPropertyList,displayDataList,formRefill, rowDelete, rowView,false, true,[],loggedUserPrivilege);



}

const btnPrintReportBatch = () => {
    let newwindow = window.open();
    let tablehtml = tblBatchList.outerHTML;
    newwindow.document.write(
        "<link rel='stylesheet' href='assets/vendor/bootstrap/css/bootstrap.min.css'>" +

        "<div>" + tablehtml + "</div>"
    );
}


function getExamList(){

    // batchname = getServiceRequest("/batch/batchnameaccortocourse?id="+JSON.parse(cmbCourseName.value).id);
    // fillSelectFeild(cmbBatchname,"Select Batch Name",batchname,'batch_name','');

    examnames = getServiceRequest("/exam/examlistaccorcourse?course_name="+JSON.parse(cmbCourseName.value).course_name);
    fillSelectFeild(cmbExamName,"Select Exam Name",examnames,'exam_name','');


}




const formRefill = () => {


}

const rowView = () => {

}

const rowDelete = () => {

}




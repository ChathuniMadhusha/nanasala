window.addEventListener('load', loadUI);

//window eka load weddi watena function eka
function loadUI() {
    console.log("Browser onload");

    refreshArrearsReport();


    loggedUserPrivilege = getServiceRequest("/privilage/bymodule/"+"ATTENDANCE_MANAGEMENT" );

    //enable tooltip
    $('[data-bs-toggle = "tooltip"]').tooltip();
}


function refreshArrearsReport(){

    courselist = getServiceRequest("/course/findall");
    fillSelectFeild (cmbCourseName, "Select Course name", courselist, 'course_name', '');

}


const btnGenReportArr = () => {

    //arrearsreport = getServiceRequest("/arrearsreport/bybatch?bid="+JSON.parse(cmbBatchname.value).id)
    arrearsreport = getServiceRequest("/arrearsreport/bybatch?bid="+JSON.parse(cmbBatchname.value).id+"&cid="+JSON.parse(cmbCourseName.value).id)

    let displayPropertyList = ['studentno','calling_name','mobile_no','batch_name','previous_balance','course_fee'];
    let displayDataList = ['text','text','text','text','text','text'];

    fillDataTable (tblArrearsPayment, arrearsreport, displayPropertyList,displayDataList,formRefill, rowDelete, rowView,false, true,[],loggedUserPrivilege);


}

const btnPrintReportArr = () => {
    let newwindow = window.open();
    let tablehtml = tblArrearsPayment.outerHTML;
    newwindow.document.write(
        "<link rel='stylesheet' href='assets/vendor/bootstrap/css/bootstrap.min.css'>" +

        "<div>" + tablehtml + "</div>"
    );
}

function getBatchName(){

    // batchname = getServiceRequest("/batch/batchnameaccortocourse?id="+JSON.parse(cmbCourseName.value).id);
    // fillSelectFeild(cmbBatchname,"Select Batch Name",batchname,'batch_name','');

    batchname = getServiceRequest("/batch/batchnameaccortoonlycourse?id="+JSON.parse(cmbCourseName.value).id);
    fillSelectFeild(cmbBatchname,"Select Batch Name",batchname,'batch_name','');


}

const getMonthlyArrears = () => {

    console.log(JSON.parse(cmbBatchname.value))



}

const formRefill = () => {


}

const rowView = () => {

}

const rowDelete = () => {

}



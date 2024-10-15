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

    courselist = getServiceRequest("/course/findall");
    fillSelectFeild (cmbCourseName, "Select Course name", courselist, 'course_name', '');

}


const btnGenReportBatch = () => {

    batchreport = getServiceRequest("/batchreport/bybatch?cid="+JSON.parse(cmbCourseName.value).id)

    let displayPropertyList = ['batchName','batchStatus','regCount','deleteCount','leaveCount'];
    let displayDataList = ['text','text','text','text','text'];

    fillDataTable (tblBatchList, batchreport, displayPropertyList,displayDataList,formRefill, rowDelete, rowView,false, true,[],loggedUserPrivilege);


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




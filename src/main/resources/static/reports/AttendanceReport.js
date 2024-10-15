window.addEventListener('load', loadUI);

//window eka load weddi watena function eka
function loadUI() {
    console.log("Browser onload");

    refreshreport();
   // refreshBatchReportTable();

    loggedUserPrivilege = getServiceRequest("/privilage/bymodule/"+"ATTENDANCE_MANAGEMENT" );

    //enable tooltip
    $('[data-bs-toggle = "tooltip"]').tooltip();
}


function refreshreport(){
    batch_names = getServiceRequest("/batch/findall");
    fillSelectFeild (cmbBatchName, "Select Batch name", batch_names, 'batch_name', '');
}


const btnGenReportBatch = () => {

    attendancereport = getServiceRequest("/attendancereport/bydate?batch_id="+JSON.parse(cmbBatchName.value).id+"&date="+dateD.value)

    let displayPropertyList = ['calling_name','present_or_absent'];
    let displayDataList = ['text','text'];

    fillDataTable (tblAttendanceReport, attendancereport, displayPropertyList,displayDataList,formRefill, rowDelete, rowView,false, true,[],loggedUserPrivilege);



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




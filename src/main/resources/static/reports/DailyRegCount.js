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

    batchlist = getServiceRequest("/batch/findall");
    fillSelectFeild (cmbBatchName, "Select Batch name", batchlist, 'batch_name', '');

}


const btnGenReportArr = () => {

    //arrearsreport = getServiceRequest("/arrearsreport/bybatch?bid="+JSON.parse(cmbBatchname.value).id)
    arrearsreport = getServiceRequest("/dailybacthcount/bydate?bid="+JSON.parse(cmbBatchName.value).id+"&date="+dateD.value)

    let displayPropertyList = ['studentno','calling_name','batch_name'];
    let displayDataList = ['text','text','text'];

    fillDataTable (tblDailyBatchReport, arrearsreport, displayPropertyList,displayDataList,formRefill, rowDelete, rowView,false, true,[],loggedUserPrivilege);

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



const formRefill = () => {


}

const rowView = () => {

}

const rowDelete = () => {

}



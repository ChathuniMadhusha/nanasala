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

    designationlist = getServiceRequest("/designations/getlist");
    fillSelectFeild (cmbDesignation, "Select Designation", designationlist, 'name', '');

}


const btnGenReportBatch = () => {

    designationreport = getServiceRequest("/designationreport/bydesig?desig="+JSON.parse(cmbDesignation.value).id)

    let displayPropertyList = ['empno','empcallingname','mobileno'];
    let displayDataList = ['text','text','text'];

    fillDataTable (tblDesignationList, designationreport, displayPropertyList,displayDataList,formRefill, rowDelete, rowView,false, true,[],loggedUserPrivilege);


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




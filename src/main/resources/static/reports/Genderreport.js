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

    gendrereport = getServiceRequest("/genderreport/bygender?gender="+cmbGender.value)

    let displayPropertyList = ['empno','empcallingname','dob'];
    let displayDataList = ['text','text','text'];

    fillDataTable (tblGenderList, gendrereport, displayPropertyList,displayDataList,formRefill, rowDelete, rowView,false, true,[],loggedUserPrivilege);


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




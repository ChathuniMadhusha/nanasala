window.addEventListener('load', loadUI);

//window eka load weddi watena function eka
function loadUI() {
    console.log("Browser onload");

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


const btnGenReportBatch = () => {

    // dailypayments = getServiceRequest("/dailypaymenttbl/bydateanduser?date="+dateD.value+"&user=")

    dailypayments = getServiceRequest("/dailypaymenttbl/bydateanduser?date="+dateD.value)

    let displayPropertyList = ['bill_no','studentno','calling_name','batch_name','installment_no','amount','after_balance','empcallingname','pay_added_date'];
    let displayDataList = ['text','text','text','text','text','text','text','text','text'];

    fillDataTable (tblDailyPaymentsReport, dailypayments, displayPropertyList,displayDataList,formRefill, rowDelete, rowView,false, true,[],loggedUserPrivilege);



}

const btnPrintDailyPayment = () => {
    let newwindow = window.open();
    let tablehtml = tblDailyPaymentsReport.outerHTML;
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




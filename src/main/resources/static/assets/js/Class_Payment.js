window.addEventListener('load', loadUI);

//window eka load weddi watena function eka
function loadUI() {
    console.log("Browser onload");


    // $( "#cmbCourseName" ).select2({
    //     theme: "bootstrap"
    // });

    loggedUserPrivilege = getServiceRequest("/privilage/bymodule/"+"CLASS_PAYMENT" );

    refreshClassPaymentTable();
    refreshClassPaymentForm();



    //enable tooltip
    $('[data-bs-toggle = "tooltip"]').tooltip();
}

const refreshClassPaymentTable = () => {
    classpayment = getServiceRequest("/classpayment/findall")

    //properties list eka
    let displayPropertyList = ['class_registration_id.student_id.studentno','class_registration_id.student_id.calling_name','class_registration_id.class_details_id.class_name','class_registration_id.monthly_fee'];
    let displayDataList = ['object','object','object','object'];
    //let statusColorList = [{name:"Deleted", colorClass:"deleted-cell-style",buttondisabled:true},{name:"Active", colorClass:"active-cell-style",buttondisabled:false},{name:"Temporary Unavilaible", colorClass:"temporary-unavilable-cell-style",buttondisabled:false}];
    //fillDataTable (tblCoursePayment, coursepayment, displayPropertyList, displayDataList, formRefill, rowDelete, rowView,true, true, statusColorList,loggedUserPrivilege);
    fillDataTableNew(tblClassPayment, classpayment, displayPropertyList, displayDataList, true, 'editob',btnView);


    $('#tblClassPayment').dataTable();
}

function getCallingName(ob) {
    return ob.reg_no + "(" + ob.student_id.calling_name + ")";
}



const resetStuBatchRegistration = () => {

    txtRegNo.value = "";
    setDefauld(txtRegNo);

    stuName.value = "";
    setDefauld(stuName);

    cmbCourseName.value = "";
    setDefauld(cmbCourseName);

    cmbBatchName.value = "";
    setDefauld(cmbBatchName);

    txtCourseFee.value = "";
    setDefauld(txtCourseFee);

    txtRegFee.value = "";
    setDefauld(txtRegFee);

    dteRegDate.value = "";
    setDefauld(dteRegDate);


}


const btnAddMC = () => {
    //submit krddi ena mg eka
    let submitMsg = 'Are you sure to add following Payment....!' + '<br>' + '' + '<br>' + 'Student Name : ' + stuName.value
        + '<br>' + 'Class Name : ' + JSON.parse(cmbClassName.value).class_name;
    //errors tynwda kiyla check krnwa
    let errors = checkError();

    //errors nathnm ....
    if (errors == "") {
        console.log(classpayment);
        iziToast.info({
            messageColor: 'black',
            message: submitMsg,
            position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
            progressBarColor: 'rgb(0, 255, 184)',
            buttons: [
                ['<button style="color: black"><b>Ok</b></button>', function (instance, toast) {
                    instance.hide({transitionOut: 'fadeOutUp'}, toast);
                    //server eken error ekak enwda kiyla blnwa..

                    let serverResponce = httpServiceRequest("/classpayment", "POST", classpayment);
                    //let serverResponce = "0";
                    if (serverResponce == "0") {
                        //server error ekak nathnm employeewa add wenwa
                        iziToast.success({
                            title: 'OK Payment Add Successfully...!',
                            position: 'topRight',
                        });
                        refreshClassPaymentTable();
                        refreshClassPaymentForm();
                       // resetStuBatchRegistration();

                        changeTab("table");
                    } else {
                        //server error ekak tyenwnm add wene nha,, me wdhta error mg eka enwa
                        iziToast.error({
                            title: 'Error Not Successfully inserted \n' + serverResponce,
                            position: 'topRight',
                            //message: 'Not Successfully inserted \n' + serverResponce,
                        });
                    }
                }, true], // true to focus
                ['<button style="color: red"><b>Close</b></button>', function (instance, toast) {
                    instance.hide({
                        transitionOut: 'fadeOutUp',
                        onClosing: function () {
                            console.info('closedBy: ' + closedBy); // The return will be: 'closedBy: buttonName'
                        }
                    }, toast, 'buttonName');
                }]
            ],
            onOpening: function (instance, toast) {
                console.info('callback abriu!');
            },
            onClosing: function (instance, toast, closedBy) {
                console.info('closedBy: ' + closedBy); // tells if it was closed by 'drag' or 'button'
            }
        });
        //uda check karapu thana errors tynwnm menna me errors tynwa kiyla mg eka enwa
    } else {
        //alert("you have following error"+ errors);
        iziToast.error({
            title: 'You Have Following Errors : ' + '<br>' + errors,
            position: 'topRight',
            //message: 'Not Successfully inserted \n' + serverResponce,
        });
    }

}

const checkError = () => {
    let errors = "";

    if (classpayment.class_registration_id == null) {
        setInvalid(cmbClassName);
        cmbClassName.style.border = '2px solid red';
        errors = errors + "Class is not Entered...  \n";
    } else {
    }

    if (classpayment.previous_balance == null) {
        setInvalid(txtPreviousBalance);
        txtPreviousBalance.style.border = '2px solid red';
        errors = errors + "Previous balance is not Entered...  \n";
    } else {
    }

    if (classpayment.handover_payment_for_ins == null) {
        setInvalid(txthandoverpForIns);
        txthandoverpForIns.style.border = '2px solid red';
        errors = errors + "Paid Amount is not Entered...  \n";
    } else {
    }

    if (classpayment.paid_amount == null) {
        setInvalid(txtPaidAmount);
        txtPaidAmount.style.border = '2px solid red';
        errors = errors + "Aftre Balance is not Entered...  \n";
    } else {
    }

    if (classpayment.hansover_payment_for_stu == null) {
        setInvalid(txtPayForStudent);
        txtPayForStudent.style.border = '2px solid red';
        errors = errors + "Aftre Balance is not Entered...  \n";
    } else {
    }
    // if (classpayment.balance_amount == null) {
    //     setInvalid(txtAfterBalance);
    //     txtAfterBalance.style.border = '2px solid red';
    //     errors = errors + "Aftre Balance is not Entered...  \n";
    // } else {
    // }

    if (classpayment.pay_method_id == null) {
        setInvalid(cmbPayMethod);
        cmbPayMethod.style.border = '2px solid red';
        errors = errors + "Aftre Balance is not Entered...  \n";
    } else {
    }

    return errors;

}

function rowView(cpob){

    // printcoursepay = getServiceRequest("/coursepayment/getbyid?id="+cpob.id);
    //
    // $('#classPayView').modal('show');
    // tdStuName.innerHTML = printcoursepay.registration_id.student_id.calling_name;
    // tdStuNumber.innerHTML = printcoursepay.registration_id.student_id.studentno;
    // tdBatchName.innerHTML = printcoursepay.registration_id.batch_id.batch_name;
    // tdPaidAmount.innerHTML = printcoursepay.amount;
    // tdInsNumber.innerHTML = printcoursepay.installment_no;
    // tdAfterBal.innerHTML = printcoursepay.after_balance;
    // tdPayType.innerHTML = printcoursepay.pay_type_id.name;
    // tdPayAddedDate.innerHTML = printcoursepay.pay_added_date;

}


function printCoursePayView(){
    let newWindow =  window.open();

    newWindow.document.write(" <link href=\"assets/vendor/bootstrap/css/bootstrap.min.css\" rel=\"stylesheet\">"
        +"<script src=\"assets/Libraries/jQuery/jQuery.js\"></script>"+"<h2>Payment Slip</h2>"
        + tableCoursePaymentView.outerHTML);

    //set time out
    setTimeout(() => {
        newWindow.print();
    }, 1000);
}


const refreshClassPaymentForm = () => {

    classpayment = new Object();
    oldclasspayment = null;

    paytypes = getServiceRequest("/classpaymethod/getlist");
    fillSelectFeild (cmbPayMethod, "Select Payment Method", paytypes, 'name', 'cash' );
    classpayment.pay_method_id = JSON.parse(cmbPayMethod.value);
    cmbPayMethod.style.border = "2px solid green";

    // paystatuses = getServiceRequest("/paymentstatus/getlist");
    // fillSelectFeild (cmbPayStatus, "Select Payment Status", paystatuses, 'name', 'Active', true );
    // coursepayment.payment_status_id = JSON.parse(cmbPayStatus.value);
    // cmbPayStatus.style.border = "2px solid green";

    // getregistrationaccorstudentegno = getServiceRequest("/stubatchreg/batchaccrorstudent")
    // fillSelectFeild (cmbBatchName, "Select Batch Name", getregistrationaccorstudentegno,'registration_id.batch_id','');
    //
    // datePayAdded.value = getCurrentDate("date" , "");



    buttonDisable(true,false);

    }




function getStudentName() {

    let exLenth = txtRegNo.value;
    if(exLenth.length == 8){

        stu = getServiceRequest("/student/getbystudentno?studentno=" + exLenth);
        stuName.value = stu.calling_name;
        console.log(stu.id)
       // coursepayment.registration_id.student_id = stu;
        getClassRegList(stu.id);
        setValid(stuName);

    }else {

    }
}

//student register wela inna classs list eka ganna
function getClassRegList(sid) {
    console.log("sid")
    console.log(sid)

    classRegList= getServiceRequest("/stuclassreg/classaccorstudent?studentno="+sid)
    fillSelectFeild (cmbClassName, "Select Class Name", classRegList,'class_details_id.class_name','');

}

function getPrevBalance() {

    txtPreviousBalance.value = JSON.parse(cmbClassName.value).monthly_fee;
    classpayment.previous_balance = txtPreviousBalance.value;

}


function getHandOverPayForStudent(){

    var studentBalanceAmount = '';

    if(txthandoverpForIns.value !="" && txtPaidAmount.value !=""){
        studentBalanceAmount = parseFloat(txthandoverpForIns.value) - parseFloat(txtPaidAmount.value);
    } else{


    }

    txtPayForStudent.value = studentBalanceAmount;

    classpayment.hansover_payment_for_stu = txtPayForStudent.value;
    setValid(txtPayForStudent);


}

function getAfterAmount() {

    var afteramount = ``;

    let patern = new RegExp("^([1-9)[0-9]{2,})$");

    if(patern.test(txthandoverpForIns.value)){
        if(txtPreviousBalance.value !="" && txtPaidAmount.value !="" && parseFloat(txtPaidAmount.value) <= parseFloat(txtPreviousBalance.value)){
            afteramount = parseFloat(txtPreviousBalance.value) - parseFloat(txtPaidAmount.value);
        } else {
            let pattern = new RegExp("^([1-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9])$");
            setInvalid(txtPaidAmount);
        }

    }

    txtAfterBalance.value = afteramount;
    classpayment.balance_amount = txtAfterBalance.value;
    setValid(txtAfterBalance);



}


function fillDataIntoList(defaultList, givenList) {
    for (let index in givenList) {
        defaultList.push(givenList[index]);

    }
    return defaultList;
}

function removeObjectByList(list, value, property) {
    let ext = false;
    let extIndex;

    for (let index in list) {

        if (list[index][property] == value) {
            extIndex = index;
            ext = true;
            break;
        }
    }

    if (ext) {
        list.splice(extIndex, 1);

    }
    return list;

}

const buttonDisable = (submit, modify) => {

    if(submit && loggedUserPrivilege.insert){

        $("#btnAddCourse").css('pointer-event', 'all');
        $("#btnAddCourse").css('cursor', 'pointer');
        $("#btnAddCourse").removeAttr('disabled');
    }else {
        $("#btnAddCourse").css('pointer-event', 'all');
        $("#btnAddCourse").css('cursor', 'not-allowed');
        $("#btnAddCourse").attr('disabled','disabled');
    }

    if(modify && loggedUserPrivilege.update){

        btnUpdate.removeAttribute('disabled');
        $("#btnUpdate").css('pointer-event', 'all');
        $("#btnUpdate").css('cursor', 'pointer');

    }else{
        $("#btnUpdate").attr('disabled','disabled');
        $("#btnUpdate").css('pointer-event', 'all');
        $("#btnUpdate").css('cursor', 'not-allowed');

    }
}

    function changeTab(uitype) {
        if (uitype == "form") {
            divTable.style.display = "none";
            divForm.style.display = "block";
    
            navLinkForm.classList.add("active");
            navLinkTable.classList.remove("active");
        } else {
            divTable.style.display = "block";
            divForm.style.display = "none";
    
            navLinkTable.classList.add("active");
            navLinkForm.classList.remove("active");
        }
    
    }


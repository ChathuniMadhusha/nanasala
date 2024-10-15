window.addEventListener('load', loadUI);

//window eka load weddi watena function eka
function loadUI() {
    console.log("Browser onload");


    // $( "#cmbCourseName" ).select2({
    //     theme: "bootstrap"
    // });

    loggedUserPrivilege = getServiceRequest("/privilage/bymodule/" + "COURSE_PAYMENT");

    refreshCoursePaymentTable();
    refreshCoursePaymentForm();


    //enable tooltip
    $('[data-bs-toggle = "tooltip"]').tooltip();
}

const refreshCoursePaymentTable = () => {
    coursepayment = getServiceRequest("/coursepayment/findall")

    //properties list eka
    let displayPropertyList = ['registration_id.student_id.studentno', 'registration_id.student_id.calling_name', 'registration_id.batch_id.batch_name', 'installment_no', 'amount', 'pay_added_date'];
    let displayDataList = ['object', 'object', 'object', 'text', 'text', 'text'];
    //let statusColorList = [{name:"Deleted", colorClass:"deleted-cell-style",buttondisabled:true},{name:"Active", colorClass:"active-cell-style",buttondisabled:false},{name:"Temporary Unavilaible", colorClass:"temporary-unavilable-cell-style",buttondisabled:false}];
    //fillDataTable (tblCoursePayment, coursepayment, displayPropertyList, displayDataList, formRefill, rowDelete, rowView,true, true, statusColorList,loggedUserPrivilege);
    fillDataTableNew(tblCoursePayment, coursepayment, displayPropertyList, displayDataList, true, 'editob', btnEdit, btnView);

    // for(let index in coursepayment){
    //
    //     let currentdate = getCurrentDate("date","");
    //     let paymentdates = coursepayment[index].pay_added_date.split("T");
    //     console.log(currentdate)
    //     console.log(paymentdates)
    //                 if(currentdate != paymentdates[0]){ console.log(paymentdates[0])
    //
    //                     tblCoursePayment.children[1].children[index].children[7].children[0].disabled=true;
    //
    //     }
    //
    //     tblCoursePayment.children[1].children[index].children[7].children[1].style.display="none";
    // }

    $('#tblCoursePayment').dataTable();
}

function getCallingName(ob) {
    return ob.reg_no + "(" + ob.student_id.calling_name + ")";
}

function formRefill(cousepay) {

    coursepayment = getServiceRequest("coursepayment/getbyid?id=" + window[cousepay]['id']);
    oldcoursepayment = getServiceRequest("coursepayment/getbyid?id=" + window[cousepay]['id']);

    let currentdate = getCurrentDate("date", "");

    if (coursepayment.pay_added_date.split("T")[0] < currentdate) {

        iziToast.info({
            backgroundColor: 'rgb(247 205 149)',
            title: 'Can not edit Payment \n',
            position: 'topRight',
        });

    } else {
        changeTab("form");

        txtRegNo.value = coursepayment.registration_id.student_id.studentno;
        setValid(txtRegNo);
        txtRegNo.style.border = "2px solid green";

        stuName.value = coursepayment.registration_id.student_id.calling_name;
        setValid(stuName);
        stuName.style.border = "2px solid green";

        txtPrevBalance.value = coursepayment.previous_balance;
        setValid(txtPrevBalance);
        txtPrevBalance.style.border = "2px solid green";

        txtPaidAmount.value = coursepayment.amount;
        setValid(txtPaidAmount);
        txtPaidAmount.style.border = "2px solid green";

        txtAfterBalance.value = coursepayment.after_balance;
        setValid(txtAfterBalance);
        txtAfterBalance.style.border = "2px solid green";

        txtHOPayForIns.value = coursepayment.hand_over_amount_for_ins;
        setValid(txtHOPayForIns);
        txtHOPayForIns.style.border = "2px solid green";

        txtHOPayForStu.value = coursepayment.hand_over_amount_for_stu;
        setValid(txtHOPayForStu);
        txtHOPayForStu.style.border = "2px solid green";

        datePayAdded.value = coursepayment.pay_added_date;
        setValid(datePayAdded);
        datePayAdded.style.border = "2px solid green";


        batchlist = getServiceRequest("/stubatchreg/batchaccrorstudent?studentno=" + coursepayment.registration_id.student_id.id)
        console.log(coursepayment.registration_id.batch_id.batch_name)
        fillSelectFeild(cmbBatchName, "Select Batch name", batchlist, 'batch_id.batch_name', coursepayment.registration_id.batch_id.batch_name);
        cmbBatchName.style.border = "2px solid green";

        fillSelectFeild(cmbPayType, "Select Payment Type", paytypes, 'name', coursepayment.pay_type_id.name);
        cmbPayType.style.border = "2px solid green";

        buttonDisable(false, true);
    }


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

function rowDelete() {


}

const btnAddMC = () => {
    //submit krddi ena mg eka
    let submitMsg = 'Are you sure to add following Payment....!' + '<br>' + '' + '<br>' + 'Student Name : ' + stuName.value
        + '<br>' + 'Batch Name : ' + coursepayment.registration_id.batch_id.batch_name;
    //errors tynwda kiyla check krnwa
    let errors = checkError();
    //errors nathnm ....
    if (errors == "") {
        iziToast.info({
            messageColor: 'black',
            message: submitMsg,
            position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
            progressBarColor: 'rgb(0, 255, 184)',
            buttons: [
                ['<button style="color: black"><b>Ok</b></button>', function (instance, toast) {
                    instance.hide({transitionOut: 'fadeOutUp'}, toast);
                    //server eken error ekak enwda kiyla blnwa..
                    let serverResponce = httpServiceRequest("/coursepayment", "POST", coursepayment);
                    //let serverResponce = "0";
                    if (serverResponce == "0") {
                        //server error ekak nathnm employeewa add wenwa
                        iziToast.success({
                            title: 'OK Payment Add Successfully...!',
                            position: 'topRight',
                        });
                        refreshCoursePaymentTable();
                        refreshCoursePaymentForm();
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

const btnUpdateMC = () => {
    console.log(coursepayment);
    let errors = checkError()
    if (errors == "") {
        let update = checkUpdate();
        if (update != "") {
            iziToast.success({
                title: 'No Changes',
                position: 'topCenter',
            });
        } else {
            //let updaterespoce = window.confirm("Are Your sure to update this fiels : " + updates);
            iziToast.info({
                messageColor: 'black',
                title: 'Are Your sure to update this fiels :' + update,
                position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
                progressBarColor: 'rgb(0, 255, 184)',
                buttons: [
                    ['<button style="color: black"><b>Ok</b></button>', function (instance, toast) {
                        instance.hide({transitionOut: 'fadeOutUp'}, toast);
                        let putresponce = httpServiceRequest("/coursepayment", "PUT", coursepayment);
                        if (putresponce == "0") {
                            //window.alert("Update Successfully...")
                            iziToast.success({
                                title: 'Update Successfully...!',
                                position: 'topRight',
                            });
                            refreshCoursePaymentTable();
                            refreshCoursePaymentForm();
                            changeTab("table");
                        } else {
                            iziToast.error({
                                title: 'Error Not Successfully Update...' + putresponce,
                                position: 'topCenter',
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
        }
    } else {
        iziToast.error({
            title: 'Error Not Successfully Update...' + errors,
            position: 'topRight',
            //message: 'Not Successfully inserted \n' + serverResponce,
        });
    }
}

const checkUpdate = () => {
    let update = "";

    if (coursepayment != null && oldcoursepayment != null) {
        if (coursepayment.txtRegNo != oldcoursepayment.txtRegNo) {
            update = update + "Reg No is changed \n";
        }
        if (coursepayment.stuName != oldcoursepayment.stuName) {
            update = update + "Student Name is changed \n";
        }
        if (coursepayment.cmbBatchName != oldcoursepayment.cmbBatchName) {
            update = update + "Batch name is changed \n";
        }
        if (coursepayment.txtPrevBalance != oldcoursepayment.txtPrevBalance) {
            update = update + "Previous Balance is changed \n";
        }
        if (coursepayment.txtPaidAmount != oldcoursepayment.txtPaidAmount) {
            update = update + "Paid Amount is changed \n";
        }
        if (coursepayment.txtAfterBalance != oldcoursepayment.txtAfterBalance) {
            update = update + "After Balance is changed \n";
        }
        if (coursepayment.cmbPayType != oldcoursepayment.cmbPayType) {
            update = update + "Payment Type is changed \n";
        }
    }

    return update;
}

const checkError = () => {
    let errors = "";

    if (coursepayment.registration_id.student_id == null) {
        setInvalid(txtRegNo);
        txtRegNo.style.border = '2px solid red';
        errors = errors + "Student no is not Entered...  \n";
    } else {
    }

    if (coursepayment.registration_id == null) {
        setInvalid(cmbBatchName);
        cmbBatchName.style.border = '2px solid red';
        errors = errors + "Batch name is not Entered...  \n";
    } else {
    }

    if (coursepayment.previous_balance == null) {
        setInvalid(txtPrevBalance);
        txtPrevBalance.style.border = '2px solid red';
        errors = errors + "Previous balance is not Entered...  \n";
    } else {
    }

    if (coursepayment.amount == null) {
        setInvalid(txtPaidAmount);
        txtPaidAmount.style.border = '2px solid red';
        errors = errors + "Paid Amount is not Entered...  \n";
    } else {
    }

    if (coursepayment.after_balance == null) {
        setInvalid(txtAfterBalance);
        txtAfterBalance.style.border = '2px solid red';
        errors = errors + "Aftre Balance is not Entered...  \n";
    } else {
    }

    if (coursepayment.after_balance == null) {
        setInvalid(txtAfterBalance);
        txtAfterBalance.style.border = '2px solid red';
        errors = errors + "Aftre Balance is not Entered...  \n";
    } else {
    }

    return errors;

}

function rowView(cpob) {

    printcoursepay = getServiceRequest("/coursepayment/getbyid?id=" + window[cpob]['id']);

    $('#coursePayView').modal('show');
    tdStuName.innerHTML = printcoursepay.registration_id.student_id.calling_name;
    tdStuNumber.innerHTML = printcoursepay.registration_id.student_id.studentno;
    tdBatchName.innerHTML = printcoursepay.registration_id.batch_id.batch_name;
    tdPaidAmount.innerHTML = printcoursepay.amount;
    tdInsNumber.innerHTML = printcoursepay.installment_no;
    tdAfterBal.innerHTML = printcoursepay.after_balance;
    tdPayType.innerHTML = printcoursepay.pay_type_id.name;
    tdPayAddedDate.innerHTML = printcoursepay.pay_added_date;

}


function printCoursePayView() {
    let newWindow = window.open();

    newWindow.document.write(" <link href=\"assets/vendor/bootstrap/css/bootstrap.min.css\" rel=\"stylesheet\">"
        + "<script src=\"assets/Libraries/jQuery/jQuery.js\"></script>" + "<h2>Payment Slip</h2>"
        + tableCoursePaymentView.outerHTML);

    //set time out
    setTimeout(() => {
        newWindow.print();
    }, 1000);
}


const refreshCoursePaymentForm = () => {

    coursepayment = new Object();
    oldcoursepayment = null;

    paytypes = getServiceRequest("/paymenttype/getlist");
    fillSelectFeild(cmbPayType, "Select Payment type", paytypes, 'name', 'Cash');
    coursepayment.pay_type_id = JSON.parse(cmbPayType.value);
    cmbPayType.style.border = "2px solid green";


    paystatuses = getServiceRequest("/paymentstatus/getlist");
    fillSelectFeild(cmbPayStatus, "Select Payment Status", paystatuses, 'name', 'Active', true);
    coursepayment.payment_status_id = JSON.parse(cmbPayStatus.value);
    cmbPayStatus.style.border = "2px solid green";


    getregistrationaccorstudentegno = getServiceRequest("/stubatchreg/batchaccrorstudent")
    fillSelectFeild(cmbBatchName, "Select Batch Name", getregistrationaccorstudentegno, 'registration_id.batch_id', '');

    datePayAdded.value = getCurrentDate("date", "");


    buttonDisable(true, false);

}


//
// function getCourseFee() {
//
//     txtCourseFee.value = JSON.parse(cmbBatchName.value).course_fee;
//     txtRegFee.value = JSON.parse(cmbBatchName.value).reg_fee;
//
//     stubatchreg.course_fee = txtCourseFee.value;
//     stubatchreg.reg_fee = txtRegFee.value;
//
// }

function getStudentName() {

    let exLenth = txtRegNo.value;
    if (exLenth.length == 8) {

        stu = getServiceRequest("/student/getbystudentno?studentno=" + exLenth);
        stuName.value = stu.calling_name;
        // coursepayment.registration_id.student_id = stu;
        getBatchList(stu.id);
        setValid(stuName);

    } else {

    }
}

function getBatchList(sid) {

    batchlist = getServiceRequest("/stubatchreg/batchaccrorstudent?studentno=" + sid)
    fillSelectFeild(cmbBatchName, "Select Batch Name", batchlist, 'batch_id.batch_name', '');

}

function getPrevBalance() {

    txtPrevBalance.value = JSON.parse(cmbBatchName.value).previous_balance;
    coursepayment.previous_balance = txtPrevBalance.value;

}

function getAfterAmount() {


    var afteramount = ``;

    let patern = new RegExp("^[1-9][0-9]{2,}$");

    if (patern.test(txtPaidAmount.value)) {
        if (txtPrevBalance.value != "" && txtPaidAmount.value != "" && parseFloat(txtPaidAmount.value) <= parseFloat(txtPrevBalance.value)) {
            afteramount = parseFloat(txtPrevBalance.value) - parseFloat(txtPaidAmount.value);
            console.log(afteramount)
        }

        txtAfterBalance.value = afteramount;
        coursepayment.after_balance = txtAfterBalance.value;
        setValid(txtAfterBalance);
    } else {
        txtAfterBalance.value = "";
        coursepayment.after_balance = null;
        setInvalid(txtAfterBalance);
    }


}


function fillPaidAmount() {

    let patern = new RegExp("^[1-9][0-9]{2,}$");

    if (patern.test(txtHOPayForIns.value)) {


        txtPaidAmount.value = JSON.parse(txtHOPayForIns.value);
        coursepayment.amount = txtPaidAmount.value;

        coursepayment.hand_over_amount_for_ins = txtHOPayForIns.value;
        setValid(txtHOPayForIns);
        getStudentHandOverAmount();
        getAfterAmount();
    } else {
        txtPaidAmount.value = "";
        coursepayment.amount = null;
        setInvalid(txtHOPayForIns);
        setDefauld(txtPaidAmount);
    }
}


function getStudentHandOverAmount() {

    var studentBalanceAmount = '';
    let patern = new RegExp("^[1-9][0-9]{2,}$");

    if (patern.test(txtPaidAmount.value)) {
        if (txtHOPayForIns.value != "" && txtPaidAmount.value != "") {
            studentBalanceAmount = parseFloat(txtHOPayForIns.value) - parseFloat(txtPaidAmount.value);

        }

        txtHOPayForStu.value = studentBalanceAmount;
        coursepayment.hand_over_amount_for_stu = txtHOPayForStu.value;

    }else {
        txtHOPayForStu.value = "";
        coursepayment.hand_over_amount_for_stu = null;
        setDefauld(txtHOPayForStu);
    }


}


// function checkpay(){
//     let pay = txtPaidAmount.value;
//
//     if(pay>5000){
//         coursepayment.amount = txtPaidAmount.value;
//     } else {
//         alert("can't");
//     }
// }



// function getChequeDetail(){
//
//     // document.getElementById("cmbPayType").addEventListener("onchange", function (){
//     //     let payType = JSON.parse(cmbPayType.value).name;
//     //     let chequefield = document.getElementById("div1text");
//     //
//     //     if(payType === "Cheque"){
//     //         chequefield.style.display = "block";
//     //     } else {
//     //         chequefield.style.display = "none";
//     //     }
//     // })
//
//     let payType = JSON.parse(cmbPayType.value).name;
//
//     if (payType === "Cheque") {
//         // Show the div if payment type is Cheque
//         //penwa
//         $("#div1text").removeClass("d-none");
//     } else {
//         // Hide the div if payment type is not Cheque
//         //penne na
//         $("#div1text").addClass("d-none");
//     }
//
// }


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

        if (submit && loggedUserPrivilege.insert) {

            $("#btnAddCourse").css('pointer-event', 'all');
            $("#btnAddCourse").css('cursor', 'pointer');
            $("#btnAddCourse").removeAttr('disabled');
        } else {
            $("#btnAddCourse").css('pointer-event', 'all');
            $("#btnAddCourse").css('cursor', 'not-allowed');
            $("#btnAddCourse").attr('disabled', 'disabled');
        }

        if (modify && loggedUserPrivilege.update) {

            btnUpdate.removeAttribute('disabled');
            $("#btnUpdate").css('pointer-event', 'all');
            $("#btnUpdate").css('cursor', 'pointer');

        } else {
            $("#btnUpdate").attr('disabled', 'disabled');
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

window.addEventListener('load', loadUI);

//window eka load weddi watena function eka
function loadUI() {
    console.log("Browser onload");


    loggedUserPrivilege = getServiceRequest("/privilage/bymodule/" + "STUDENT_BATCH_IMPLEMENTATION");

    refreshBatchImplemenTable();
    refreshBatchImplemenForm();
    refreshAcadamicYearForm();


    //enable tooltip
    $('[data-bs-toggle = "tooltip"]').tooltip();
}

const refreshBatchImplemenTable = () => {
    batchimplements = getServiceRequest("/batch/findall")

    //properties list eka
    let displayPropertyList = ['acadamic_year_id.name', 'batch_name.name', 'theory_day_id.name', 'course_fee', 'batch_status_id.name'];
    let displayDataList = ['object', 'object', 'object', 'text', 'object'];
    let statusColorList = [{name: "Deleted", colorClass: "deleted-cell-style", buttondisabled: true}, {
        name: "Active",
        colorClass: "active-cell-style",
        buttondisabled: false
    }, {name: "Finished", colorClass: "temporary-unavilable-cell-style", buttondisabled: false}];

    fillDataTableNew(tblBatchImplemen, batchimplements, displayPropertyList, displayDataList, true, 'editob', btnEdit, btnDelete, btnView);

    $('#tblBatchImplemen').dataTable();
}


function formRefill(batch) {

    batchimplement = getServiceRequest("/batch/getbyid?id=" + window[batch]['id']);
    oldbatchimplement = getServiceRequest("/batch/getbyid?id=" + window[batch]['id']);

    changeTab("form");

    txtBatchname.value = batchimplement.batch_name;
    setValid(txtBatchname);
    txtBatchname.style.border = "2px solid green";


    txtStartDate.value = batchimplement.start_date;
    setValid(txtStartDate);
    txtStartDate.style.border = "2px solid green";

    txtEndDate.value = batchimplement.end_date;
    setValid(txtEndDate);
    txtEndDate.style.border = "2px solid green";

    txtTheoryTime.value = batchimplement.therory_allocate_time;
    setValid(txtTheoryTime);
    txtTheoryTime.style.border = "2px solid green";


    txtPracticalTime.value = batchimplement.practical_allocate_time;
    setValid(txtPracticalTime);
    txtPracticalTime.style.border = "2px solid green";


    txtRegDeadline.value = batchimplement.reg_deadline;
    setValid(txtRegDeadline);
    txtRegDeadline.style.border = "2px solid green";

    fillSelectFeild(cmbAcadamicYear, "Select Acadamic Year", acadamic_years, 'name', batchimplement.acadamic_year_id.name, true);
    cmbAcadamicYear.style.border = "2px solid green";

    fillSelectFeild(cmbCourseCatogary, "Select Course Catogary", course_cats, 'name', batchimplement.course_catogary_id.name, true);
    cmbCourseCatogary.style.border = "2px solid green";

    coursecodelist = getServiceRequest("/course/coursecodeaccorcoursecat?id=" + JSON.parse(cmbCourseCatogary.value).id)

    fillSelectFeild(txtCourseNamee, "Select Course code", coursecodelist, 'course_name', batchimplement.course_id.course_name, true);
    txtCourseNamee.style.border = "2px solid green";
    getCourseFee();
    teacherslist = getServiceRequest("/employee/getEmployeesWithTecherAndCAtogary?id=" + JSON.parse(cmbCourseCatogary.value).id)

    fillSelectFeild(cmbTheoryLec, "Select Course Cordinator", teacherslist, 'empcallingname', batchimplement.theory_lec_id.empcallingname,);
    cmbTheoryLec.style.border = "2px solid green";

    if (batchimplement.practical_lec_id != null) {
        fillSelectFeild(cmbPracticalLec, "Select Course Cordinator", teacherslist, 'empcallingname', batchimplement.practical_lec_id.empcallingname);
        cmbPracticalLec.style.border = "2px solid green";
    }

    fillSelectFeild(cmbTheoryDay, "Select Theory Day", theroydays, 'name', batchimplement.theory_day_id.name, true);
    cmbTheoryDay.style.border = "2px solid green";

    if (batchimplement.practical_day_id != null) {
        fillSelectFeild(cmbPracticalDay, "Select Practical Day", practicaldays, 'name', batchimplement.practical_day_id.name, true);
        cmbPracticalDay.style.border = "2px solid green";
    }

    fillSelectFeild(cmbPracticalDay, "Select Practical Day", practicaldays, 'name', batchimplement.practical_day_id.name, true);
    cmbPracticalDay.style.border = "2px solid green";

    fillSelectFeild(cmbBatchStatus, "Select Status", batchstatuses, 'name', batchimplement.batch_status_id.name, false);
    cmbBatchStatus.style.border = "2px solid green";

    intakes.push(batchimplement.intake_id);
    fillSelectFeild(cmbIntake, "Select Intake", intakes, 'name', batchimplement.intake_id.name, true);
    cmbIntake.style.border = "2px solid green";

    txtCourseFee.value = batchimplement.course_fee;
    setValid(txtCourseFee);
    txtCourseFee.style.border = "2px solid green";


    fillSelectFeild2(cmbInstallmentNumber, "Select Installment", installmentnumber, 'id', 'monthly_instal', batchimplement.no_installment);


    buttonDisable(false, true);

}

const resetBatchImplForm = () => {

    cmbAcadamicYear.value = "";
    setDefauld(cmbAcadamicYear);

    cmbCourseCatogary.value = "";
    setDefauld(cmbCourseCatogary);

    txtCourseNamee.value = "";
    setDefauld(txtCourseNamee);

    cmbTheoryDay.value = "";
    setDefauld(cmbTheoryDay);

    cmbPracticalDay.value = "";
    setDefauld(cmbPracticalDay);

    cmbIntake.value = "";
    setDefauld(cmbIntake);

    txtBatchname.value = "";
    setDefauld(txtBatchname);

    cmbTheoryLec.value = "";
    setDefauld(cmbTheoryLec);

    cmbPracticalLec.value = "";
    setDefauld(cmbPracticalLec);

    txtStartDate.value = "";
    setDefauld(txtStartDate);

    txtEndDate.value = "";
    setDefauld(txtEndDate);

    txtTheoryTime.value = "";
    setDefauld(txtTheoryTime);

    txtPracticalTime.value = "";
    setDefauld(txtPracticalTime);

    txtCourseFee.value = "";
    setDefauld(txtCourseFee);

    txtInstallmentNumber.value = "";
    setDefauld(txtInstallmentNumber);

    txtMonthlyInstallment.value = "";
    setDefauld(txtMonthlyInstallment);

    txtRegDeadline.value = "";
    setDefauld(txtRegDeadline);


}

function rowDelete(batchimplemenob) {

    if (window[batchimplemenob].batch_status_id.name == "Deleted") {
        iziToast.error({
            title: 'Already deleted :  \n',
            position: 'topRight',
        });
    } else {

        let deleteMsg = "Are you sure to Delete following Batch...? " +
            "Batch Name : " + window[batchimplemenob]['batch_name'];

        iziToast.info({
            image: 'assets/img/employee1.png',
            messageColor: 'black',
            message: deleteMsg,
            position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
            progressBarColor: 'rgb(0, 255, 184)',
            buttons: [
                ['<button style="color: black"><b>Ok</b></button>', function (instance, toast) {
                    instance.hide({transitionOut: 'fadeOutUp'}, toast);
                    let responce = httpServiceRequest("/batch", "DELETE", window[batchimplemenob]);
                    if (responce == "0") {
                        // window.alert("Student Delete Successfully.......!");
                        iziToast.success({
                            title: 'OK Course Delete Successfully...!',
                            position: 'topRight',
                            //message: 'Student Add Successfully...!',
                        });
                        refreshBatchImplemenTable();
                        refreshCourseModuleForm();

                        changeTab("table");
                    } else {
                        iziToast.error({
                            title: 'Not Complete \n' + responce,
                            position: 'topRight',
                            //message: 'Not Successfully inserted \n' + serverResponce,
                        });
                    }

                }, true],
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
}

const btnAddMC = () => {
    console.log(batchimplement);
    //submit krddi ena mg eka
    let submitMsg = 'Are you sure to add following Batch....!' + '<br>' + '' + '<br>' + 'Batch Name : ' + txtBatchname.value
        + '<br>' + 'Course Code : ' + txtCourseNamee.value;
    //errors tynwda kiyla check krnwa
    let errors = checkError();
    //errors nathnm ....
    if (errors == "") {
        iziToast.info({
            messageColor: 'black',
            message: submitMsg,
            position: 'center',// bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
            progressBarColor: 'rgb(0, 255, 184)',
            buttons: [
                ['<button style="color: black"><b>Ok</b></button>', function (instance, toast) {
                    //Do something when the OK button is clicked
                    instance.hide({transitionOut: 'fadeOutUp'}, toast);
                    //server eken error ekak enwda kiyla blnwa..
                    let serverResponce = httpServiceRequest("/batch", "POST", batchimplement);
                    //let serverResponce = "0";
                    if (serverResponce == "0") {
                        //server error ekak nathnm employeewa add wenwa
                        iziToast.success({
                            title: 'OK Batch Add Successfully...!',
                            position: 'topRight',
                        });
                        refreshBatchImplemenTable();
                        refreshBatchImplemenForm();
                        changeTab("table");
                        resetBatchImplForm();


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
    let errors = checkError()
    if (errors == "") {
        let update = checkUpdate();
        if (update != "") {
            iziToast.success({
                title: 'No Changes',
                position: 'topRight',
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
                        let putresponce = httpServiceRequest("/batch", "PUT", batchimplement);
                        if (putresponce == "0") {
                            //window.alert("Update Successfully...")
                            iziToast.success({
                                title: 'Update Successfully...!',
                            });
                            refreshBatchImplemenTable()
                            refreshBatchImplemenForm();
                            changeTab("table");
                            resetBatchImplForm();
                            changeTab("table");
                        } else {
                            iziToast.error({
                                title: 'Error Not Successfully Update...' + putresponce,
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

    if (batchimplement != null && oldbatchimplement != null) {
        if (batchimplement.cmbAcadamicYear != oldbatchimplement.cmbAcadamicYear) {
            update = update + "Acadamic year is changed \n";
        }
        if (batchimplement.txtCourseNamee != oldbatchimplement.txtCourseNamee) {
            update = update + "Course code is changed \n";
        }
        if (batchimplement.cmbTheoryDay != oldbatchimplement.cmbTheoryDay) {
            update = update + "Theory Day is changed \n";
        }
        if (batchimplement.cmbPracticalDay != oldbatchimplement.cmbPracticalDay) {
            update = update + "Practical Day is changed \n";
        }
        if (batchimplement.cmbIntake != oldbatchimplement.cmbIntake) {
            update = update + "Intake is changed \n";
        }
        if (batchimplement.txtBatchname != oldbatchimplement.txtBatchname) {
            update = update + "Batch name changed \n";
        }
        if (batchimplement.cmbTheoryLec != oldbatchimplement.cmbTheoryLec) {
            update = update + "Theory Lecture changed \n";
        }
        if (batchimplement.cmbPracticalLec != oldbatchimplement.cmbPracticalLec) {
            update = update + "Practical Lecture changed \n";
        }
        if (batchimplement.txtStartDate != oldbatchimplement.txtStartDate) {
            update = update + "Start Date changed \n";
        }
        if (batchimplement.txtEndDate != oldbatchimplement.txtEndDate) {
            update = update + "End Date changed \n";
        }
        if (batchimplement.txtTheoryTime != oldbatchimplement.txtTheoryTime) {
            update = update + "Thoery time changed \n";
        }
        if (batchimplement.txtPracticalTime != oldbatchimplement.txtPracticalTime) {
            update = update + "Practical time changed \n";
        }
        if (batchimplement.txtCourseFee != oldbatchimplement.txtCourseFee) {
            update = update + "Course fee changed \n";
        }
        if (batchimplement.txtInstallmentNumber != oldbatchimplement.txtInstallmentNumber) {
            update = update + "Installment number changed \n";
        }
        if (batchimplement.txtMonthlyInstallment != oldbatchimplement.txtMonthlyInstallment) {
            update = update + "Monthly installment changed \n";
        }
        if (batchimplement.txtRegDeadline != oldbatchimplement.txtRegDeadline) {
            update = update + "Reg Deadline changed \n";
        }
        if (batchimplement.cmbBatchStatus != oldbatchimplement.cmbBatchStatus) {
            update = update + "Batch Status changed \n";
        }

    }
    return update;
}

const checkError = () => {
    let errors = "";

    if (batchimplement.acadamic_year_id == null) {
        setInvalid(cmbAcadamicYear);
        cmbAcadamicYear.style.border = '2px solid red';
        errors = errors + "Acadamic is not Entered...  \n";
    } else {

    }

    if (batchimplement.course_catogary_id == null) {
        setInvalid(cmbCourseCatogary);
        cmbCourseCatogary.style.border = '2px solid red';
        errors = errors + "Course Catogary is not Entered...  \n";
    } else {

    }


    if (batchimplement.theory_day_id == null) {
        setInvalid(cmbTheoryDay);
        cmbTheoryDay.style.border = '2px solid red';
        errors = errors + "Theory day is not Entered...  \n";
    } else {

    }

    if (batchimplement.intake_id == null) {
        setInvalid(cmbIntake);
        cmbIntake.style.border = '2px solid red';
        errors = errors + "Intake is not Entered...  \n";
    } else {

    }

    if (batchimplement.batch_name == null) {
        setInvalid(txtBatchname);
        txtBatchname.style.border = '2px solid red';
        errors = errors + "Batch name is not Entered...  \n";
    } else {

    }

    if (batchimplement.start_date == null) {
        setInvalid(txtStartDate);
        txtStartDate.style.border = '2px solid red';
        errors = errors + "Batch Start date is not Entered...  \n";
    } else {

    }

    if (batchimplement.end_date == null) {
        setInvalid(txtEndDate);
        txtEndDate.style.border = '2px solid red';
        errors = errors + "Batch End date is not Entered...  \n";
    } else {

    }

    if (batchimplement.therory_allocate_time == null) {
        setInvalid(txtTheoryTime);
        txtTheoryTime.style.border = '2px solid red';
        errors = errors + "Theory time is not Entered...  \n";
    } else {

    }

    if (batchimplement.course_fee == null) {
        setInvalid(txtCourseFee);
        txtCourseFee.style.border = '2px solid red';
        errors = errors + "Course fee is not Entered...  \n";
    } else {

    }

    if (batchimplement.no_installment == null) {
        setInvalid(txtInstallmentNumber);
        txtInstallmentNumber.style.border = '2px solid red';
        errors = errors + "Installment Number is not Entered...  \n";
    } else {

    }

    if (batchimplement.monthly_instal == null) {
        setInvalid(txtMonthlyInstallment);
        txtMonthlyInstallment.style.border = '2px solid red';
        errors = errors + "Monthly Installment is not Entered...  \n";
    } else {

    }

    if (batchimplement.reg_deadline == null) {
        setInvalid(txtRegDeadline);
        txtRegDeadline.style.border = '2px solid red';
        errors = errors + "Reg Daeadline is not Entered...  \n";
    } else {

    }

    return errors;

}


const refreshAcadamicYearForm = () => {

    acadamicyear = new Object();
    oldacadamicyear = null;

}


function checkAcdamicYear() {

    let errors = "";

    if (acadamicyear.name == null) {
        setInvalid(cmbAcadamicYear);
        cmbAcadamicYear.style.border = '2px solid red';
        errors = errors + "Acadamic year is not Entered...  \n";
    } else {

    }

    return errors;
}

const btnAddAcdamicYear = () => {

    //submit krddi ena mg eka
    let submitMsg = 'Are you sure to add following Acadamic Year....!';
    //errors tynwda kiyla check krnwa
    let errors = checkAcdamicYear();
    //errors nathnm ....
    if (errors == "") {
        iziToast.info({
            image: 'assets/img/employee1.png',
            messageColor: 'black',
            message: submitMsg,
            backgroundColor: '#fed3ae',
            position: 'center',// bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
            progressBarColor: 'rgb(0, 255, 184)',
            buttons: [
                ['<button style="color: black"><b>Ok</b></button>', function (instance, toast) {
                    //Do something when the OK button is clicked
                    instance.hide({transitionOut: 'fadeOutUp'}, toast);
                    //server eken error ekak enwda kiyla blnwa..
                    let serverResponce = httpServiceRequest("/acadamicyear", "POST", acadamicyear);
                    //let serverResponce = "0";
                    if (serverResponce == "0") {
                        //server error ekak nathnm employeewa add wenwa
                        iziToast.success({
                            title: 'OK Batch Add Successfully...!',
                            position: 'topRight',
                        });

                        refreshAcadamicYearForm();
                        refreshBatchImplemenForm();
                        $('#editeAcadamicYear').modal('hide');
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

function rowView() {

}


const refreshBatchImplemenForm = () => {

    batchimplement = new Object();
    oldbatchimplement = null;

    acadamic_years = getServiceRequest("/acadamicyear/getlist");
    fillSelectFeild(cmbAcadamicYear, "Select Acadamic Year", acadamic_years, 'name', '');

    theroydays = getServiceRequest("/weekdays/getlist");
    fillSelectFeild(cmbTheoryDay, "Select Theory day", theroydays, 'name', '');

    practicaldays = getServiceRequest("/weekdays/getlist");
    fillSelectFeild(cmbPracticalDay, "Select Course Type", practicaldays, 'name', '');

    batchstatuses = getServiceRequest("/batchstatus/getlist");
    fillSelectFeild(cmbBatchStatus, "Select Batch Status", batchstatuses, 'name', 'Active', true);
    batchimplement.batch_status_id = JSON.parse(cmbBatchStatus.value);
    cmbBatchStatus.style.border = "2px solid green";

    course_cats = getServiceRequest("/coursecatogary/getlist");
    fillSelectFeild(cmbCourseCatogary, "Select Course Catogary", course_cats, 'name', '');

    intakes = getServiceRequest("intake/getlist");
    fillSelectFeild(cmbIntake, "Select Intake", intakes, 'name', '');

    getCourseCodeAccoCourCat = getServiceRequest("/course/coursecodeaccorcoursecat");
    fillSelectFeild(txtCourseNamee, "Select Course Code", getCourseCodeAccoCourCat, 'name', '');

    getEmployeesWithTecherAndCAtogary = getServiceRequest("/employee/getEmployeesWithTecherAndCAtogary");
    fillSelectFeild2(cmbTheoryLec, "Select Theory Lecture", getEmployeesWithTecherAndCAtogary, 'empno', 'empcallingname');

    getEmployeeWithTeacherAndDemo = getServiceRequest("/employee/getEmployeeWithTeacherAndDemo");
    fillSelectFeild2(cmbPracticalLec, "Select Practical Lecture", getEmployeeWithTeacherAndDemo, 'empno', 'empcallingname')


    let currentDateForMin = new Date();
    txtStartDate.min = currentDateForMin.getFullYear() + getDateAndMonth(currentDateForMin, "monthdate");

    let currentDateForMax = new Date();
    currentDateForMax.setDate(currentDateForMax.getDate() + 60);
    txtStartDate.max = currentDateForMax.getFullYear() + getDateAndMonth(currentDateForMax, "monthdate");


    dateBatchAssignDate.value = getCurrentDate("date", "");


    buttonDisable(true, false);

}


function cmbCourseCodeAccCat() {

    coursecodelist = getServiceRequest("/course/coursecodeaccorcoursecat?id=" + JSON.parse(cmbCourseCatogary.value).id)
    fillSelectFeild(txtCourseNamee, "Select Course Code", coursecodelist, 'course_name', '');

}


function cmbTheLecAccCouCat() {

    teacherslist = getServiceRequest("/employee/getEmployeesWithTecherAndCAtogary?id=" + JSON.parse(cmbCourseCatogary.value).id)
    fillSelectFeild2(cmbTheoryLec, "Select Theory Lecture", teacherslist, 'empno', 'empcallingname');

}

function cmbPracLecAccCouCat() {


    praclist = getServiceRequest("/employee/getEmployeeWithTeacherAndDemo?id=" + JSON.parse(cmbCourseCatogary.value).id)
    fillSelectFeild2(cmbPracticalLec, "Select Practical Lecture", praclist, 'empno', 'empcallingname', '');

}

function getCourseFee() {

    txtCourseFee.value = JSON.parse(txtCourseNamee.value).course_fee;

    batchimplement.course_fee = txtCourseFee.value;

    //get installment number
    installmentnumber = new Array();
    console.log(batchimplement.course_id.course_duration_id.no_of_days);

    let no_of_month = parseInt(JSON.parse(txtCourseNamee.value).course_duration_id.no_of_days / 30) - 1;

    for (let i = 1; i <= no_of_month; i++) {
        if (parseFloat(txtCourseFee.value) % i == 0) {
            // let installment = i + " => " + i + " x " + parseFloat(txtCourseFee.value)/i;
            let installment = new Object();
            //i =  installment number
            installment.id = i;
            installment.monthly_instal = parseFloat(txtCourseFee.value) / i;
            installmentnumber.push(installment);

        }
    }
    console.log(installmentnumber);

    fillSelectFeild2(cmbInstallmentNumber, "Select Installment", installmentnumber, 'id', 'monthly_instal', '');


}

function insallmentBinding() {

    //vaiable ekak hada gatta ekata no of installment keek value  eka assign kala
    let insBinding = JSON.parse(cmbInstallmentNumber.value);
    console.log(insBinding);

    //bidning for no of installment
    batchimplement.no_installment = insBinding.id;

    //binding for monthly fee
    batchimplement.monthly_instal = insBinding.monthly_instal;
}

function getEndDate() {

    //constructor call kala
    let endDate = new Date(txtStartDate.value);
    let noOfDays = JSON.parse(txtCourseNamee.value).course_duration_id.no_of_days;
    endDate.setDate(endDate.getDate() + noOfDays);

    txtEndDate.value = endDate.getFullYear() + getDateAndMonth(endDate, "monthdate");


    let currentdateForMin = new Date(txtEndDate.value);
    currentdateForMin.setDate(currentdateForMin.getDate() - 10)
    txtEndDate.min = currentdateForMin.getFullYear() + getDateAndMonth(currentdateForMin, "monthdate");

    let currentdateForMax = new Date(txtEndDate.value);
    currentdateForMax.setDate(currentdateForMax.getDate() + 20);
    txtEndDate.max = currentdateForMax.getFullYear() + getDateAndMonth(currentdateForMax, "monthdate");



    let week_day_no =  JSON.parse(cmbTheoryDay.value).week_day_no;
    let cdate = new Date(txtEndDate.value);
    for (let i=1 ; i<8 ; i++){


        if(cdate.getDay() == week_day_no){
            txtEndDate.value = cdate.toISOString().split("T")[0];
            batchimplement.end_date = txtEndDate.value;
            setValid(txtEndDate);
            break;
        }
        cdate.setDate(cdate.getDate() + i);
    }


}


// function getRegDeadlineDate() {
//
//     let regDeadline = new Date(txtStartDate.value);
//     regDeadline.setDate(regDeadline.getDate() + 30);
//
//     txtRegDeadline.value = regDeadline.getFullYear() + getDateAndMonth(regDeadline, "monthdate");
//     setValid(txtRegDeadline);
//
//
//     let mindate = new Date(txtStartDate.value);
//     mindate.setDate(mindate.getDate());
//     txtRegDeadline.min = mindate.getFullYear() + getDateAndMonth(mindate, "monthdate");
//
//     let maxdate = new Date(txtStartDate.value);
//     maxdate.setDate(maxdate.getDate() + 10);
//     txtRegDeadline.max = maxdate.getFullYear() + getDateAndMonth(maxdate, "monthdate");
//
//     batchimplement.reg_deadline = txtRegDeadline.value;
//
//
// }


function getIntake() {

    intakelist = getServiceRequest("/intake/byacadamicycoursetheory?aid=" + JSON.parse(cmbAcadamicYear.value).id + "&cid=" + JSON.parse(txtCourseNamee.value).id + "&tid=" + JSON.parse(cmbTheoryDay.value).id);
    fillSelectFeild(cmbIntake, "Select Intake", intakelist, 'name', '');

}


function getMonthlyInstallment() {

    var ins = "";

    if (txtCourseFee.value != "" && txtInstallmentNumber.value != "") {
        ins = parseFloat((parseFloat(txtCourseFee.value)) / parseFloat(txtInstallmentNumber.value)).toFixed(2);
    }

    txtMonthlyInstallment.value = ins;
    batchimplement.monthly_instal = txtMonthlyInstallment.value;
    setValid(txtMonthlyInstallment);

}

function getBatchName() {

    var name = "";

    if (batchimplement.acadamic_year_id != "" && batchimplements.course_id != "" && batchimplements.theory_day_id != "" && batchimplements.intake_id != "") {
        //name = batchimplement.acadamic_year_id.name + "-" + batchimplement.course_id.course_code + "-" + batchimplement.intake_id.name + "-" + batchimplement.theory_day_id.name;
        name = batchimplement.acadamic_year_id.name + "-" + batchimplement.course_id.course_code + "-" + (JSON.parse(cmbIntake.value).name).charAt(0) + (JSON.parse(cmbIntake.value).name).charAt(7) + "-" + batchimplement.theory_day_id.name;

    }

    txtBatchname.value = name;
    batchimplement.batch_name = txtBatchname.value;
    setValid(txtBatchname);
}

function getRegDeadline(){

    let setMinRegDeadlineDate = new Date(txtStartDate.value);

    setMinRegDeadlineDate.setDate((setMinRegDeadlineDate.getDate()+20))
    txtRegDeadline.min = getCurrentDate3("date",setMinRegDeadlineDate);


}

const getCurrentDate3 = (format,givendate) => {
    let nowDate = new Date(givendate);
    // retrive 0 to 11
    let month = nowDate.getMonth() + 1;//return 0jan-11Dec
//retrive 1-31
    let date = nowDate.getDate();//return 1-31
//year
    let year = nowDate.getFullYear();

    if(month < 10){
        month = "0"+ month;
    }
    if(date < 10){
        date = "0" + date;
    }


    return year + "-" + month + "-" + date ;
}


function hidePracDateAndPracLec() {

    if (JSON.parse(cmbCourseCatogary.value).id == 2) {
        practicaldays = getServiceRequest("/weekdays/getlist");
        fillSelectFeild(cmbPracticalDay, "Select Course Type", practicaldays, '', '', true);
        getEmployeeWithTeacherAndDemo = getServiceRequest("/employee/getEmployeeWithTeacherAndDemo");
        fillSelectFeild2(cmbPracticalLec, "Select Practical Lecture", getEmployeeWithTeacherAndDemo, 'empno', 'empcallingname', '', true);
        document.getElementById("txtPracticalTime").disabled = true;

    } else {
        // practicaldays = getServiceRequest("/weekdays/getlist");
        // fillSelectFeild (cmbPracticalDay, "Select Course Type", practicaldays,'name','');

        document.getElementById("txtPracticalTime").disabled = false;
    }
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


const blockWeekDay = () => {
   let week_day_no =  JSON.parse(cmbTheoryDay.value).week_day_no;
   let weekdays = [0,1,2,3,4,5,6].filter(function(day) {
        return day != week_day_no;
    });
    const picker = document.getElementById('txtStartDate');
    picker.addEventListener('input', function(e){
        var day = new Date(this.value).getUTCDay();
        if(weekdays.includes(day)){
            e.preventDefault();
            this.value = '';
            alert('This day not allowed');

        }
    });
}
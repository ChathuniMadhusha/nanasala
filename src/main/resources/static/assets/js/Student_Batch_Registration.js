window.addEventListener('load', loadUI);

//window eka load weddi watena function eka
function loadUI() {
    console.log("Browser onload");


    // $( "#cmbCourseName" ).select2({
    //     theme: "bootstrap"
    // });

    loggedUserPrivilege = getServiceRequest("/privilage/bymodule/"+"STUDENT_BATCH_REGISTRTAION" );

    refreshStuBatchRegistrationTable();
    refreshStuBatchRegistrationForm();


    //enable tooltip
    $('[data-bs-toggle = "tooltip"]').tooltip();
}

const refreshStuBatchRegistrationTable = () => {
    studentbatchreg = getServiceRequest("/stubatchreg/findall")

    //properties list eka
    let displayPropertyList = ['student_id.studentno','batch_id.batch_name','course_fee','reg_date','reg_status_id.name'];
    let displayDataList = [getCallingName,'object','text','text','object'];
    let statusColorList = [{name:"Deleted", colorClass:"resign-cell-style",buttondisabled:true},{name:"Active", colorClass:"active-cell-style",buttondisabled:false},{name:"Finished", colorClass:"temporary-unavilable-cell-style",buttondisabled:false}];
  //  fillDataTable (tblStudentBatchReg, studentbatchreg, displayPropertyList, displayDataList, formRefill, rowDelete, rowView,true, true, statusColorList,loggedUserPrivilege);
    fillDataTableNew(tblStudentBatchReg, studentbatchreg, displayPropertyList, displayDataList, true, 'editob', btnEdit, btnDelete,btnView);

    for(let index in studentbatchreg){
        if(studentbatchreg[index].reg_status_id.name == "Registered"){
            tblStudentBatchReg.children[1].children[index].children[6].children[0].classList.add("active-cell-style");
        }
        if(studentbatchreg[index].reg_status_id.name == "Deleted"){
            tblStudentBatchReg.children[1].children[index].children[6].children[0].classList.add("deleted-cell-style");
        }
    }





    $('#tblStudentBatchReg').dataTable();
}

function getCallingName(ob) {
    return ob.student_id.studentno + "(" + ob.student_id.calling_name + ")";
}

function formRefill(stubatch){

    // stubatchreg = getServiceRequest("stubatchreg/getbyid?id=" + stubatch.id);
    // oldstubatchreg = getServiceRequest("stubatchreg/getbyid?id=" + stubatch.id);

    stubatchreg = getServiceRequest("stubatchreg/getbyid?id=" + window[stubatch]['id']);
    oldstubatchreg = getServiceRequest("stubatchreg/getbyid?id=" + window[stubatch]['id']);

    changeTab("form");

    stuName.value = stubatchreg.student_id.calling_name;
    setValid(stuName);
    stuName.style.border = "2px solid green";

    txtStuNo.value = stubatchreg.student_id.studentno;
    setValid(txtStuNo);
    txtStuNo.style.border = "2px solid green";

    txtCourseFee.value = stubatchreg.course_fee;
    setValid(txtCourseFee);
    txtCourseFee.style.border = "2px solid green";

    // stu = getServiceRequest("student/getbyregno?regno=" + txtRegNo.value);
    //
    // fillSelectFeild(stuName, "", stu, 'calling_name', stubatchreg.student_id.calling_name);
    // stuName.style.border = "2px solid green";



    fillSelectFeild(cmbCourseName, "Select Course Name", coursenames, 'course_name', stubatchreg.batch_id.course_id.course_name);
    cmbCourseName.style.border = "2px solid green";

    batchlist = getServiceRequest("/batch/batchnameaccortocourse?id="+JSON.parse(cmbCourseName.value).id)

    fillSelectFeild(cmbBatchName, "Select Batch Name", batchlist, 'batch_name', stubatchreg.batch_id.batch_name);
    cmbBatchName.style.border = "2px solid green";

    buttonDisable(false,true);

}

const resetStuBatchRegistration = () => {

    txtStuNo.value = "";
    setDefauld(txtStuNo);

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


function btnClearMC(){

    resetStuBatchRegistration();


}

function rowDelete(rowob){
   let stubatchregob = window[rowob];
    console.log(stubatchregob);
    if(stubatchregob.reg_status_id.name == "Delete"){
        iziToast.error({
            title: 'Alredy batch leave \n',
            position: 'topRight',
        });
    }else {

        let deleteMsg = "Are you sure to Delete following Registration...? " + '<br>'
        "Batch Name : " + stubatchregob.batch_id.batch_name + '<br>' + "Student Name : " + stubatchregob.student_id.calling_name;

        iziToast.info({
            messageColor: 'black',
            message: deleteMsg,
            position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
            progressBarColor: 'rgb(0, 255, 184)',
            buttons: [
                ['<button style="color: black"><b>Ok</b></button>', function (instance, toast) {
                    instance.hide({transitionOut: 'fadeOutUp'}, toast);
                    let responce = httpServiceRequest("/stubatchreg", "DELETE", stubatchregob);
                    if (responce == "0") {
                        // window.alert("Student Delete Successfully.......!");
                        iziToast.success({
                            title: 'OK Registration Delete Successfully...!',
                            position: 'topRight',
                            //message: 'Student Add Successfully...!',
                        });
                        refreshStuBatchRegistrationTable();
                        refreshStuBatchRegistrationForm();
                        // resetForm();
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
    //submit krddi ena mg eka
    let submitMsg = 'Are you sure to add following Registration....!' + '<br>' + '' + '<br>' + 'Student Name : ' + stuName.value
        + '<br>' + 'Batch Name : ' + JSON.parse(cmbBatchName.value).batch_name;
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
                    let serverResponce = httpServiceRequest("/stubatchreg", "POST", stubatchreg);
                    //let serverResponce = "0";
                    if (serverResponce == "0") {
                        //server error ekak nathnm employeewa add wenwa
                        iziToast.success({
                            title: 'OK Batch Add Successfully...!',
                            position: 'topRight',
                        });
                        refreshStuBatchRegistrationTable();
                        refreshStuBatchRegistrationForm();
                        changeTab("table");
                        resetStuBatchRegistration();


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
    if(errors == ""){
        let update = checkUpdate();
        if(update != ""){
            iziToast.success({
                title: 'No Changes',
                position: 'topCenter',
            });
        }else {
            //let updaterespoce = window.confirm("Are Your sure to update this fiels : " + updates);
            iziToast.info({
                messageColor: 'black',
                title: 'Are Your sure to update this fiels :' + update,
                position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
                progressBarColor: 'rgb(0, 255, 184)',
                buttons: [
                    ['<button style="color: black"><b>Ok</b></button>', function (instance,toast) {
                        instance.hide({ transitionOut: 'fadeOutUp' }, toast);
                        let putresponce = httpServiceRequest("/stubatchreg", "PUT", stubatchreg);
                        if (putresponce == "0") {
                            //window.alert("Update Successfully...")
                            iziToast.success({
                                title: 'Update Successfully...!',
                                position: 'topRight',
                            });
                            refreshStuBatchRegistrationTable();
                            refreshStuBatchRegistrationForm();
                            resetStuBatchRegistration();
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
    }else{
        iziToast.error({
            title: 'Error Not Successfully Update...' + errors,
            position: 'topRight',
            //message: 'Not Successfully inserted \n' + serverResponce,
        });
    }
}

const checkUpdate = () => {
    let update = "";

    if(stubatchreg != null && oldstubatchreg != null){
        if(stubatchreg.txtStuNo != oldstubatchreg.txtStuNo){
            update = update + "Student No is changed \n" ;
        }
        if(stubatchreg.stuName != oldstubatchreg.stuName){
            update = update + "Student Name is changed \n" ;
        }
        if(stubatchreg.cmbCourseName != oldstubatchreg.cmbCourseName){
            update = update + "Course Name is changed \n" ;
        }
        if(stubatchreg.cmbBatchName != oldstubatchreg.cmbBatchName){
            update = update + "Batch Name is changed \n" ;
        }
        if(stubatchreg.txtCourseFee != oldstubatchreg.txtCourseFee){
            update = update + "Course Fee is changed \n" ;
        }
        if(stubatchreg.dteRegDate != oldstubatchreg.dteRegDate){
            update = update + "Reg Date is changed \n" ;
        }
        if(stubatchreg.cmbRegStatus != oldstubatchreg.cmbRegStatus){
            update = update + "Reg Status is changed \n" ;
        }
    }

    return update;
}

const checkError = () => {
    let errors = "";

    // if (stubatchreg.reg_no == null) {
    //     setInvalid(txtStuNo);
    //     txtStuNo.style.border = '2px solid red';
    //     errors = errors + "Student No is not Entered...  \n";
    // } else {
    // }

    if (stubatchreg.student_id == null) {
        setInvalid(stuName);
        stuName.style.border = '2px solid red';
        errors = errors + "Student name is not Entered...  \n";
    } else {
    }

    if (stubatchreg.batch_id == null) {
        setInvalid(cmbBatchName);
        cmbBatchName.style.border = '2px solid red';
        errors = errors + "Batch name is not Entered...  \n";
    } else {
    }

    if (stubatchreg.course_fee == null) {
        setInvalid(txtCourseFee);
        txtCourseFee.style.border = '2px solid red';
        errors = errors + "Course Fee is not Entered...  \n";
    } else {
    }

    if (stubatchreg.reg_date == null) {
        setInvalid(dteRegDate);
        dteRegDate.style.border = '2px solid red';
        errors = errors + "Reg Date is not Entered...  \n";
    } else {
    }

    return errors;

}

function rowView(){

}

const refreshStuBatchRegistrationForm = () => {

    stubatchreg = new Object();
    oldstubatchreg = null;
    
    coursenames = getServiceRequest("/course/findall");
    fillSelectFeild (cmbCourseName, "Select Course Name", coursenames, 'course_name', '');

    dteRegDate.value = getCurrentDate("date" , "");
    stubatchreg.reg_date = dteRegDate.value;

    getBatch_ImplementationByCourseName = getServiceRequest("/batch/batchnameaccortocourse")
    fillSelectFeild (cmbBatchName, "Select Batch Name", getBatch_ImplementationByCourseName,'batch_name','');

    regstatus = getServiceRequest("/regstatus/getlist");
    fillSelectFeild(cmbRegStatus, "Select Register Status", regstatus, 'name', 'Registered',true);
    stubatchreg.reg_status_id = JSON.parse(cmbRegStatus.value);
    cmbRegStatus.style.border = "2px solid green";


    buttonDisable(true,false);

    }

function cmbBatchNameAccCourse() {

    batchlist = getServiceRequest("/batch/batchnameaccortocourse?id="+JSON.parse(cmbCourseName.value).id)
    fillSelectFeild (cmbBatchName, "Select Batch Name", batchlist,'batch_name','');

}

function getCourseFee() {

    // txtCourseFee.value = JSON.parse(cmbBatchName.value).course_fee;
    //
    // let newcoursefee = parseFloat(txtCourseFee.value) - parseFloat(txtDiscount.value);
    // console.log(newcoursefee);
    // txtCourseFee.value = newcoursefee;
    // stubatchreg.course_fee = txtCourseFee.value;

    txtCourseFee.value = JSON.parse(cmbBatchName.value).course_fee;

    stubatchreg.course_fee = txtCourseFee.value;

}

function getStudentName() {

    let exLenth = txtStuNo.value;
    if(exLenth.length == 8){

        stu = getServiceRequest("student/getbystudentno?studentno=" + exLenth);
        stuName.value = stu.calling_name;
        stubatchreg.student_id = stu;
        setValid(stuName)

    }else {

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

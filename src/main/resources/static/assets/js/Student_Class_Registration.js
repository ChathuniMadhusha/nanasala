window.addEventListener('load', loadUI);

//window eka load weddi watena function eka
function loadUI() {
    console.log("Browser onload");


    // $( "#cmbCourseName" ).select2({
    //     theme: "bootstrap"
    // });

    loggedUserPrivilege = getServiceRequest("/privilage/bymodule/"+"STUDENT_BATCH_REGISTRTAION" );

    refreshStuClassRegistrationTable();
    refreshStuClassRegistrationForm();


    //enable tooltip
    $('[data-bs-toggle = "tooltip"]').tooltip();
}

const refreshStuClassRegistrationTable = () => {
    classreg = getServiceRequest("/stuclassreg/findall")

    //properties list eka
    let displayPropertyList = ['student_id.studentno','class_details_id.class_name','monthly_fee','week_day','reg_date','class_reg_status_id.name'];
    let displayDataList = [getCallingName,'object','text','text','text','object'];
    let statusColorList = [{name:"Deleted", colorClass:"deleted-cell-style",buttondisabled:true},{name:"Active", colorClass:"active-cell-style",buttondisabled:false},{name:"Temporary Unavilaible", colorClass:"temporary-unavilable-cell-style",buttondisabled:false}];

    fillDataTableNew(tblStudentClassReg, classreg, displayPropertyList, displayDataList, true, 'editob', btnEdit,btnDelete,btnView);


    $('#tblStudentClassReg').dataTable();
}

function getCallingName(ob) {
    return ob.student_id.studentno + "(" + ob.student_id.calling_name + ")";
}

function formRefill(stuclassreg){

    classreg = getServiceRequest("stuclassreg/getbyid?id=" + window[stuclassreg]['id']);
    oldclassreg = getServiceRequest("stuclassreg/getbyid?id=" + window[stuclassreg]['id']);

    changeTab("form");

    txtStuNo.value = classreg.student_id.studentno;
    setValid(txtStuNo);
    txtStuNo.style.border = "2px solid green";

    stuName.value = classreg.student_id.calling_name;
    setValid(stuName);
    stuName.style.border = "2px solid green";

    txtClassday.value = classreg.week_day;
    setValid(txtClassday);
    txtClassday.style.border = "2px solid green";

    txtMonthlyFee.value = classreg.monthly_fee;
    setValid(txtMonthlyFee);
    txtMonthlyFee.style.border = "2px solid green";

    txtRegFee.value = classreg.reg_fee;
    setValid(txtRegFee);
    txtRegFee.style.border = "2px solid green";

    dteRegDate.value = classreg.reg_date;
    setValid(dteRegDate);
    dteRegDate.style.border = "2px solid green";

    fillSelectFeild(cmbRegStatus, "Select Status", classregstatuses, 'name', classreg.class_reg_status_id.name);
    cmbRegStatus.style.border = "2px solid green";

    fillSelectFeild(cmbClassName, "Select Class Name", classnames, 'class_name', classreg.class_details_id.class_name);
    cmbClassName.style.border = "2px solid green";

}

// const resetStuBatchRegistration = () => {
//
//     txtStuNo.value = "";
//     setDefauld(txtStuNo);
//
//     stuName.value = "";
//     setDefauld(stuName);
//
//     cmbCourseName.value = "";
//     setDefauld(cmbCourseName);
//
//     cmbBatchName.value = "";
//     setDefauld(cmbBatchName);
//
//     txtCourseFee.value = "";
//     setDefauld(txtCourseFee);
//
//     txtRegFee.value = "";
//     setDefauld(txtRegFee);
//
//     dteRegDate.value = "";
//     setDefauld(dteRegDate);
//
//
// }

function rowDelete(stuclassreg){

    if(window[stuclassreg].class_reg_status_id.name == "Deleted") {
        iziToast.error({
            title: 'aaaaa \n',
            position: 'topRight',
        });
    } else {


        let deleteMsg = "Are you sure to Delete following Registration...? " + '<br>'
        "Class Name : " + window[stuclassreg]['class_details_id'].class_name + '<br>' +"Student Name : " + window[stuclassreg]['student_id'].calling_name;

        iziToast.info({
            messageColor: 'black',
            message: deleteMsg,
            position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
            progressBarColor: 'rgb(0, 255, 184)',
            buttons: [
                ['<button style="color: black"><b>Ok</b></button>', function (instance,toast) {
                    instance.hide({ transitionOut: 'fadeOutUp' }, toast);
                    let responce = httpServiceRequest("/stuclassreg", "DELETE", window[stuclassreg]);
                    if (responce == "0") {
                        // window.alert("Student Delete Successfully.......!");
                        iziToast.success({
                            title: 'OK Registration Delete Successfully...!',
                            position: 'topRight',
                            //message: 'Student Add Successfully...!',
                        });
                        refreshStuClassRegistrationTable();
                        refreshStuClassRegistrationForm();
                        //resetStuBatchRegistration();
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
            console.log(classreg)
    //submit krddi ena mg eka
    let submitMsg = 'Are you sure to add following Registration....!' + '<br>' + '' + '<br>' + 'Student Name : ' + stuName.value
        + '<br>' + 'Class Name : ' + JSON.parse(cmbClassName.value).class_name;
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
                    let serverResponce = httpServiceRequest("/stuclassreg", "POST", classreg);
                    //let serverResponce = "0";
                    if (serverResponce == "0") {
                        //server error ekak nathnm employeewa add wenwa
                        iziToast.success({
                            title: 'OK Batch Add Successfully...!',
                            position: 'topRight',
                        });
                        refreshStuClassRegistrationTable();
                        refreshStuClassRegistrationForm();
                        //resetStuBatchRegistration();

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
                        let putresponce = httpServiceRequest("/stuclassreg", "PUT", classreg);
                        if (putresponce == "0") {
                            //window.alert("Update Successfully...")
                            iziToast.success({
                                title: 'Update Successfully...!',
                                position: 'topRight',
                            });
                            refreshStuClassRegistrationTable();
                            refreshStuClassRegistrationForm();
                            //resetStuBatchRegistration();
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

    if(classreg != null && oldclassreg != null){
        if(classreg.txtStuNo != oldclassreg.txtStuNo){
            update = update + "Student No is changed \n" ;
        }
        if(classreg.stuName != oldclassreg.stuName){
            update = update + "Student Name is changed \n" ;
        }
        if(classreg.cmbClassName != oldclassreg.cmbClassName){
            update = update + "Class Name is changed \n" ;
        }
        if(classreg.txtClassday != oldclassreg.txtClassday){
            update = update + "Class Day is changed \n" ;
        }
        if(classreg.txtMonthlyFee != oldclassreg.txtMonthlyFee){
            update = update + "Monthly Fee is changed \n" ;
        }
        if(classreg.cmbRegStatus != oldclassreg.cmbRegStatus){
            update = update + "Registration status is changed \n" ;
        }
    }
    return update;
}

const checkError = () => {

    let errors = "";

    if (classreg.student_id == null) {
        setInvalid(stuName);
        stuName.style.border = '2px solid red';
        errors = errors + "Student name is not Entered...  \n";
    } else {
    }

    if (classreg.class_details_id == null) {
        setInvalid(cmbClassName);
        cmbClassName.style.border = '2px solid red';
        errors = errors + "Class name is not Entered...  \n";
    } else {
    }

    if (classreg.week_day == null) {
        setInvalid(txtClassday);
        txtClassday.style.border = '2px solid red';
        errors = errors + "Class day is not Entered...  \n";
    } else {
    }

    if (classreg.monthly_fee == null) {
        setInvalid(txtMonthlyFee);
        txtMonthlyFee.style.border = '2px solid red';
        errors = errors + "Monthly Fee is not Entered...  \n";
    } else {
    }


    return errors;

}

function rowView(){

}

const refreshStuClassRegistrationForm = () => {

    classreg = new Object();
    oldclassreg = null;

    classnames = getServiceRequest("/class/findall");
    fillSelectFeild (cmbClassName, "Select Class Name", classnames, 'class_name', '');

    dteRegDate.value = getCurrentDate("date" , "");


    classregstatuses = getServiceRequest("/classregstatus/getlist");
    fillSelectFeild (cmbRegStatus, "Select Status", classregstatuses, 'name', 'Active',true);
    classreg.class_reg_status_id =  JSON.parse(cmbRegStatus.value);
    cmbRegStatus.style.border = "2px solid green";


    }



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

    let exLenth = txtStuNo.value;
    if(exLenth.length == 8){

        stu = getServiceRequest("student/getbystudentno?studentno=" + exLenth);
        stuName.value = stu.calling_name;
        classreg.student_id = stu;
        setValid(stuName)

    }else {

    }
}

function getClassDay(){

    txtClassday.value = JSON.parse(cmbClassName.value).week_day_id.name;
    classreg.week_day = txtClassday.value;

}

function getClassFee(){

    txtMonthlyFee.value = JSON.parse(cmbClassName.value).monthly_fee;

    classreg.monthly_fee = txtMonthlyFee.value;


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

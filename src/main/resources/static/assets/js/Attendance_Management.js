window.addEventListener('load', loadUI);

//window eka load weddi watena function eka
function loadUI() {
    console.log("Browser onload");


    // $( "#cmbCourseName" ).select2({
    //     theme: "bootstrap"
    // });

    loggedUserPrivilege = getServiceRequest("/privilage/bymodule/"+"ATTENDANCE_MANAGEMENT" );

    refreshAttendanceTable();
    refreshAttendanceForm();


    //enable tooltip
    $('[data-bs-toggle = "tooltip"]').tooltip();
}

const refreshAttendanceTable = () => {
    attendance = getServiceRequest("/attendance/findall")

    //properties list eka
    let displayPropertyList = ['date','batch_id.batch_name','reg_count','present_count','absant_count'];
    let displayDataList = ['text','object','text','text','text'];
    //let statusColorList = [{name:"In-valid", colorClass:"deleted-cell-style",buttondisabled:true},{name:"Valid", colorClass:"active-cell-style",buttondisabled:false},{name:"Temporary Unavilaible", colorClass:"temporary-unavilable-cell-style",buttondisabled:false}];
    //fillDataTable (tblAttendance, attendance, displayPropertyList, displayDataList, formRefill, rowDelete, rowView,true, true, statusColorList,loggedUserPrivilege);
    fillDataTableNew(tblAttendance, attendance, displayPropertyList, displayDataList, true, 'editob', btnView);
    $('#tblAttendance').dataTable();
}


function getYear(ob){
    return ob.added_date.split("-")[0];
}

 function getMonth(ob){
    //return new Date(ob.added_date).getMonth();
     let monthname = ["Jan","Feb","March","April","May","June","July","Aug","Sep","Oct","Nov","Dec"];
     return monthname[new Date(ob.added_date).getMonth()];
 }


function formRefill(atteid){

    attendance = getServiceRequest("/attendance/getbyid?id=" + window[atteid]['id']);
    oldattendance = getServiceRequest("/attendance/getbyid?id=" + window[atteid]['id']);

    changeTab("form");

    fillSelectFeild(cmbBatchName, "Select Batch", batch_names, 'batch_name', attendance.batch_id.batch_name);
    cmbBatchName.style.border = "2px solid green";

    sessionlistaccorbatch = getServiceRequest("/session/listbybatch?batchid="+JSON.parse(cmbBatchName.value).id)
    sessionlistaccorbatch.push(attendance.session_id);
    fillSelectFeild(cmbSession, "Select Session", sessionlistaccorbatch, 'name', attendance.session_id.name);
    cmbSession.style.border = "2px solid green";

    dteDate.value = attendance.date;
    setValid(dteDate);
    dteDate.style.border = "2px solid green";

    fillSelectFeild(cmbAttendanceStatus, "Select Status", statuses, 'name', attendance.attendance_status_id.name);
    cmbAttendanceStatus.style.border = "2px solid green";

   // txtHeadCount.value = attendance.present_count;

    getstudentListByBatch();


    divShowTotalRegCount.innerText = attendance.reg_count;


    divShowPresentCount.innerText = attendance.present_count;


    divShowAbsentCount.innerText = attendance.absant_count;


   // getCheckHeadCount();

    buttonDisable(false,true);


}

function rowDelete(){

}

const checkError = () => {
    let errors = "";

    if (attendance.batch_id == null) {
        setInvalid(cmbBatchName);
        cmbBatchName.style.border = '2px solid red';
        errors = errors + "Batch name is not Entered...  \n";
    } else {

    }

    // if (attendance.session_id == null) {
    //     setInvalid(cmbSession);
    //     cmbSession.style.border = '2px solid red';
    //     errors = errors + "Session is not Entered...  \n";
    // } else {
    //
    // }

    if (attendance.date == null) {
        setInvalid(dteDate);
        dteDate.style.border = '2px solid red';
        errors = errors + "Date is not Entered...  \n";
    } else {

    }

    // if (attendance.present_count == null) {
    //     setInvalid(divShowPresentCount);
    //     divShowPresentCount.style.border = '2px solid red';
    //     errors = errors + "Please select student attendance...  \n";
    // } else {
    //
    // }

    // if(attendance.attendance_has_students.length == 0){
    //     errors = errors + "Please select session...  \n";
    // }

    return errors;

}

const btnAddMC = () => {
    console.log(attendance)
    //submit krddi ena mg eka
    let submitMsg = 'Are you sure to add following Attendance....!' + '<br>' + '' + /*'<br>' + 'Session Name : ' + JSON.parse(cmbSession.value).name*/
        + '<br>' + 'Prsent Count : ' + divShowPresentCount.innerText + '<br>' + divShowAbsentCount.innerText;
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
                    let serverResponce = httpServiceRequest("/attendance", "POST", attendance);
                    //let serverResponce = "0";
                    if (serverResponce == "0") {
                        //server error ekak nathnm employeewa add wenwa
                        iziToast.success({
                            title: 'OK Attendance Add Successfully...!',
                            position: 'topRight',
                        });
                        refreshAttendanceTable();
                        refreshAttendanceForm();
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
                        let putresponce = httpServiceRequest("/attendance", "PUT", attendance);
                        if (putresponce == "0") {
                            //window.alert("Update Successfully...")
                            iziToast.success({
                                title: 'Update Successfully...!',
                                position: 'topRight',
                            });
                            refreshAttendanceTable();
                            refreshAttendanceForm();
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

    if(attendance != null && oldattendance != null){
        if(attendance.cmbBatchName != oldsession.cmbBatchName){
            update = update + "Batch is changed \n" ;
        }
        // if(attendance.cmbSession != oldattendance.cmbSession){
        //     update = update + "Session changed \n" ;
        // }
        if(attendance.dteDate != oldattendance.dteDate){
            update = update + "Date changed \n" ;
        }

    }

    return update;
}


function rowView(){

}


const refreshAttendanceForm = () => {

    attendance = new Object();
    oldattendance = null;


    attendance.attendance_has_students = new Array();

    // batch_names = getServiceRequest("/batch/listbyloggeduser");
    // fillSelectFeild (cmbBatchName, "Select Batch name", batch_names, 'batch_name', '');
    // statuses = getServiceRequest("/attendancestatus/getlist");
    // fillSelectFeild (cmbAttendanceStatus, "Select Status", statuses, 'name', 'Valid',true);
    // attendance.attendance_status_id = JSON.parse(cmbAttendanceStatus.value);

    let getloguser = getServiceRequest("/logeduser");
    let dtecurdate = getCurrentDate("date" , "");

    dteDate.value = getCurrentDate("date" , "");
    attendance.date = dteDate.value;
    setValid(dteDate);
    dteDate.max = dteDate.value;



    if((getloguser.role == "Manager" || getloguser.role == "Admin" ) ||  dteDate.value == dtecurdate) {

        //document.getElementById("finishedexam").classList.remove("d-none");
        document.getElementById("dteDate").disabled = false;
        getBatchName();


    } else {
        document.getElementById("dteDate").disabled = true;
        getBatchName();
        //document.getElementById("finishedexam").style.display = "none";
    }


    // dteDate.value = getCurrentDate("date" , "");
    // attendance.date = dteDate.value;
    // setValid(dteDate);
    // dteDate.max = dteDate.value;





    divShowTotalRegCount.innerHTML = "";
    divShowPresentCount.innerHTML = "";
    divShowAbsentCount.innerHTML = "";





    buttonDisable(true,false);

    }

 function getBatchName(){

     batch_names = getServiceRequest("/batch/batchlistaccorsdateandenddate?date="+dteDate.value);
     fillSelectFeild (cmbBatchName, "Select Batch name", batch_names, 'batch_name', '');

 }





//
// function getSessionsToday(){
//
//     sessionslist = getServiceRequest("/session/sessionnameaccordate?date="+dteDate.value);
//     fillSelectFeild (cmbSession, "Select Session", sessionslist,'name','');
//
//
// }


// function getSessionList(){
//
//     sessionlistaccorbatch = getServiceRequest("/session/listbybatch?batchid="+JSON.parse(cmbBatchName.value).id)
//     fillSelectFeild (cmbSession, "Select Session", sessionlistaccorbatch,'name','');
//
//
// }


// function getstudentListByBatch(){
//     divShowPresentCount.innerText = "";
//     divShowAbsentCount.innerText = "";
//     // btnAddAttendance.disabled = true;
//
//     let studentListByBatch = getServiceRequest("/student/bysession?bid=" + JSON.parse(cmbBatchName.value).id)
//
//    let tableBody =  tblStuAttendance.children[1]
//     tableBody.innerHTML = "";
//
//     if(studentListByBatch.length != 0){
//         divShowTotalRegCount.innerText = studentListByBatch.length;
//
//         attendance.reg_count = studentListByBatch.length;
//
//         if(oldattendance == null){
//             attendance.attendance_has_students = new Array();
//             for(let index in studentListByBatch) {
//
//                 let attestu = new Object();
//
//                 attestu.student_id = studentListByBatch[index];
//                 attestu.present_or_absent = false;
//
//                 attendance.attendance_has_students.push(attestu);
//             }
//
//         }
//
//         absentCount = attendance.attendance_has_students.length;
//         for(let index in attendance.attendance_has_students){
//
//
//             let tr = document.createElement("tr");
//             //list eke inn plaweniyage id eka gannwa
//             tr.id = attendance.attendance_has_students[index].student_id.id;
//
//             let intTD = document.createElement("td");
//             intTD.innerText=parseInt(index) + 1;
//             tr.appendChild(intTD);
//
//             let stunoTD = document.createElement("td");
//             stunoTD.innerText=attendance.attendance_has_students[index].student_id.studentno;
//             tr.appendChild(stunoTD);
//
//             let callingTD = document.createElement("td");
//             callingTD.innerText=attendance.attendance_has_students[index].student_id.calling_name;
//             tr.appendChild(callingTD);
//
//             let checkTD = document.createElement("td");
//             let checkBox = document.createElement("input");
//             let checkBoxLabel = document.createElement("label");
//             if(attendance.attendance_has_students[index].present_or_absent){
//                 checkBoxLabel.innerText = " Present";
//
//             }else {
//                 checkBoxLabel.innerText = " Absent";
//             }
//
//
//             checkBoxLabel.classList.add("form-check-label");
//             checkBoxLabel.classList.add("ms-2");
//             checkBoxLabel.classList.add("fw-bold");
//
//             checkBox.type = "checkbox";
//             checkBox.classList.add("form-check-input");
//
//
//             checkBox.onchange = function () {
//                 let attendindex = attendance.attendance_has_students.map(e => e.student_id.id).indexOf(parseInt(this.parentNode.parentNode.id));
//                 if(this.checked){
//                     attendance.attendance_has_students[attendindex].present_or_absent = true;
//                     this.parentNode.children[1].innerText = "Present";
//                     absentCount = parseInt(absentCount)-1;
//                 }else{
//                     attendance.attendance_has_students[attendindex].present_or_absent = false;
//                     this.parentNode.children[1].innerText = "Absent";
//                     absentCount = parseInt(absentCount)+1;
//                 }
//
//                 attendance.absant_count = absentCount;
//                 attendance.present_count = parseInt(attendance.reg_count)-parseInt(attendance.absant_count);
//                 divShowPresentCount.innerText = attendance.present_count;
//                 divShowAbsentCount.innerText = attendance.absant_count;
//
//             }
//
//             if(attendance.attendance_has_students[index].present_or_absent){
//                 checkBox.checked = true;
//                 absentCount = parseInt(absentCount)-1;
//
//             }
//
//
//             checkTD.appendChild(checkBox);
//             checkTD.appendChild(checkBoxLabel);
//             tr.appendChild(checkTD);
//
//
//
//             tableBody.appendChild(tr);
//         }
//
//     }
//
//
//
//     // if(oldattendance !=null){
//     //
//     //     for(){
//     //         let extIndex = attendance.attendance_has_students.map(e => e.student_id.id).indexOf(parseInt(this.parentNode.parentNode.id));
//     //         if(extIndex != -1){
//     //             checkBox.checked = true;
//     //         }
//     //     }
//     //
//     //
//     // }
// }

function getstudentListByBatch(){
    divShowPresentCount.innerText = "";
    divShowAbsentCount.innerText = "";
    // btnAddAttendance.disabled = true;

    let studentListByBatch = getServiceRequest("/student/bysession?bid=" + JSON.parse(cmbBatchName.value).id)

    let tableBody =  tblStuAttendance.children[1]
    tableBody.innerHTML = "";

    if(studentListByBatch.length != 0){
        divShowTotalRegCount.innerText = studentListByBatch.length;
        divShowPresentCount.innerText = studentListByBatch.length;
        divShowAbsentCount.innerText = 0;

        attendance.reg_count = studentListByBatch.length;
        attendance.present_count = studentListByBatch.length;
        attendance.absant_count = 0

        if(oldattendance == null){
            attendance.attendance_has_students = new Array();
            for(let index in studentListByBatch) {

                let attestu = new Object();

                attestu.student_id = studentListByBatch[index];
                attestu.present_or_absent = true;

                attendance.attendance_has_students.push(attestu);
            }

        }

        absentCount = attendance.attendance_has_students.length;
        for(let index in attendance.attendance_has_students){


            let tr = document.createElement("tr");
            //list eke inn plaweniyage id eka gannwa
            tr.id = attendance.attendance_has_students[index].student_id.id;

            let intTD = document.createElement("td");
            intTD.innerText=parseInt(index) + 1;
            tr.appendChild(intTD);

            let stunoTD = document.createElement("td");
            stunoTD.innerText=attendance.attendance_has_students[index].student_id.studentno;
            tr.appendChild(stunoTD);

            let callingTD = document.createElement("td");
            callingTD.innerText=attendance.attendance_has_students[index].student_id.calling_name;
            tr.appendChild(callingTD);

            let checkTD = document.createElement("td");
            let checkBox = document.createElement("input");
            let checkBoxLabel = document.createElement("label");
            if(attendance.attendance_has_students[index].present_or_absent){
                checkBoxLabel.innerText = "Present ";

            }else {
                checkBoxLabel.innerText = "Absent ";
            }


            checkBoxLabel.classList.add("form-check-label");
            checkBoxLabel.classList.add("ms-2");
            checkBoxLabel.classList.add("fw-bold");

            checkBox.type = "checkbox";
            checkBox.classList.add("form-check-input");


            checkBox.onchange = function () {
                let attendindex = attendance.attendance_has_students.map(e => e.student_id.id).indexOf(parseInt(this.parentNode.parentNode.id));
                if(this.checked){
                    attendance.attendance_has_students[attendindex].present_or_absent = true;
                    this.parentNode.children[1].innerText = "Present";
                    absentCount = parseInt(absentCount)-1;
                }else{
                    attendance.attendance_has_students[attendindex].present_or_absent = false;
                    this.parentNode.children[1].innerText = "Absent";
                    absentCount = parseInt(absentCount)+1;
                }

                attendance.absant_count = absentCount;
                attendance.present_count = parseInt(attendance.reg_count)-parseInt(attendance.absant_count);
                divShowPresentCount.innerText = attendance.present_count;
                divShowAbsentCount.innerText = attendance.absant_count;

            }

            if(attendance.attendance_has_students[index].present_or_absent){
                checkBox.checked = true;
                absentCount = parseInt(absentCount)-1;

            }


            checkTD.appendChild(checkBox);
            checkTD.appendChild(checkBoxLabel);
            tr.appendChild(checkTD);



            tableBody.appendChild(tr);
        }

    }



    // if(oldattendance !=null){
    //
    //     for(){
    //         let extIndex = attendance.attendance_has_students.map(e => e.student_id.id).indexOf(parseInt(this.parentNode.parentNode.id));
    //         if(extIndex != -1){
    //             checkBox.checked = true;
    //         }
    //     }
    //
    //
    // }
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


//
// function getCheckHeadCount(){
//    // let headCount = txtHeadCount.value;
//
//     console.log(absentCount)
//     console.log(attendance.reg_count)
//     if(parseInt(absentCount) == parseInt(attendance.reg_count) - parseInt(headCount)){
//         btnAddAttendance.disabled = false;
//
//         divShowPresentCount.innerText = parseInt(headCount);
//         attendance.present_count = parseInt(headCount);
//
//         divShowAbsentCount.innerText = parseInt(absentCount);
//         attendance.absant_count = parseInt(absentCount);
//     } else {
//         btnAddAttendance.disabled = true;
//
//         divShowPresentCount.innerText = "";
//         attendance.present_count = null;
//
//         divShowAbsentCount.innerText = "";
//         attendance.absant_count = null;
//     }
//
//
// }




function getAttendanceDate(){

    let selBatchStartDate = getServiceRequest("/batch/getstartdate?batchname="+batchimplement.batch_name)
    let setMinDateForAttendance = new Date(selBatchStartDate);

    dteDate.min = getCurrentDate3("date",setMinDateForAttendance);

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



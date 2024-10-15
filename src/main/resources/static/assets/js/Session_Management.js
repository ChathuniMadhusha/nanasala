window.addEventListener('load', loadUI);

//window eka load weddi watena function eka
function loadUI() {
    console.log("Browser onload");


    // $( "#cmbCourseName" ).select2({
    //     theme: "bootstrap"
    // });

    loggedUserPrivilege = getServiceRequest("/privilage/bymodule/"+"SESSION_MANAGEMENT" );

    refreshSessionTable();
    refreshSessionForm();


    //enable tooltip
    $('[data-bs-toggle = "tooltip"]').tooltip();
}

const refreshSessionTable = () => {
    sessions = getServiceRequest("/session/findall")

    //properties list eka
    let displayPropertyList = ['name','lec_hall_id.code','batch_id.batch_name','session_date','start_time','session_type_id.name','session_status_id.name'];
    let displayDataList = ['text','object','object','text','text','object','object'];
    let statusColorList = [{name:"Cancled", colorClass:"deleted-cell-style",buttondisabled:true},{name:"Active", colorClass:"active-cell-style",buttondisabled:false},{name:"Temporary Unavilaible", colorClass:"temporary-unavilable-cell-style",buttondisabled:false}];

    fillDataTableNew(tblSession, sessions, displayPropertyList, displayDataList, true, 'editob', btnEdit,btnDelete,btnView);


    $('#tblSession').dataTable();
}

function formRefill(seid){

    session = getServiceRequest("/session/getbyid?id=" + window[seid]['id']);
    oldsession = getServiceRequest("/session/getbyid?id=" + window[seid]['id']);

    changeTab("form");

    dteSessionDate.value = session.session_date;
    setValid(dteSessionDate);
    dteSessionDate.style.border = "2px solid green";

    tmeStartTime.value = session.start_time;
    setValid(tmeStartTime);
    tmeStartTime.style.border = "2px solid green";

    tmeEndTime.value = session.end_time;
    setValid(tmeEndTime);
    tmeEndTime.style.border = "2px solid green";

    sessionName.value = session.name;
    setValid(sessionName);
    sessionName.style.border = "2px solid green";


    fillSelectFeild(cmbSessionType, "Select Type", session_types, 'name', session.session_type_id.name);
    cmbSessionType.style.border = "2px solid green";

    fillSelectFeild(cmbBatchName, "Select Batch name", batch_names, 'name', session.batch_id.batch_name);
    cmbBatchName.style.border = "2px solid green";

    halllist = getServiceRequest("/lecturehall/getByLecturehall?sessiondate="+dteSessionDate.value+"&starttime="+tmeStartTime.value+"&endtime="+tmeEndTime.value)

    fillSelectFeild(cmbLecHall, "Select Lecture Hall", halllist, 'code', session.lec_hall_id.code);
    cmbLecHall.style.border = "2px solid green";

    buttonDisable(false,true);


}

// const resetStuBatchRegistration = () => {
//
//     txtRegNo.value = "";
//     setDefauld(txtRegNo);
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

function rowDelete(sessionob){

    if(window[sessionob].session_status_id.name == "Cancled") {
        iziToast.error({
            title: 'aaaaa \n',
            position: 'topRight',
        });
    } else {

        let deleteMsg = "Are you sure to Delete following Session...? " + '<br>'
        "Session Name : " + window[sessionob].name;

        iziToast.info({
            messageColor: 'black',
            message: deleteMsg,
            position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
            progressBarColor: 'rgb(0, 255, 184)',
            buttons: [
                ['<button style="color: black"><b>Ok</b></button>', function (instance,toast) {
                    instance.hide({ transitionOut: 'fadeOutUp' }, toast);
                    let responce = httpServiceRequest("/session", "DELETE", window[sessionob]);
                    if (responce == "0") {
                        // window.alert("Student Delete Successfully.......!");
                        iziToast.success({
                            title: 'OK Session Delete Successfully...!',
                            position: 'topRight',
                            //message: 'Student Add Successfully...!',
                        });
                        refreshSessionTable();
                        refreshSessionForm();
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

const checkError = () => {
    let errors = "";

    if (session.session_date == null) {
        setInvalid(dteSessionDate);
        dteSessionDate.style.border = '2px solid red';
        errors = errors + "Date is not Entered...  \n";
    } else {

    }

    if (session.start_time == null) {
        setInvalid(tmeStartTime);
        tmeStartTime.style.border = '2px solid red';
        errors = errors + "Start Time is not Entered...  \n";
    } else {

    }

    if (session.end_time == null) {
        setInvalid(tmeEndTime);
        tmeEndTime.style.border = '2px solid red';
        errors = errors + "End Time is not Entered...  \n";
    } else {

    }

    if (session.session_type_id == null) {
        setInvalid(cmbSessionType);
        cmbSessionType.style.border = '2px solid red';
        errors = errors + "Type is not Entered...  \n";
    } else {

    }

    if (session.lec_hall_id == null) {
        setInvalid(cmbLecHall);
        cmbLecHall.style.border = '2px solid red';
        errors = errors + "Lecture Hall not Entered...  \n";
    } else {

    }

    if (session.batch_id == null) {
        setInvalid(cmbBatchName);
        cmbBatchName.style.border = '2px solid red';
        errors = errors + "Batch Code is not Entered...  \n";
    } else {

    }


    return errors;

}

const btnAddMC = () => {
    //submit krddi ena mg eka
    let submitMsg = 'Are you sure to add following Session....!' + '<br>' + '' + '<br>' + 'Session Name : ' + sessionName.value
        + '<br>' + 'Lecture Hall : ' + JSON.parse(cmbLecHall.value).code;
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
                    let serverResponce = httpServiceRequest("/session", "POST", session);
                    //let serverResponce = "0";
                    if (serverResponce == "0") {
                        //server error ekak nathnm employeewa add wenwa
                        iziToast.success({
                            title: 'OK Session Add Successfully...!',
                            position: 'topRight',
                        });
                        refreshSessionTable();
                        refreshSessionForm();
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
                        let putresponce = httpServiceRequest("/session", "PUT", session);
                        if (putresponce == "0") {
                            //window.alert("Update Successfully...")
                            iziToast.success({
                                title: 'Update Successfully...!',
                                position: 'topRight',
                            });
                            refreshSessionTable();
                            refreshSessionForm();
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

    if(session != null && oldsession != null){
        if(session.dteSessionDate != oldsession.dteSessionDate){
            update = update + "Date is changed \n" ;
        }
        if(session.tmeStartTime != oldsession.tmeStartTime){
            update = update + "Start time changed \n" ;
        }
        if(session.tmeEndTime != oldsession.tmeEndTime){
            update = update + "End time changed \n" ;
        }
        if(session.cmbSessionType != oldsession.cmbSessionType){
            update = update + "Type changed \n" ;
        }
        if(session.cmbLecHall != oldsession.cmbLecHall){
            update = update + "Lecture Hall changed \n" ;
        }
        if(session.cmbBatchName != oldsession.cmbBatchName){
            update = update + "Batch Name changed \n" ;
        }

    }

    return update;
}


function rowView(){

}

const refreshSessionForm = () => {

    session = new Object();
    oldsession = null;

    session_types = getServiceRequest("/sessiontype/getlist");
    fillSelectFeild (cmbSessionType, "Select Session type", session_types, 'name', '');

    batch_names = getServiceRequest("/batch/findall");
    fillSelectFeild (cmbBatchName, "Select Batch name", batch_names, 'batch_name', '');

    statuses = getServiceRequest("/sessionstatus/getlist");
    fillSelectFeild (cmbSessionStatus, "Select Status", statuses, 'name', 'Active',true);
    session.session_status_id = JSON.parse(cmbSessionStatus.value);

    dateSessionAdded.value = getCurrentDate("date" , "");


    buttonDisable(true,false);

    }




function gethallList() {

    halllist = getServiceRequest("/lecturehall/getByLecturehall?sessiondate="+dteSessionDate.value+"&starttime="+tmeStartTime.value+"&endtime="+tmeEndTime.value)

    fillSelectFeild (cmbLecHall, "Select hall", halllist,'code','');

}



function getSessionName() {

    if(session.batch_id != null && session.session_type_id != null && session.session_date != null + session.start_time != null){
        var name = "";
        var word = session.session_type_id.name;
        var combine = word.match(/\b(\w)/g);
        var final = combine.join('');

        name = session.batch_id.batch_name + " " + "-" + " " + final + " " + "-" + " " + session.session_date + " " + "-" + " " + session.start_time;
            //name = session.batch_id.batch_name + "-" + (JSON.parse(cmbSessionType.value).name).charAt(0) + (JSON.parse(cmbSessionType.value).name).charAt(7) + "-" + session.session_date + "-" + session.start_time;

        sessionName.value = name;
        session.name = sessionName.value;
        setValid(sessionName);


    }

}

function getEndTime() {

    let endDateTime = new Date(dteSessionDate.value+"T"+tmeStartTime.value+":00");

    let batchDuration;
    if(JSON.parse(cmbSessionType.value).name == "Theory Session")
        batchDuration = JSON.parse(cmbBatchName.value).therory_allocate_time;
    else
        batchDuration = JSON.parse(cmbBatchName.value).practical_allocate_time;


    //hadagena tynne mili seconds walata
    let endTime =  (batchDuration * 60 * 60 * 1000);

    endDateTime.setMilliseconds(endDateTime.getMilliseconds()+endTime);
    console.log(endDateTime);
    tmeEndTime.value = getCurrentDate("time" ,endDateTime);
    session.end_time = tmeEndTime.value;
    setValid(tmeEndTime);

    gethallList();



}

function getNextSessionDate(){

    let currentDate = new Date();
    let nextSessionDate = new Date();
    //dawasta adaala ankaya soya ganiimata
    let currentWeekDay = currentDate.getDay();

    if(cmbBatchName.value != ""){
        let batchWeekDay;
        if(JSON.parse(cmbSessionType.value).name == "Theory Session")
            batchWeekDay = JSON.parse(cmbBatchName.value).theory_day_id.day_no;
        else
            batchWeekDay = JSON.parse(cmbBatchName.value).practical_day_id.day_no;

        //console.log(batchWeekDay);

        let datesCountForNextdate = 7 -  currentWeekDay + batchWeekDay ;
        nextSessionDate.setDate(nextSessionDate.getDate()+datesCountForNextdate)
        //console.log(nextSessionDate);

        dteSessionDate.value = nextSessionDate.getFullYear() + getDateAndMonth(nextSessionDate,"monthdate");
        session.session_date = dteSessionDate.value;
        setValid(dteSessionDate);



    }





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

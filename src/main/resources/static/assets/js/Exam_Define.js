window.addEventListener('load', loadUI);

//window eka load weddi watena function eka
function loadUI() {
    console.log("Browser onload");


   loggedUserPrivilege = getServiceRequest("/privilage/bymodule/"+"EXAM_DEFINE" );

    refreshExamTable();
    refreshExamForm();


    $('[data-bs-toggle = "tooltip"]').tooltip();
}


const refreshExamTable = () => {

    exams = getServiceRequest("/exam/findall")

    //properties list eka
    let displayPropertyList = ['acadamic_year_id.name','course_id.course_name','exam_name','exam_status.name'];
    let displayDataList = ['object','object','text','object'];
    let statusColorList = [{name:"Destroyed", colorClass:"deleted-cell-style",buttondisabled:true},{name:"Avilable", colorClass:"active-cell-style",buttondisabled:false},{name:"Not Avilable", colorClass:"temporary-unavilable-cell-style",buttondisabled:false}];

    fillDataTableNew(tblExam, exams, displayPropertyList, displayDataList, true, 'editob', btnEdit,btnDelete,btnView);



    $('#tblExam').dataTable();


}

const resetStuForm = () => {



}

function formRefill(exam) {

    examdefine = getServiceRequest("exam/getbyid?id=" + window[exam]['id']);
    oldexamdefine = getServiceRequest("exam/getbyid?id=" + window[exam]['id']);

    changeTab("form");

    fillSelectFeild(cmbCourseCatogary, "Select Course Catogary", course_cats, 'name', examdefine.course_id.course_catogary_id.name);
    cmbCourseCatogary.style.border = "2px solid green";

    fillSelectFeild(cmbAAcadamicYear, "Select Acadamic Year", acadamic_years, 'name', examdefine.acadamic_year_id.name);
    cmbAAcadamicYear.style.border = "2px solid green";

    courselist = getServiceRequest("/course/coursenameaccortocat?id="+JSON.parse(cmbCourseCatogary.value).id)

    fillSelectFeild(cmbCourseName, "Select Course name", courselist, 'course_name', examdefine.course_id.course_name);
    cmbCourseName.style.border = "2px solid green";


    exam_numbers.push(examdefine.exam_number_id);
    fillSelectFeild(cmbExamNumber, "Select Exam Number", exam_numbers, 'name', examdefine.exam_number_id.name);
    cmbExamNumber.style.border = "2px solid green";

    examName.value = examdefine.exam_name;
    setValid(examName);
    examName.style.border = "2px solid green";

    // batchlist = getServiceRequest("/batch/getBatchList?coursecat="+JSON.parse(cmbCourseCatogary.value).id+"&acadamicyear="+JSON.parse(cmbAAcadamicYear.value).id);
    //
    // fillSelectFeild(cmbBatch, "Select Batch List", batchlist, 'batch_name', examdefine.batch_id.batch_name);
    // cmbBatch.style.border = "2px solid green";

    innerRefreshForm();

    buttonDisable(false,true);


}

function rowDelete(examob) {

    if(window[examob].exam_status.name == "In-Active") {
        iziToast.error({
            title: 'aaaaa \n',
            position: 'topRight',
        });
    } else {

        let deleteMsg = "Are you sure to Delete following Exam...? " +
            "Exam : " + window[examob].course_id.course_name;

        iziToast.info({
            messageColor: 'black',
            message: deleteMsg,
            position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
            progressBarColor: 'rgb(0, 255, 184)',
            buttons: [
                ['<button style="color: black"><b>Ok</b></button>', function (instance,toast) {
                    instance.hide({ transitionOut: 'fadeOutUp' }, toast);
                    let responce = httpServiceRequest("/exam", "DELETE", window[examob]);
                    if (responce == "0") {
                        // window.alert("Student Delete Successfully.......!");
                        iziToast.success({
                            title: 'OK Course Delete Successfully...!',
                            position: 'topRight',
                            //message: 'Student Add Successfully...!',
                        });
                        refreshExamTable();
                        refreshExamForm();
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

function rowView() {

}




const refreshExamForm = () => {
    examdefine = new Object();
    oldexamdefine = null;


        dteAddedDate.value = getCurrentDate("date" , "");


        examstatus = getServiceRequest("/examstatus/getlist");
        fillSelectFeild(cmbExamStatus, "Select Status", examstatus, 'name', 'Active',true);
        examdefine.exam_status = JSON.parse(cmbExamStatus.value);
        cmbExamStatus.style.border = "2px solid green";

        course_cats = getServiceRequest("/coursecatogary/getlist");
        fillSelectFeild (cmbCourseCatogary, "Select Course Catogary", course_cats,'name','');

        acadamic_years = getServiceRequest("/acadamicyear/getlist");
        fillSelectFeild (cmbAAcadamicYear, "Select Acadamic Year", acadamic_years, 'name', '');

        exam_numbers = getServiceRequest("/examnumber/getlist")
        fillSelectFeild (cmbExamNumber, "Select Exam Number", exam_numbers, 'name', '');



    examdefine.exam_has_examtypes = new Array();

        innerRefreshForm();


        buttonDisable(true,false);

}

// const getBatchListAccorCourseCatandAcaYear = () => {
//
//     batchlist = getServiceRequest("/batch/getBatchList?coursecat="+JSON.parse(cmbCourseCatogary.value).id+"&acadamicyear="+JSON.parse(cmbAAcadamicYear.value).id)
//
//     fillSelectFeild (cmbBatch, "Select Batch", batchlist,'batch_name','');
//
// }


const getCourseListAccordingtoCourseCat = () => {

    courselist = getServiceRequest("/course/coursenameaccortocat?id="+JSON.parse(cmbCourseCatogary.value).id)
    fillSelectFeild(cmbCourseName,"Select Course Name",courselist,'course_name','');

}


function getExamNumberList(){

    examnumberlist = getServiceRequest("/examnumber/byCourCatNameAcadYear?caid="+JSON.parse(cmbCourseCatogary.value).id+"&cnid="+JSON.parse(cmbCourseName.value).id+"&ayid="+JSON.parse(cmbAAcadamicYear.value).id);
    fillSelectFeild (cmbExamNumber, "Select Exam Number", examnumberlist,'name','');

}

const getExamName = () => {

   // if(examdefine.batch_id != null && examdefine.exam_number_id != null){
    if(cmbCourseCatogary.value!="" && cmbCourseName.value!="" && cmbAAcadamicYear.value!="" && cmbExamNumber.value!=""){
        var name = "";

        //name = examdefine.batch_id.course_catogary_id.name + " " + "-" + " " + examdefine.batch_id.course_id.course_name + " " + "-" + " " + examdefine.batch_id.acadamic_year_id.name + " " + "-" + " " + examdefine.exam_number_id.name;
        //name = session.batch_id.batch_name + "-" + (JSON.parse(cmbSessionType.value).name).charAt(0) + (JSON.parse(cmbSessionType.value).name).charAt(7) + "-" + session.session_date + "-" + session.start_time;
        name = JSON.parse(cmbCourseCatogary.value).name + " " + "-" + " " + JSON.parse(cmbCourseName.value).course_name + " " + "-" + " " + JSON.parse(cmbAAcadamicYear.value).name + " " + "-" + " " + JSON.parse(cmbExamNumber.value).name;

        examName.value = name;
        examdefine.exam_name = examName.value;
        setValid(examName);
    }
}

const checkError = () => {
    let errors = "";

    if (examdefine.course_id == null) {
        setInvalid(cmbCourseCatogary);
        cmbCourseCatogary.style.border = '2px solid red';
        errors = errors + "Course Catogary is not Entered...  \n";
    } else {

    }

    if (examdefine.acadamic_year_id == null) {
        setInvalid(cmbAAcadamicYear);
        cmbAAcadamicYear.style.border = '2px solid red';
        errors = errors + "Acadamic Year is not Entered...  \n";
    } else {

    }

    if (examdefine.course_id == null) {
        setInvalid(cmbCourseName);
        cmbCourseName.style.border = '2px solid red';
        errors = errors + "Course name Name is not Entered...  \n";
    } else {

    }

    if (examdefine.exam_number_id == null) {
        setInvalid(cmbExamNumber);
        cmbExamNumber.style.border = '2px solid red';
        errors = errors + "Batch Name is not Entered...  \n";
    } else {

    }

    if (examdefine.exam_application_deadline == null) {
        setInvalid(dteExamApplicationDeadlines);
        dteExamApplicationDeadlines.style.border = '2px solid red';
        errors = errors + "Exam application deadline is not Entered...  \n";
    } else {

    }


        return errors;
    }

const checkUpdate = () => {
    let update = "";

    if(examdefine != null && oldexamdefine != null){
        if(examdefine.cmbCourseCatogary != oldexamdefine.cmbCourseCatogary){
            update = update + "Course Catogary is changed \n" ;
        }
        if(examdefine.cmbAAcadamicYear != oldexamdefine.cmbAAcadamicYear){
            update = update + "Acadamic Year is changed \n" ;
        }
        if(examdefine.cmbBatch != oldexamdefine.cmbBatch){
            update = update + "Batch name is changed \n" ;
        }
        if(examdefine.dteExamApplicationDeadlines != oldexamdefine.dteExamApplicationDeadlines){
            update = update + "Exam application deadline is changed \n" ;
        }
    }
    return update;
}

const btnAddMC = () => {
    console.log(examdefine);
    let examtypelist = getServiceRequest("/examtype/getlist")

    //meka aha ganna oni
    examdefine.exam_type_id = examtypelist[examdefine.exam_type_id];

        let submitMsg = "Are you sure to Add this Type ";
    let errors = checkError();
    if(errors == ""){
        iziToast.info({
            messageColor: 'black',
            message: submitMsg,
            position: 'topCenter', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
            progressBarColor: 'rgb(0, 255, 184)',
            buttons: [
                ['<button style="color: black"><b>Ok</b></button>', function (instance,toast) {
                    instance.hide({ transitionOut: 'fadeOutUp' }, toast);
                    let serverResponce = httpServiceRequest("/exam","POST",examdefine);
                    //server errors tynwda kiyla check knrwa
                    if(serverResponce == "0"){
                        //server erros nathnm meka display wenwa
                        iziToast.success({
                            title: 'OK Type Add Successfully...!',
                            position: 'topCenter',
                            //message: 'Student Add Successfully...!',
                        });
                        refreshExamTable();
                        refreshExamForm();
                     //   resetStuForm();
                        changeTab("table");
                    }else{
                        //server errors tynwnm meka diplay wenwa
                        iziToast.error({
                            title: 'Error Not Successfully inserted \n' + serverResponce,
                            position: 'topRight',
                            //message: 'Not Successfully inserted \n' + serverResponce,
                        });
                    }

                },true], // true to focus
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
    }else {
        iziToast.error({
            title: 'You Have Following Errors : '+ '<br>' + errors,
            position: 'topCenter',
            //message: 'Not Successfully inserted \n' + serverResponce,
        });
    }

}

const btnUpdateMC = () => {

    let errors = checkError()
    if(errors == ""){
        let update = checkUpdate();
        if(update == ""){
            iziToast.success({
                title: 'No Changes',
                position: 'topRight',
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
                        let putresponce = httpServiceRequest("/exam", "PUT", examdefine);
                        if (putresponce == "0") {
                            //window.alert("Update Successfully...")
                            iziToast.success({
                                title: 'Update Successfully...!',
                            });
                            refreshExamTable();
                            refreshExamForm();
                           // resetStuForm();
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
    }else{
        iziToast.error({
            title: 'Error Not Successfully Update...' + errors,
            position: 'topRight',
            //message: 'Not Successfully inserted \n' + serverResponce,
        });
    }
}

const innerRefreshForm = () => {
    examtype = new Object();
    oldexamtype = null;





        types = getServiceRequest("/examtype/getlist");
       fillSelectFeild(cmbType, "Select Features", types, 'name', '');

    cmbType.value="";
    setDefauld(cmbType);

    dteExamDate.value="";
    setDefauld(dteExamDate);

    tmeStartTime.value="";
    setDefauld(tmeStartTime);

    tmeEndTime.value="";
    setDefauld(tmeEndTime);



        let displayPropertyList = ['exam_type_id.name','exam_date','start_time','end_time'];
        let displayDataList = ['object','text','text','text'];
        let statusColorList = [];

        fillDataTable(tblExamType,examdefine.exam_has_examtypes,displayPropertyList,displayDataList,
            modifyInner,deleteInnerRow,viewInnerRow,true,false,statusColorList,loggedUserPrivilege);

    getExamTypeList();





}

function modifyInner(examtypes,innerindex) {

    innerRowIndex = innerindex;

    examtype = JSON.parse(JSON.stringify(examtypes));
    oldexamtype = JSON.parse(JSON.stringify(examtypes));

    changeTab("form");

    fillSelectFeild(cmbType, "Select Types", types, 'name', examtype.exam_type_id.name);
    cmbType.style.border = "2px solid green";
    cmbType.disabled = true;


    dteExamDate.value = examtype.exam_date;
    setValid(dteExamDate);
    dteExamDate.style.border = "2px solid green";

    tmeStartTime.value = examtype.start_time;
    setValid(tmeStartTime);
    tmeStartTime.style.border = "2px solid green";

    tmeEndTime.value = examtype.end_time;
    setValid(tmeEndTime);
    tmeEndTime.style.border = "2px solid green";

}

function deleteInnerRow(examtypes,innerindex) {

    let deleteMsg = "Are you sure to Delete following type...? " +
        "Type : " + examtype.exam_type_id.batch_name;

    iziToast.info({
        messageColor: 'black',
        message: deleteMsg,
        position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
        progressBarColor: 'rgb(0, 255, 184)',
        buttons: [
            ['<button style="color: black"><b>Ok</b></button>', function (instance,toast) {
                instance.hide({ transitionOut: 'fadeOutUp' }, toast);

                examdefine.exam_has_examtypes.splice(innerindex,1);
                innerRefreshForm();


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

function viewInnerRow() {

}

function checkErrorInner(){

    let errors = "";

    if(examtype.exam_type_id == null){
        setInvalid(cmbType);
        cmbType.style.border = '2px solid red';
        errors = errors + "Type is not Entered...  \n";
    }else {

    }

    if(examtype.exam_date == ""){
        setInvalid(dteExamDate);
        dteExamDate.style.border = '2px solid red';
        errors = errors + "Exam date is not Entered...  \n";
    }else {

    }

    if(examtype.start_time == ""){
        setInvalid(tmeStartTime);
        tmeStartTime.style.border = '2px solid red';
        errors = errors + "Start time is not Entered...  \n";
    }else {

    }

    if(examtype.end_time == ""){
        setInvalid(tmeEndTime);
        tmeEndTime.style.border = '2px solid red';
        errors = errors + "End time is not Entered...  \n";
    }else {

    }

        return errors;

}

function checkUpdateInner(){

    let update = "";

    if(examtype != null && oldexamtype != null){

        if(examtype.exam_date != oldexamtype.exam_date){
            update = update + "Exam Date is changed \n" ;
        }
        if(examtype.start_time != oldexamtype.start_time){
            update = update + "Start Time is changed \n" ;
        }
        if(examtype.end_time != oldexamtype.end_time){
            update = update + "End Time is changed \n" ;
        }

    }
    return update;
}


function btnAddInnFormMC(){

    let submitMsg = "Are you sure to Add this Type ";
    let errors = checkErrorInner();
    if(errors == ""){

        let extype = false;

    for(let index in examdefine.exam_has_examtypes ){
        if(examdefine.exam_has_examtypes[index].exam_type_id.name == examtype.exam_type_id.name ){
            extype = true;
            break;
        }
    }


    if (extype){
        alert("all ready ext")
    }else {

       let checkTime = false;
        for(let index in examdefine.exam_has_examtypes ){
            if(examdefine.exam_has_examtypes[index].exam_date == examtype.exam_date ){
                let extExamSDate = new Date(examdefine.exam_has_examtypes[index].exam_date+"T"+examdefine.exam_has_examtypes[index].start_time);
                let extExamEDate = new Date(examdefine.exam_has_examtypes[index].exam_date+"T"+examdefine.exam_has_examtypes[index].end_time);
                let newExamSDate = new Date(examtype.exam_date+"T"+examtype.start_time);
                let newExamEDate = new Date(examtype.exam_date+"T"+examtype.end_time);

                if(( extExamSDate.getTime() <=  newExamSDate.getTime() && extExamEDate.getTime() >=  newExamSDate.getTime()) || (extExamSDate.getTime() <=  newExamEDate.getTime() && extExamEDate.getTime() >=  newExamEDate.getTime())){
                    checkTime = true;
                    break;
                }
            }
        }

        if (checkTime){
            alert("time allready used")
        }else {
            iziToast.info({
                messageColor: 'black',
                message: "Are you sure to add this type...?",
                position: 'topCenter', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
                progressBarColor: 'rgb(0, 255, 184)',
                buttons: [
                    ['<button style="color: black"><b>Ok</b></button>', function (instance,toast) {
                        instance.hide({ transitionOut: 'fadeOutUp' }, toast);



                        //list ekakata data push karanwa
                        examdefine.exam_has_examtypes.push(examtype);
                        innerRefreshForm();

                        iziToast.success({
                            title: 'OK Type Add Successfully...!',
                            position: 'topCenter',
                            //message: 'Student Add Successfully...!',
                        });


                    },true], // true to focus
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



    } else {
        iziToast.error({
            title: 'You Have Following Errors : '+ '<br>' + errors,
            position: 'topCenter',
            //message: 'Not Successfully inserted \n' + serverResponce,
        });
    }

}

function btnUpdateInnFormMC(){

    let errors = checkErrorInner()
    if(errors == ""){
        let update = checkUpdateInner();
        if(update == ""){
            iziToast.success({
                title: 'No Changes',
                position: 'topRight',
            });
        }else {
            //let updaterespoce = window.confirm("Are Your sure to update this fiels : " + updates);
            iziToast.info({
                messageColor: 'black',
                title: 'Are Your sure to update this fields :' + update,
                position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
                progressBarColor: 'rgb(0, 255, 184)',
                buttons: [
                    ['<button style="color: black"><b>Ok</b></button>', function (instance,toast) {
                        instance.hide({ transitionOut: 'fadeOutUp' }, toast);

                        examdefine.exam_has_examtypes[innerRowIndex] = examtype;
                        innerRefreshForm();

                        iziToast.success({
                            title: 'OK Type Update Successfully...!',
                            position: 'topCenter',
                            //message: 'Student Add Successfully...!',
                        });


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


function getBatchDetails() {

    let batchlistaccorcourse = getServiceRequest("/batch/batchnameaccortocourse?cid=" + JSON.parse(cmbCourseName.value).id)

    let tableBody = tblBatch.children[1]
    tableBody.innerHTML = "";

    if (batchlistaccorcourse.length != 0) {

        let displayPropertyList = ['batch_name','end_date'];
        let displayDataList = ['text','text'];

        fillDataTableExamBatch(tblBatch, batchlistaccorcourse, displayPropertyList, displayDataList );


    }
}


function getExamDate(){

    let setMinDateForExam = new Date(dteExamApplicationDeadlines.value);

    setMinDateForExam.setDate((setMinDateForExam.getDate()+25))
    dteExamDate.min = getCurrentDate2("date",setMinDateForExam);

}


function getApplicationDeadline(){

    let getmaxdate = getServiceRequest("/batch/getmaxenddate?cid=" + JSON.parse(cmbCourseName.value).id)

    let currentDateForMin = new Date(getmaxdate);
    console.log(currentDateForMin);

    currentDateForMin.setDate(currentDateForMin.getDate() + 20);


    dteExamApplicationDeadlines.min = getCurrentDate2("date", currentDateForMin);

    // let currentDateForMax = new Date();
    // currentDateForMax.setDate(currentDateForMax.getDate()+90);
    // dteExamApplicationDeadlines.max = getCurrentDate2("date",currentDateForMax);


}


function getExamTypeList(){

    let examtypelist = getServiceRequest("/examtype/examtypeaccorcourse?cid="+JSON.parse(cmbCourseName.value).id);
    console.log(examtypelist);

    fillSelectFeild(cmbType,"Select Exam Type",examtypelist,'name','');


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
        $("#btnUpdate").removeAttr('disabled');
        $("#btnUpdate").css('pointer-event', 'all');
        $("#btnUpdate").css('cursor', 'pointer');

    }else{
        $("#btnUpdate").css('pointer-event', 'all');
        $("#btnUpdate").css('cursor', 'not-allowed');
        $("#btnUpdate").attr('disabled','disabled');

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
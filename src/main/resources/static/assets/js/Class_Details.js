window.addEventListener('load', loadUI);

//window eka load weddi watena function eka
function loadUI() {
    console.log("Browser onload");


    loggedUserPrivilege = getServiceRequest("/privilage/bymodule/"+"CLASS_IMPLEMENTATION" );

    $('#cmbAcadamicYear').select2({
        theme:'bootstrap-5',
    });

    refreshClassTable();
    refreshClassForm();

    //enable tooltip
    $('[data-bs-toggle = "tooltip"]').tooltip();
}

const refreshClassTable = () => {
    classes = getServiceRequest("/class/findall")

    //properties list eka
    let displayPropertyList = ['class_name','teacher_employee_id.empcallingname','week_day_id.name','class_start_time','class_status_id.name'];
    let displayDataList = ['text','object','object','text','object'];
    let statusColorList = [{name:"In-Active", colorClass:"deleted-cell-style",buttondisabled:true},{name:"Active", colorClass:"active-cell-style",buttondisabled:false}];

    fillDataTableNew(tblClass, classes, displayPropertyList, displayDataList, true, 'editob', btnEdit,btnDelete,btnView);


    $('#tblClass').dataTable();
}


function formRefill(cls){

    classdetails = getServiceRequest("class/getbyid?id=" + window[cls]['id']);
    oldclass = getServiceRequest("class/getbyid?id=" + window[cls]['id']);

    changeTab("form");

    txtClassName.value = classdetails.class_name;
    setValid(txtClassName);
    txtClassName.style.border = "2px solid green";

    txtStartDate.value = classdetails.start_date;
    setValid(txtStartDate);
    txtStartDate.style.border = "2px solid green";

    txtTimeDuration.value = classdetails.time_duration;
    setValid(txtTimeDuration);
    txtTimeDuration.style.border = "2px solid green";

    txtStartTime.value = classdetails.class_start_time;
    setValid(txtStartTime);
    txtStartTime.style.border = "2px solid green";

    txtEndTime.value = classdetails.class_end_time;
    setValid(txtEndTime);
    txtEndTime.style.border = "2px solid green";

    txtMonthlyFee.value = classdetails.monthly_fee;
    setValid(txtMonthlyFee);
    txtMonthlyFee.style.border = "2px solid green";

    txtRegFee.value = classdetails.reg_fee;
    setValid(txtRegFee);
    txtRegFee.style.border = "2px solid green";

    txtClassCode.value = classdetails.code;
    setValid(txtClassCode);
    txtClassCode.style.border = "2px solid green";

    fillSelectFeild(cmbAcadamicYear, "Select Acadamic Year", acadamic_years, 'name', classdetails.class_acadamic_year_id.name);
    cmbAcadamicYear.style.border = "2px solid green";

    fillSelectFeild(cmbClassSub, "Select Subject", class_subjects, 'name', classdetails.class_subject_id.name);
    cmbClassSub.style.border = "2px solid green";

    fillSelectFeild(cmbClassCat, "Select Catogary", class_Catogaries, 'name', classdetails.class_catogary_id.name);
    cmbClassCat.style.border = "2px solid green";

    fillSelectFeild(cmbClassType, "Select Type", class_types, 'name', classdetails.class_type_id.name);
    cmbClassType.style.border = "2px solid green";

    fillSelectFeild (cmbWeekDay, "Select Class Day", weekdays,'name',classdetails.week_day_id.name);
    cmbWeekDay.style.border = "2px solid green";

    employeewithteacherandsubjects = getServiceRequest("/employee/employeewithteacherandsubject?id="+JSON.parse(cmbClassSub.value).id)

    fillSelectFeild2(cmbClassTeacher,"Select Teacher",employeewithteacherandsubjects,'empno','empcallingname',classdetails.teacher_employee_id.empcallingname);
    cmbClassTeacher.style.border = "2px solid green";

    // fillSelectFeild (cmbLecHall, "Select lec hall", lecturehalls,'code',classdetails.lec_hall_id.code);
    // cmbLecHall.style.border = "2px solid green";
    buttonDisable(false,true);

}

function rowView(){

}


function rowDelete(classob){


    if(window[classob].class_status_id.name == "In-Active") {
        iziToast.error({
            title: 'aaaaa \n',
            position: 'topRight',
        });
    } else {

        let deleteMsg = "Are you sure to Delete following Course...? " +
            "Course Catogary : " + window[classob]['class_catogary_id'].name;

        iziToast.info({
            messageColor: 'black',
            message: deleteMsg,
            position: 'topCenter', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
            progressBarColor: 'rgb(0, 255, 184)',
            buttons: [
                ['<button style="color: black"><b>Ok</b></button>', function (instance,toast) {
                    instance.hide({ transitionOut: 'fadeOutUp' }, toast);
                    let responce = httpServiceRequest("/class", "DELETE", window[classob]);
                    if (responce == "0") {
                        // window.alert("Student Delete Successfully.......!");
                        iziToast.success({
                            title: 'OK Class Delete Successfully...!',
                            position: 'topCenter',
                            //message: 'Student Add Successfully...!',
                        });
                        refreshClassTable();
                        refreshClassForm();
                        // resetForm();
                        changeTab("table");
                    } else {
                        iziToast.error({
                            title: 'Not Complete \n' + responce,
                            position: 'topCenter',
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
    let submitMsg = 'Are you sure to add following Class....!' + '<br>' + '' + '<br>' +  'Class Name : ' + txtClassName.value
        + '<br>' + 'Class Code : ' + txtClassCode.value;
    //errors tynwda kiyla check krnwa
    let errors = checkError();
    //errors nathnm ....
    if(errors == ""){
        iziToast.info({
            messageColor: 'black',
            message: submitMsg,
            position: 'topCenter', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
            progressBarColor: 'rgb(0, 255, 184)',
            buttons: [
                ['<button style="color: black"><b>Ok</b></button>', function (instance,toast) {
                    instance.hide({ transitionOut: 'fadeOutUp' }, toast);
                    //server eken error ekak enwda kiyla blnwa..
                    let serverResponce = httpServiceRequest("/class","POST",classdetails);
                    if(serverResponce == "0"){
                        //server error ekak nathnm class eka add wenwa
                        iziToast.success({
                            title: 'OK Class Add Successfully...!',
                            position: 'topCenter',
                        });
                        refreshClassTable();
                        refreshClassForm();
                        changeTab("table");
                    }else{
                        //server error ekak tyenwnm add wene nha,, me wdhta error mg eka enwa
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
        //uda check karapu thana errors tynwnm menna me errors tynwa kiyla mg eka enwa
    }else{
        //alert("you have following error"+ errors);
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
                        let putresponce = httpServiceRequest("/class", "PUT", classdetails);
                        if (putresponce == "0") {
                            //window.alert("Update Successfully...")
                            iziToast.success({
                                title: 'Update Successfully...!',
                            });
                            refreshClassTable()
                            refreshClassForm();
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

const checkError = () => {
    let errors = "";

    if (classdetails.class_acadamic_year_id == null) {
        setInvalid(cmbAcadamicYear);
        cmbAcadamicYear.style.border = '2px solid red';
        errors = errors + "Class Acadamic Year is not Entered...  \n";
    } else {

    }

    if (classdetails.class_subject_id == null) {
        setInvalid(cmbClassSub);
        cmbClassSub.style.border = '2px solid red';
        errors = errors + "Class Subject is not Entered...  \n";
    } else {

    }

    if (classdetails.class_catogary_id == null) {
        setInvalid(cmbClassCat);
        cmbClassCat.style.border = '2px solid red';
        errors = errors + "Class catogary is not Entered...  \n";
    } else {

    }

    if (classdetails.class_type_id == null) {
        setInvalid(cmbClassType);
        cmbClassType.style.border = '2px solid red';
        errors = errors + "Class type is not Entered...  \n";
    } else {

    }

    if (classdetails.teacher_employee_id == null) {
        setInvalid(cmbClassTeacher);
        cmbClassTeacher.style.border = '2px solid red';
        errors = errors + "Class Teacher is not Entered...  \n";
    } else {

    }

    if (classdetails.class_name == null) {
        setInvalid(txtClassName);
        txtClassName.style.border = '2px solid red';
        errors = errors + "Class name is not Entered...  \n";
    } else {

    }

    if (classdetails.code == null) {
        setInvalid(txtClassCode);
        txtClassCode.style.border = '2px solid red';
        errors = errors + "Class code is not Entered...  \n";
    } else {

    }

    if (classdetails.start_date == null) {
        setInvalid(txtStartDate);
        txtStartDate.style.border = '2px solid red';
        errors = errors + "Start date is not Entered...  \n";
    } else {

    }

    if (classdetails.week_day_id == null) {
        setInvalid(cmbWeekDay);
        cmbWeekDay.style.border = '2px solid red';
        errors = errors + "Week day is not Entered...  \n";
    } else {

    }


    if (classdetails.time_duration == null) {
        setInvalid(txtTimeDuration);
        txtTimeDuration.style.border = '2px solid red';
        errors = errors + "Duration is not Entered...  \n";
    } else {

    }

    if (classdetails.class_start_time == null) {
        setInvalid(txtStartTime);
        txtStartTime.style.border = '2px solid red';
        errors = errors + "Class start time is not Entered...  \n";
    } else {

    }

    if (classdetails.class_end_time == null) {
        setInvalid(txtEndTime);
        txtEndTime.style.border = '2px solid red';
        errors = errors + "Class end time is not Entered...  \n";
    } else {

    }

    if (classdetails.monthly_fee == null) {
        setInvalid(txtMonthlyFee);
        txtMonthlyFee.style.border = '2px solid red';
        errors = errors + "Monthly fee is not Entered...  \n";
    } else {

    }

    if (classdetails.reg_fee == null) {
        setInvalid(txtRegFee);
        txtRegFee.style.border = '2px solid red';
        errors = errors + "Reg fee is not Entered...  \n";
    } else {

    }


    return errors;

}

const checkUpdate = () => {

    let update = "";

    if(classdetails != null && oldclass != null){
        if(classdetails.class_acadamic_year_id != oldclass.class_acadamic_year_id){
            update = update + "Acadamic Year is changed \n" ;
        }
        if(classdetails.class_subject_id != oldclass.class_subject_id){
            update = update + "Class Subject is changed \n" ;
        }
        if(classdetails.class_catogary_id != oldclass.class_catogary_id){
            update = update + "Class Catogary is changed \n" ;
        }
        if(classdetails.class_type_id != oldclass.class_type_id){
            update = update + "Class Type is changed \n" ;
        }
        if(classdetails.teacher_employee_id != oldclass.teacher_employee_id){
            update = update + "Class Teacher is changed \n" ;
        }
        if(classdetails.class_name != oldclass.class_name){
            update = update + "Class name is changed \n" ;
        }
        if(classdetails.code != oldclass.code){
            update = update + "Class Code is changed \n" ;
        }
        if(classdetails.start_date != oldclass.start_date){
            update = update + "Class Start date is changed \n" ;
        }
        if(classdetails.week_day_id != oldclass.week_day_id){
            update = update + "Week Day is changed \n" ;
        }
        if(classdetails.time_duration != oldclass.time_duration){
            update = update + "Time duration is changed \n" ;
        }
        if(classdetails.class_start_time != oldclass.class_start_time){
            update = update + "Class start time is changed \n" ;
        }
        if(classdetails.class_end_time != oldclass.class_end_time){
            update = update + "Class end time is changed \n" ;
        }
        if(classdetails.monthly_fee != oldclass.monthly_fee){
            update = update + "Monthly fee is changed \n" ;
        }
        if(classdetails.reg_fee != oldclass.reg_fee){
            update = update + "Reg fee is changed \n" ;
        }
        if(classdetails.class_status_id != oldclass.class_status_id){
            update = update + "Class Status is changed \n" ;
        }
    }

    return update;
}


const refreshClassForm = () => {

    classdetails = new Object();
    oldclass = null;
    
    class_Catogaries = getServiceRequest("/classcatogary/getlist");
    fillSelectFeild (cmbClassCat, "Select Class Catogary", class_Catogaries, 'name', '');
    
    class_types = getServiceRequest("/classtype/getlist");
    fillSelectFeild (cmbClassType, "Select Class type", class_types,'name','');

    class_status = getServiceRequest("/classstatus/getlist");
    fillSelectFeild(cmbClassStatus, "Select Class Status", class_status, 'name', 'Active',true);
    classdetails.class_status_id = JSON.parse(cmbClassStatus.value);
    cmbClassStatus.style.border = "2px solid green";

    // employeewithteacher = getServiceRequest("/employee/employeewithteacher")
    // fillSelectFeild2(cmbClassTeacher,"Select",employeewithteacher,'empno','empcallingname');

    employeewithteacherandsubjects = getServiceRequest("/employee/employeewithteacherandsubject")
    fillSelectFeild2(cmbClassTeacher,"Select Teacher",employeewithteacherandsubjects,'empno','empcallingname');

    class_subjects = getServiceRequest("/classsubject/getlist");
    fillSelectFeild (cmbClassSub, "Select Class Subjects", class_subjects, 'name', '');

    acadamic_years = getServiceRequest("/classacadamicyear/getlist");
    fillSelectFeild (cmbAcadamicYear, "Select Acadamic Year", acadamic_years, 'name', '');

    weekdays = getServiceRequest("/weekdays/getlist");
    fillSelectFeild (cmbWeekDay, "Select Class Day", weekdays,'name','');

    // lecturehalls = getServiceRequest("/lecturehall/findall");
    // fillSelectFeild (cmbLecHall, "Select Lecture hall", lecturehalls,'code','');

    dateCourseAssignDate.value = getCurrentDate("date","");

    buttonDisable(true,false);


}

function getClassName() {
    var name = "";

    if (classdetails.class_acadamic_year_id != null && classdetails.class_subject_id != null &&
        classdetails.class_catogary_id != null && classdetails.class_type_id != null) {


        name = classdetails.class_acadamic_year_id.name + " " + "-" + " " + classdetails.class_subject_id.name + " " + "-" + " " + classdetails.class_catogary_id.name
            + " " + "-" + " " + classdetails.class_type_id.name;
    }

    console.log(name);
    txtClassName.value = name;
    classdetails.class_name = txtClassName.value;
    setValid(txtClassName);

}


function getTeacher(){

    teacherslist = getServiceRequest("/employee/employeewithteacherandsubject?id="+JSON.parse(cmbClassSub.value).id)
    fillSelectFeild2(cmbClassTeacher,"Select Teacher",teacherslist,'empno','empcallingname');


}

function getClassCode(){

    if (classdetails.class_acadamic_year_id != null && classdetails.class_subject_id != null &&
        classdetails.class_catogary_id != null && classdetails.class_type_id != null) {

        var classcode = "";
        var word = classdetails.class_name;
        var combine = word.match(/\b(\w)/g);
            console.log(combine)
        if(combine.length == 5){
            if(classdetails.class_catogary_id.name == "Grade 10" || classdetails.class_catogary_id.name == "Grade 11" ){
                classcode = word.split(" ")[0] + word.split(" ")[2] +combine[2]  + classdetails.class_catogary_id.name.split(" ")[1] + combine[4];
            } else{
                classcode = word.split(" ")[0] + word.split(" ")[2] +combine[2]  +combine[3] + combine[4];
            }
            console.log(classcode)
            txtClassCode.value = classcode;
            let extclasscode = getServiceRequest("/class/byclasscode/"+classcode);
            console.log(extclasscode)
            if(extclasscode.code != null){
                //database eke thiyenwa (exist wenawa)
                setInvalid(txtClassCode);
                iziToast.error({
                    title: 'This Class Code is exist ',
                    position: 'topCenter',
                    //message: 'Not Successfully inserted \n' + serverResponce,
                });
                //false
            }else {
                //database eke nha
                //true
                document.getElementById("txtClassCode").disabled = true;
                classdetails.code = txtClassCode.value;
                setValid(txtClassCode);
            }
        }
    }

}

function getEndTime(){

    let endDateTime = new Date( getCurrentDate("date","") + "T" + txtStartTime.value+":00");

    let entTime = (txtTimeDuration.value * 60 * 60 * 1000);

    endDateTime.setMilliseconds(endDateTime.getMilliseconds()+entTime);

    txtEndTime.value = endDateTime.getHours()+":"+endDateTime.getMinutes();
    classdetails.class_end_time = txtEndTime.value;
    setValid(txtEndTime);

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

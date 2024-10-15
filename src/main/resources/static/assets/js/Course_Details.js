window.addEventListener('load', loadUI);

//window eka load weddi watena function eka
function loadUI() {
    console.log("Browser onload");


    loggedUserPrivilege = getServiceRequest("/privilage/bymodule/"+"COURSE_IMPLEMENTATION" );

    refreshCourseTable();
    refreshCourseForm();
    refreshDurationForm();
    refreshCourseCatForm();
    refreshCourseModuleForm();

    //enable tooltip
    $('[data-bs-toggle = "tooltip"]').tooltip();
}

const refreshCourseTable = () => {
    courses = getServiceRequest("/course/findall")

    //properties list eka
    let displayPropertyList = ['course_catogary_id.name','course_code','cordinator_employee_id.empcallingname','course_duration_id.name','course_status_id.name'];
    let displayDataList = ['object','text','object','object','object'];
    let statusColorList = [{name: "Active", colorClass: "active-cell-style", buttondisabled: false},
        {name: "In-Active", colorClass: "deleted-cell-style", buttondisabled: true}];

    fillDataTableNew(tblCourse, courses, displayPropertyList, displayDataList, true, 'editob', btnEdit,btnDelete,btnView);

    $('#tblCourse').dataTable();
}



const resetCourseImplForm = () => {

    cmbCourseCat.value = "";
    setDefauld(cmbCourseCat);

    cmbCourseLevel.value = "";
    setDefauld(cmbCourseLevel);

    cmbCourseType.value = "";
    setDefauld(cmbCourseType);

    txtCourseName.value = "";
    setDefauld(txtCourseName);

    txtCourseCode.value = "";
    setDefauld(txtCourseCode);

    cmbCordinator.value = "";
    setDefauld(cmbCordinator);

    txtCourseFee.value = "";
    setDefauld(txtCourseFee);

    cmbDuration.value = "";
    setDefauld(cmbDuration);

}


function formRefill(cus){

    course = getServiceRequest("course/getbyid?id=" + window[cus]['id']);
    oldcourse = getServiceRequest("course/getbyid?id=" + window[cus]['id']);

    changeTab("form");

    txtCourseName.value = course.course_name;
    setValid(txtCourseName);
    txtCourseName.style.border = "2px solid green";

    txtCourseCode.value = course.course_code;
    setValid(txtCourseCode);
    txtCourseCode.style.border = "2px solid green";

    txtCourseFee.value = course.course_fee;
    setValid(txtCourseFee);
    txtCourseFee.style.border = "2px solid green";

    // txtRegFee.value = course.reg_fee;
    // setValid(txtRegFee);
    // txtRegFee.style.border = "2px solid green";

    // examtypes = getServiceRequest("/examtype/getlist");
    //
    // divExamTypes.innerHTML = "";
    // for(let index in examtypes){
    //     //dom lawwa element 3 hada gatta
    //     divexamtype = document.createElement('div');
    //     divexamtype.classList.add('form-check');
    //     inputCheckBox = document.createElement('input');
    //     inputCheckBox.type = "checkbox";
    //     inputCheckBox.value = index;
    //     inputCheckBox.classList.add('form-check-input');
    //     //event eka alla ganwa
    //     inputCheckBox.onchange = function (){
    //         if(this.checked) {
    //             console.log("checked");
    //             console.log(this.value);
    //             course.examtypes.push(examtypes[this.value]);
    //         } else {
    //             console.log("unchecked");
    //             console.log(this.value);
    //             course.examtypes.splice(this.value,1);
    //         }
    //
    //     }
    //
    //     if(course.examtypes.length != 0){
    //         let extIndex = course.examtypes.map(e => e.name).indexOf(examtypes[index]["name"]);
    //         if(extIndex != -1){
    //             inputCheckBox.checked = true;
    //         }
    //     }
    //
    //     inputLabel = document.createElement('label');
    //     inputLabel.innerHTML = examtypes[index]["name"];
    //     inputLabel.classList.add('form-check-label');
    //     inputLabel.classList.add('fw-bold');
    //
    //     divexamtype.appendChild(inputCheckBox);
    //     divexamtype.appendChild(inputLabel);
    //     divExamTypes.appendChild(divexamtype);
    // }


    fillSelectFeild(cmbCourseCat, "Select Course Catogary", course_Catogaries, 'name', course.course_catogary_id.name);
    cmbCourseCat.style.border = "2px solid green";

    fillSelectFeild(cmbCourseLevel, "Select Course Level", course_Level, 'name', course.course_level_id.name);
    cmbCourseLevel.style.border = "2px solid green";

    fillSelectFeild(cmbCourseType, "Select Course Type", course_Type, 'name', course.course_type_id.name);
    cmbCourseType.style.border = "2px solid green";

    teacherslist = getServiceRequest("/employee/getEmployeesWithTecherAndCAtogary?id="+JSON.parse(cmbCourseCat.value).id)

    fillSelectFeild(cmbCordinator, "Select Course Cordinator", teacherslist, 'empcallingname', course.cordinator_employee_id.empcallingname);
    cmbCordinator.style.border = "2px solid green";

    fillSelectFeild(cmbDuration, "Select Duration", course_Duration, 'name', course.course_duration_id.name);
    cmbDuration.style.border = "2px solid green";

    fillSelectFeild(cmbCourseStatus, "Select Status", course_Status, 'name', course.course_status_id.name);
    cmbCourseStatus.style.border = "2px solid green";

    fillSelectFeild(cmdSelectedModules,'', course.courseModules,'name','');

    allModuleList = getServiceRequest("coursemodule/getlistbycourse?cid="+cus.id+"&ccid="+JSON.parse(cmbCourseCat.value).id);
    fillSelectFeild (cmdAllModules, "", allModuleList,'name','');


    buttonDisable(false,true);

}

function rowDelete(courseob){

    if(window[courseob].course_status_id.name == "In-Active") {
        iziToast.error({
            title: 'aaaaa \n',
            position: 'topRight',
        });
    }else {
        let deleteMsg = "Are you sure to Delete following Course...? " +
            "Course Catogary : " + window[courseob]['course_name'];

        iziToast.info({
            messageColor: 'black',
            message: deleteMsg,
            position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
            progressBarColor: 'rgb(0, 255, 184)',
            buttons: [
                ['<button style="color: black"><b>Ok</b></button>', function (instance,toast) {
                    instance.hide({ transitionOut: 'fadeOutUp' }, toast);
                    let responce = httpServiceRequest("/course", "DELETE", window[courseob]);
                    if (responce == "0") {
                        // window.alert("Student Delete Successfully.......!");
                        iziToast.success({
                            title: 'OK Course Delete Successfully...!',
                            position: 'topRight',
                            //message: 'Student Add Successfully...!',
                        });
                        refreshCourseTable();
                        refreshCourseForm();
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
    console.log(course);
    //submit krddi ena mg eka
    let submitMsg = 'Are you sure to add following Course....!' + '<br>' + '' + '<br>' + 'Course Name : ' + txtCourseName.value
        + '<br>' + 'Course Code : ' + txtCourseCode.value;
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
                    let serverResponce = httpServiceRequest("/course", "POST", course);
                    if (serverResponce == "0") {
                        //server error ekak nathnm employeewa add wenwa
                        iziToast.success({
                            title: 'OK Course Add Successfully...!',
                            position: 'topRight',
                        });
                        refreshCourseTable();
                        refreshCourseForm();
                        resetCourseImplForm();

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
                        let putresponce = httpServiceRequest("/course", "PUT", course);
                        if (putresponce == "0") {
                            //window.alert("Update Successfully...")
                            iziToast.success({
                                title: 'Update Successfully...!',
                            });
                            refreshCourseTable()
                            refreshCourseForm();
                            resetCourseImplForm();
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




const checkUpdate = () => {
    let update = "";

    if(course != null && oldcourse != null){
        if(course.course_catogary_id != oldcourse.course_catogary_id){
            update = update + "Course Catogary is changed \n" ;
        }
        if(course.course_level_id != oldcourse.course_level_id){
            update = update + "Course Level is changed \n" ;
        }
        if(course.course_type_id != oldcourse.course_type_id){
            update = update + "Course Type is changed \n" ;
        }
        if(course.course_name != oldcourse.course_name){
            update = update + "Course Name is changed \n" ;
        }
        if(course.course_code != oldcourse.course_code){
            update = update + "Course Code is changed \n" ;
        }
        if(course.cordinator_employee_id != oldcourse.cordinator_employee_id){
            update = update + "Course Cordinator is changed \n" ;
        }
        if(course.duration != oldcourse.duration){
            update = update + "Course Duration is changed \n" ;
        }
        if(course.course_fee != oldcourse.course_fee){
            update = update + "Course Fee is changed \n" ;
        }
        if(course.course_status_id != oldcourse.course_status_id){
            update = update + "Employee No is changed \n" ;
        }

    }
    return update;
}

const checkError = () => {
    let errors = "";

    if (course.course_catogary_id == null) {
        setInvalid(cmbCourseCat);
        cmbCourseCat.style.border = '2px solid red';
        errors = errors + "Course Catogary is not Entered...  \n";
    } else {

    }

    if (course.course_level_id == null) {
        setInvalid(cmbCourseLevel);
        cmbCourseLevel.style.border = '2px solid red';
        errors = errors + "Course Level is not Entered...  \n";
    } else {

    }

    if (course.course_type_id == null) {
        setInvalid(cmbCourseType);
        cmbCourseType.style.border = '2px solid red';
        errors = errors + "Course Type is not Entered...  \n";
    } else {

    }

    if (course.course_code == null) {
        setInvalid(txtCourseCode);
        txtCourseCode.style.border = '2px solid red';
        errors = errors + "Course Code is not Entered...  \n";
    } else {

    }

    if (course.course_duration_id == null) {
        setInvalid(cmbDuration);
        cmbDuration.style.border = '2px solid red';
        errors = errors + "Course Duration is not Entered...  \n";
    } else {

    }

    if (course.course_fee == null) {
        setInvalid(txtCourseFee);
        txtCourseFee.style.border = '2px solid red';
        errors = errors + "Course Duration is not Entered...  \n";
    } else {

    }

    return errors;

}

function rowView(){

}

function getCourseName(){

    var name = "";

    if(course.course_catogary_id != null && course.course_level_id != null && course.course_type_id != null){
            name = course.course_type_id.name + " " + course.course_level_id.name + " " + "in" + " " + course.course_catogary_id.name;
    }

    txtCourseName.value = name;
    course.course_name = txtCourseName.value;
    setValid(txtCourseName);


}

const refreshDurationForm = () => {

    duration = new Object();
    oldduration = null;


}

function getNoOfDays(){

    let noOfDays = "";

    noOfDays = parseFloat(txtDuration.value) * 30;

    txtNoOfDays.value = noOfDays;
    duration.no_of_days = txtNoOfDays.value;
}



const refreshCourseModuleForm = () => {

    coursemodule = new Object();
    oldcoursemodule = null;

    course_Catogaries = getServiceRequest("/coursecatogary/getlist");
    fillSelectFeild (cmbCourseCatogary, "Select Course Catogary", course_Catogaries, 'name', '');

}


function btnAddCourseModuleMC (){

    //submit krddi ena mg eka
    let submitMsg = 'Are you sure to add following Duration....!' + '<br>' + '' + '<br>' + 'Course Name : ' + txtCourseName.value
        + '<br>' + 'Course Code : ' + txtCourseCode.value;
    //errors tynwda kiyla check krnwa
    let errors = checkErrorCoMod();
    //errors nathnm ....
    if (errors == "") {
        iziToast.info({
            image: 'assets/img/employee1.png',
            messageColor: 'black',
            message: submitMsg,
            position: 'topCenter', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
            progressBarColor: 'rgb(0, 255, 184)',
            buttons: [
                ['<button style="color: black"><b>Ok</b></button>', function (instance, toast) {
                    instance.hide({transitionOut: 'fadeOutUp'}, toast);
                    //server eken error ekak enwda kiyla blnwa..
                    let serverResponce = httpServiceRequest("/coursemodule", "POST", coursemodule);
                    if (serverResponce == "0") {
                        //server error ekak nathnm employeewa add wenwa
                        iziToast.success({
                            title: 'OK Duration Add Successfully...!',
                            position: 'topCenter',
                        });
                        refreshCourseModuleForm();
                        refreshCourseForm();


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
            position: 'topCenter',
            //message: 'Not Successfully inserted \n' + serverResponce,
        });
    }

}

function checkErrorCoMod () {

    let errors = "";

    if (coursemodule.name == null) {
        setInvalid(txtCourseModule);
        txtCourseModule.style.border = '2px solid red';
        errors = errors + "Course Code is not Entered...  \n";
    } else {

    }

    if (coursemodule.course_catogary_id == null) {
        setInvalid(course_catogary_id);
        course_catogary_id.style.border = '2px solid red';
        errors = errors + "Course Code is not Entered...  \n";
    } else {

    }

    return errors;


}


function btnAddDurationMC(){

    //submit krddi ena mg eka
    let submitMsg = 'Are you sure to add following Duration....!' + '<br>' + '' + '<br>' + 'Course Name : ' + txtCourseName.value
        + '<br>' + 'Course Code : ' + txtCourseCode.value;
    //errors tynwda kiyla check krnwa
    let errors = checkErrorDu();
    //errors nathnm ....
    if (errors == "") {
        iziToast.info({
            image: 'assets/img/employee1.png',
            messageColor: 'black',
            message: submitMsg,
            position: 'topCenter', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
            progressBarColor: 'rgb(0, 255, 184)',
            buttons: [
                ['<button style="color: black"><b>Ok</b></button>', function (instance, toast) {
                    instance.hide({transitionOut: 'fadeOutUp'}, toast);
                    //server eken error ekak enwda kiyla blnwa..
                    let serverResponce = httpServiceRequest("/duration", "POST", duration);
                    if (serverResponce == "0") {
                        //server error ekak nathnm employeewa add wenwa
                        iziToast.success({
                            title: 'OK Duration Add Successfully...!',
                            position: 'topCenter',
                        });
                        refreshDurationForm();
                        refreshCourseForm();



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
            position: 'topCenter',
            //message: 'Not Successfully inserted \n' + serverResponce,
        });
    }


}


const refreshCourseCatForm = () => {

    coursecat = new Object();
    oldcoursecat = null;


}



function btnAddCatogaryMC(){

    //submit krddi ena mg eka
    let submitMsg = 'Are you sure to add following Catogary....!' + '<br>' + '' + '<br>' + 'Catogary Name : ' + txtCourseName.value;
    //errors tynwda kiyla check krnwa
    let errors = checkErrorCat();
    //errors nathnm ....
    if (errors == "") {
        iziToast.info({
            image: 'assets/img/employee1.png',
            messageColor: 'black',
            message: submitMsg,
            position: 'topCenter', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
            progressBarColor: 'rgb(0, 255, 184)',
            buttons: [
                ['<button style="color: black"><b>Ok</b></button>', function (instance, toast) {
                    instance.hide({transitionOut: 'fadeOutUp'}, toast);
                    //server eken error ekak enwda kiyla blnwa..
                    let serverResponce = httpServiceRequest("/coursecatogary", "POST", coursecat);
                    if (serverResponce == "0") {
                        //server error ekak nathnm employeewa add wenwa
                        iziToast.success({
                            title: 'OK Course Catogary Add Successfully...!',
                            position: 'topCenter',
                        });

                        refreshCourseCatForm();
                        refreshCourseForm();
                        $('#editeCourseCat').modal('hide');


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
            position: 'topCenter',
            //message: 'Not Successfully inserted \n' + serverResponce,
        });
    }
}


function checkErrorCat(){

    let errors = "";

    if (coursecat.name == null) {
        setInvalid(txtCourseCat);
        txtCourseCat.style.border = '2px solid red';
        errors = errors + "Course Catogary is not Entered...  \n";
    } else {

    }

    if (coursecat.prac_include_or_not == null) {
        box.style.border = "2px solid red";

        errors = errors + "Session not Entered...  \n";
    } else {

    }

    return errors;
}


function checkErrorDu(){

    let errors = "";

    if (duration.name == null) {
        setInvalid(cmbDuration);
        cmbDuration.style.border = '2px solid red';
        errors = errors + "Course Code is not Entered...  \n";
    } else {

    }

    return errors;
}


const refreshCourseForm = () => {

    course = new Object();
    oldcourse = null;


    course.examtypes = new Array();


    //roles = [{ id: 1, role: "Admin" }, { id: 2, role: "Manager" }, { id: 4, role: "Recesptionist" } , { id: 3, role: "Teacher" }, { id: 5, role: "Demostrator" }];
    examtypes = getServiceRequest("/examtype/getlist");

    divExamTypes.innerHTML = "";
    for(let index in examtypes){
        //dom lawwa element 3 hada gatta
        divexamtype = document.createElement('div');
        divexamtype.classList.add('form-check');
        inputCheckBox = document.createElement('input');
        inputCheckBox.type = "checkbox";
        inputCheckBox.value = index;
        inputCheckBox.classList.add('form-check-input');
        //event eka alla ganwa
        inputCheckBox.onchange = function (){
            if(this.checked) {
                console.log("checked");
                console.log(this.value);
                course.examtypes.push(examtypes[this.value]);
            } else {
                console.log("unchecked");
                console.log(this.value);
                course.examtypes.splice(this.value,1);
            }
        }

        if(course.examtypes.length != 0){
            let extIndex = course.examtypes.map(e => e.examtypes).indexOf(examtypes[index]["exam_type"]);
            console.log(extIndex);
        }

        inputLabel = document.createElement('label');
        inputLabel.innerHTML = examtypes[index]["name"];
        inputLabel.classList.add('form-check-label');
        inputLabel.classList.add('fw-bold');

        divexamtype.appendChild(inputCheckBox);
        divexamtype.appendChild(inputLabel);
        divExamTypes.appendChild(divexamtype);
    }

    course_Catogaries = getServiceRequest("/coursecatogary/getlist");
    fillSelectFeild (cmbCourseCat, "Select Course Catogary", course_Catogaries, 'name', '');
    
    course_Level = getServiceRequest("/courselevel/getlist");
    fillSelectFeild (cmbCourseLevel, "Select Course Level", course_Level,'name','');
    
    course_Type = getServiceRequest("/course_type/getlist");
    fillSelectFeild (cmbCourseType, "Select Course Type", course_Type,'name','');

    course_Duration = getServiceRequest("/duration/getlist");
    fillSelectFeild (cmbDuration, "Select Duration", course_Duration,'name','');

    course_Status = getServiceRequest("/coursestatus/getlist");
    fillSelectFeild(cmbCourseStatus, "Select Course Status", course_Status, 'name', 'Active',true);
    course.course_status_id = JSON.parse(cmbCourseStatus.value);
    cmbCourseStatus.style.border = "2px solid green";

    /*employeewithteacher = getServiceRequest("/employee/employeewithteacher")
    fillSelectFeild2(cmbCordinator,"Select",employeewithteacher,'empno','empcallingname');*/

    getEmployeesWithTecherAndCAtogary = getServiceRequest("/employee/getEmployeesWithTecherAndCAtogary")
    fillSelectFeild2(cmbCordinator,"Select",getEmployeesWithTecherAndCAtogary,'empno','empcallingname');

    getModuleAccorCouCat = getServiceRequest("/coursemodule/getMoudleWithCatogary")
    fillSelectFeild (cmdAllModules, "", getModuleAccorCouCat,'name','');

    dateCourseAssignDate.value = getCurrentDate("date" , "");

    allModuleList = new Array();
    course.courseModules = new Array();

    allModuleList = getServiceRequest("coursemodule/getlist");
    fillSelectFeild (cmdAllModules, "", allModuleList,'name','');


    btnRight.addEventListener('click', event => {
        let selectModule = JSON.parse(cmdAllModules.value);
        course.courseModules.push(selectModule);
        //selected patta fill krnna.
        fillSelectFeild (cmdSelectedModules, "", course.courseModules,'name','');

        let removeAllCatogary = removeObjectByList(allModuleList,selectModule.name,'name');
        cmdAllModules.innerHTML = "";
        fillSelectFeild (cmdAllModules, "", removeAllCatogary,'name','');
    })

    btnLeft.addEventListener('click', event => {
            let selectModule = JSON.parse(cmdSelectedModules.value);
        allModuleList.push(selectModule);
        fillSelectFeild (cmdAllModules, "", allModuleList,'name','');

        let removeSelectedCatogary = removeObjectByList(course.courseModules,selectModule.name,'name');
        cmdSelectedModules.innerHTML = "";
        fillSelectFeild (cmdSelectedModules, "", removeSelectedCatogary,'name','');
    })

    btnDoubleRight.addEventListener('click', event => {
        course.courseModules = fillDataIntoList(course.courseModules, allModuleList);
        allModuleList = [];

        fillSelectFeild(cmdSelectedModules,'', course.courseModules,'name','');

        cmdAllModules.innerHTML = "";
    })

    btnDoubleLeft.addEventListener('click',event => {
        allModuleList = fillDataIntoList(allModuleList,course.courseModules);
        course.courseModules = [];

        fillSelectFeild(cmdAllModules,'',allModuleList,'name','');

        cmdSelectedModules.innerHTML = "";
    })

    buttonDisable(true,false);




    }

function fillDataIntoList(defaultList, givenList) {
    for (let index in givenList) {
        defaultList.push(givenList[index]);

    }
    return defaultList;
}


function cmbCourseCatCh(){

    teacherslist = getServiceRequest("/employee/getEmployeesWithTecherAndCAtogary?id="+JSON.parse(cmbCourseCat.value).id)
    fillSelectFeild2(cmbCordinator,"Select",teacherslist,'empno','empcallingname');

    allModuleList = new Array();
    course.courseModules = new Array();

    allModuleList = getServiceRequest("/coursemodule/getMoudleWithCatogary?id="+JSON.parse(cmbCourseCat.value).id);
    fillSelectFeild (cmdAllModules, "", allModuleList,'name','');


    btnRight.addEventListener('click', event => {
        let selectModule = JSON.parse(cmdAllModules.value);
        course.courseModules.push(selectModule);
        //selected patta fill krnna.
        fillSelectFeild (cmdSelectedModules, "", course.courseModules,'name','');

        let removeAllCatogary = removeObjectByList(allModuleList,selectModule.name,'name');
        cmdAllModules.innerHTML = "";
        fillSelectFeild (cmdAllModules, "", removeAllCatogary,'name','');
    })

    btnLeft.addEventListener('click', event => {
        let selectModule = JSON.parse(cmdSelectedModules.value);
        allModuleList.push(selectModule);
        fillSelectFeild (cmdAllModules, "", allModuleList,'name','');

        let removeSelectedCatogary = removeObjectByList(course.courseModules,selectModule.name,'name');
        cmdSelectedModules.innerHTML = "";
        fillSelectFeild (cmdSelectedModules, "", removeSelectedCatogary,'name','');
    })

    btnDoubleRight.addEventListener('click', event => {
        course.courseModules = fillDataIntoList(course.courseModules, allModuleList);
        allModuleList = [];

        fillSelectFeild(cmdSelectedModules,'', course.courseModules,'name','');

        cmdAllModules.innerHTML = "";
    })

    btnDoubleLeft.addEventListener('click',event => {
        allModuleList = fillDataIntoList(allModuleList,course.courseModules);
        course.courseModules = [];

        fillSelectFeild(cmdAllModules,'',allModuleList,'name','');

        cmdSelectedModules.innerHTML = "";
    })


}

function getCourseCode(){

    if(course.course_catogary_id != null && course.course_level_id != null && course.course_type_id != null){
       var code = "";
       var word = course.course_name;
       var combine = word.match(/\b(\w)/g);
        console.log(combine)
       if(combine.length >2){
           var final = combine[0] + combine[1];

           code = final + course.course_catogary_id.name;

           txtCourseCode.value = code;
           let extcode = getServiceRequest("/course/bycode/"+code);
           console.log(extcode);
           if(extcode.course_code != null ){
               //database eke thiyenwa (exist wenawa)
               setInvalid(txtCourseCode);
               iziToast.error({
                   title: 'This Code is exist ',
                   position: 'topCenter',
                   //message: 'Not Successfully inserted \n' + serverResponce,
               });
               //false
           }else {
               //database eke nha
               //true
               document.getElementById("txtCourseCode").disabled = true;
               course.course_code = txtCourseCode.value;
               setValid(txtCourseCode);
           }
       }
    }
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
        $("#btnUpdate").removeAttr('disabled');
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

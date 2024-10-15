window.addEventListener('load', loadUI);

//window eka load weddi watena function eka
function loadUI() {
    console.log("Browser onload");


    // $( "#cmbCourseName" ).select2({
    //     theme: "bootstrap"
    // });

    loggedUserPrivilege = getServiceRequest("/privilage/bymodule/"+"EXAM_RESULT" );

    refreshExamResultTable();
    refreshExamResultForm();


    //enable tooltip
    $('[data-bs-toggle = "tooltip"]').tooltip();
}

const refreshExamResultTable = () => {
    let examresults = getServiceRequest("/exam_result/findall")

    //properties list eka
    let displayPropertyList = ['exam_id.course_id.course_name','exam_id.exam_name','reg_count','pass_count','fail_count'];
    let displayDataList = ['object','object','text','text','text'];
    //let statusColorList = [{name:"In-valid", colorClass:"deleted-cell-style",buttondisabled:true},{name:"Valid", colorClass:"active-cell-style",buttondisabled:false},{name:"Temporary Unavilaible", colorClass:"temporary-unavilable-cell-style",buttondisabled:false}];
    //fillDataTable (tblAttendance, attendance, displayPropertyList, displayDataList, formRefill, rowDelete, rowView,true, true, statusColorList,loggedUserPrivilege);
    fillDataTableNew(tblExamResult, examresults, displayPropertyList, displayDataList, true, 'editob', btnEdit, btnDelete, btnView);
    $('#tblExamResult').dataTable();
}


function getYear(ob){
    return ob.added_date.split("-")[0];
}
 function getMonth(ob){
    //return new Date(ob.added_date).getMonth();
     let monthname = ["Jan","Feb","March","April","May","June","July","Aug","Sep","Oct","Nov","Dec"];
     return monthname[new Date(ob.added_date).getMonth()];
 }


function formRefill(examresid){

    examresult = getServiceRequest("/exam_result/getbyid?id="+window[examresid]['id']);
    oldexamresult = getServiceRequest("/exam_result/getbyid?id="+window[examresid]['id']);


    changeTab("form");


    fillSelectFeild(cmbCourseCat, "Select Course Catogary", course_cat, 'name', examresult.exam_id.course_id.course_catogary_id.name,true);
    cmbCourseCat.style.border = "2px solid green";

    coursenamelist = getServiceRequest("/course/coursenameaccortocat?id="+JSON.parse(cmbCourseCat.value).id)
    fillSelectFeild(cmbCourseName, "Select Course Name", coursenamelist,'course_name',examresult.exam_id.course_id.course_name,true);
    cmbCourseName.style.border = "2px solid green";


    examlist = getServiceRequest("/exam/examlistaccorcourse?course_name="+JSON.parse(cmbCourseName.value).course_name)
    fillSelectFeild(cmbExamname,"Select Exam", examlist, "exam_name",examresult.exam_id.exam_name,true);
    cmbCourseName.style.border = "2px solid green";

    getStudentListByExamApplication();

    divShowTotalStudentCount.innerText = examresult.reg_count;
    divShowPassCount.innerText = examresult.pass_count;
    divShowFailCount.innerText = examresult.fail_count;


   // getCheckHeadCount();

    buttonDisable(false,true);


}

function rowDelete(){

}

const checkError = () => {
    let errors = "";

    if (examresult.exam_id.course_id == null) {
        setInvalid(cmbCourseCat);
        cmbCourseCat.style.border = '2px solid red';
        errors = errors + "Course catogary is not Entered...  \n";
    } else {

    }


    if (examresult.exam_id.course_id == null) {
        setInvalid(cmbCourseName);
        cmbCourseName.style.border = '2px solid red';
        errors = errors + "Course name is not Entered...  \n";
    } else {

    }

    if (examresult.exam_id == null) {
        setInvalid(cmbExamname);
        cmbExamname.style.border = '2px solid red';
        errors = errors + "Exam name is not Entered...  \n";
    } else {

    }


    if(examresult.examresult_has_students.length == 0){
        errors = errors + "Please select exam...  \n";
    }

    return errors;

}

const btnAddMC = () => {
    //console.log(attendance)
    //submit krddi ena mg eka
    let submitMsg = 'Are you sure to add following Exam result....!' + '<br>' + '' + /*'<br>' + 'Session Name : ' + JSON.parse(cmbSession.value).name*/
        + '<br>' + 'Pass Count : ' + divShowPassCount.innerText + '<br>' + divShowFailCount.innerText;
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
                    let serverResponce = httpServiceRequest("/exam_result", "POST", examresult);
                    //let serverResponce = "0";
                    if (serverResponce == "0") {
                        //server error ekak nathnm employeewa add wenwa
                        iziToast.success({
                            title: 'OK Exam result Add Successfully...!',
                            position: 'topRight',
                        });
                        refreshExamResultTable();
                        refreshExamResultForm();
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
                        let putresponce = httpServiceRequest("/exam_result", "PUT", examresult);
                        if (putresponce == "0") {
                            //window.alert("Update Successfully...")
                            iziToast.success({
                                title: 'Update Successfully...!',
                                position: 'topRight',
                            });
                            refreshExamResultTable();
                            refreshExamResultForm();
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

    if(examresult != null && oldattendance != null){
      if(examresult.cmbCourseCat != oldexamresult.cmbCourseCat){
          update = update + "Course catogary is changed \n" ;
      }
        if(examresult.cmbCourseName != oldexamresult.cmbCourseName){
            update = update + "Course name is changed \n" ;
        }
        if(examresult.cmbExamname != oldexamresult.cmbExamname){
            update = update + "Exam name is changed \n" ;
        }
    }


    return update;
}


function rowView(){

}


const refreshExamResultForm = () => {

    examresult = new Object();
    oldexamresult = null;


   // attendance.attendance_has_students = new Array();

    examresult.examresult_has_students = new Array();

    // batch_names = getServiceRequest("/batch/listbyloggeduser");
    // fillSelectFeild (cmbBatchName, "Select Batch name", batch_names, 'batch_name', '');


    course_cat = getServiceRequest("/coursecatogary/getlist")
    fillSelectFeild (cmbCourseCat, "Select course Catogary", course_cat, 'name', '');

    // course_name = getServiceRequest("/course/coursecodeaccorcoursecat")
    // fillSelectFeild (cmbCourseName, "Select Course Name", course_name, 'name', '');


    divShowTotalStudentCount.innerHTML = "";
    divShowPassCount.innerHTML = "";
    divShowFailCount.innerHTML = "";

    buttonDisable(true,false);

    }



function cmbCourseNameAccCat() {

    coursenamelist = getServiceRequest("/course/coursenameaccortocat?id="+JSON.parse(cmbCourseCat.value).id)
    fillSelectFeild(cmbCourseName, "Select Course Name", coursenamelist,'course_name','');

}

function getExamListAcoocourse(){

    examlist = getServiceRequest("/exam/examlistaccorcourse?course_name="+JSON.parse(cmbCourseName.value).course_name)
    fillSelectFeild(cmbExamname,"Select Exam", examlist, "exam_name",'');

}

function getStudentListByExamApplication(){
    divShowPassCount.innerText = "";
    divShowFailCount.innerText = "";

    let sudentListByExamApplication = getServiceRequest("/student/getstunamebyexamapplication?eaid="+JSON.parse(cmbExamname.value).id)
    console.log(sudentListByExamApplication);
    let examtypelist = JSON.parse(cmbExamname.value).exam_has_examtypes;
    console.log(examtypelist);


    let tableHead = tblExamResultStudent.children[0];
    tableHead.children[0].innerHTML = "";
    let headThNo = document.createElement("th");
    headThNo.innerText = "NO";
    tableHead.children[0].appendChild(headThNo);

    let headSNo = document.createElement("th");
    headSNo.innerText = "Studend Number";
    tableHead.children[0].appendChild(headSNo);

    let headSN = document.createElement("th");
    headSN.innerText = "Studend Name";
    tableHead.children[0].appendChild(headSN);

    for(let index in examtypelist){
        let headTh = document.createElement("th");
        headTh.innerText = examtypelist[index].exam_type_id.name;
        tableHead.children[0].appendChild(headTh);
    }

    let headFR = document.createElement("th");
    headFR.innerText = "Final Result";
    tableHead.children[0].appendChild(headFR);

    let headPOF = document.createElement("th");
    headPOF.innerText = "Pass or Fail";
    tableHead.children[0].appendChild(headPOF);


    let tablebody = tblExamResultStudent.children[1]
    tablebody.innerHTML = "";

    //lis eke data tyenwda kiyl blnawa
    if(sudentListByExamApplication.length != 0){
        divShowTotalStudentCount.innerText = sudentListByExamApplication.length;
        //binding ek
        examresult.reg_count = sudentListByExamApplication.length;

        if(oldexamresult == null){
            examresult.examresult_has_students = new Array();
            for(let index in sudentListByExamApplication){
                let examresultstu = new Object();

                examresultstu.student_id = sudentListByExamApplication[index];
                examresultstu.pass_or_fail = "Fail";
                examresultstu.result = "";

                examresult.examresult_has_students.push(examresultstu);


            }
        }

//methana edit kale



        for(let index in examresult.examresult_has_students){
            let tr = document.createElement("tr");
            tr.id = examresult.examresult_has_students[index].student_id.studentno;

            let intTD = document.createElement("td");
            intTD.innerText=parseInt(index) + 1;
            tr.appendChild(intTD);

            let stuNoTD = document.createElement("td")
            stuNoTD.innerText = examresult.examresult_has_students[index].student_id.studentno;
            tr.appendChild(stuNoTD);

            let stuCallTD = document.createElement("td")
            stuCallTD.innerText = examresult.examresult_has_students[index].student_id.calling_name;
            tr.appendChild(stuCallTD);



            // let inputETTD = document.createElement("td")
            // inputETTD.className = "d-flex";

            for(let ind in examtypelist){
                let inputETTD = document.createElement("td")
                let inputText = document.createElement("input")
                inputText.type = "text";
                inputText.setAttribute("examtype",examtypelist[ind].exam_type_id.name);

                inputText.placeholder = "Enter " + examtypelist[ind].exam_type_id.name + " value ";
                inputText.className = "form-control w-25 me-1 " + examresult.examresult_has_students[index].student_id.studentno;
                inputText.value = "0";

                inputETTD.appendChild(inputText);
                tr.appendChild(inputETTD);

                inputText.addEventListener("change",function (){

                    let totalvalue = 0;
                    let elements = document.getElementsByClassName(this.parentNode.parentNode.id);
                    for(let element of elements){
                        totalvalue= parseFloat(totalvalue) + parseFloat(element.value);
                    }
                    let extindex = parseInt(this.parentNode.parentNode.firstChild.innerText)-1;
                    examresult.examresult_has_students[extindex][this.getAttribute("examtype")] = this.value;

                    this.parentNode.parentNode.children[ this.parentNode.parentNode.children.length-2].children[0].value = (parseFloat(totalvalue)/examtypelist.length).toFixed(2);
                    const event = new Event('change');
                    this.parentNode.parentNode.children[this.parentNode.parentNode.children.length-2].children[0].dispatchEvent(event);

                })


            }
            let inputTD = document.createElement("td")
            let inputText = document.createElement("input")
            inputText.type = "text";
            inputText.value = "0";
            inputText.classList.add("form-control");

            inputText.addEventListener("change", function (){

                const inputValue = this.value.trim();

                if(/^[0-9]{1,3}[.]{0,1}[0-9]{0,2}$/.test(inputValue)){
                    const intValue = parseInt(inputValue).toFixed(2);


                    let extindex = parseInt(this.parentNode.parentNode.firstChild.innerText)-1;

                    //let finalresult = intValue/examtypelistLength.length;

                    if(parseFloat(intValue) >= 0 && parseFloat(intValue) <= 100){
                        console.log(intValue);
                        if( parseFloat(intValue) >= 50){
                            examresult.examresult_has_students[extindex].result = this.value;
                            examresult.examresult_has_students[extindex].pass_or_fail = "Pass";
                            this.parentNode.parentNode.children[this.parentNode.parentNode.children.length-1].innerText = "Pass";

                        } else {
                            examresult.examresult_has_students[extindex].result = parseFloat(this.value);

                            examresult.examresult_has_students[extindex].pass_or_fail = "Fail";
                            this.parentNode.parentNode.children[this.parentNode.parentNode.children.length-1].innerText = "Fail";


                        }
                    }else {
                        this.value = "";
                        alert("Please enter an integer between 0 and 100.");
                        examresult.examresult_has_students[extindex].result = parseFloat(this.value);
                        examresult.examresult_has_students[extindex].pass_or_fail = "-";
                        this.parentNode.parentNode.children[this.parentNode.parentNode.children.length-1].innerText = "-";

                    }






                    let passCount = 0;
                    let failCount = 0;
                    for (const result of examresult.examresult_has_students) {
                        if(result.pass_or_fail == "Pass"){
                            passCount = passCount+1;
                        }
                        if(result.pass_or_fail == "Fail"){
                            failCount = failCount+1;
                        }
                    }


                    examresult.fail_count = parseInt(failCount);
                    examresult.pass_count = parseInt(passCount) ;


                    divShowPassCount.innerText = examresult.pass_count;
                    divShowFailCount.innerText = examresult.fail_count;

                }

            } );

            inputTD.appendChild(inputText);
            tr.appendChild(inputTD);

            let textTD = document.createElement("td");
            textTD.innerText  = "Fail";

            tr.appendChild(textTD);
            tablebody.appendChild(tr);
        }


    }

    console.log(examresult);
    console.log(tablebody)

}



// function getStudentListByExamApplication(){
//     divShowPassCount.innerText = "";
//     divShowFailCount.innerText = "";
//
//     let sudentListByExamApplication = getServiceRequest("/student/getstunamebyexamapplication?eaid="+JSON.parse(cmbExamname.value).id)
//     console.log(sudentListByExamApplication);
//     let examtypelist = JSON.parse(cmbExamname.value).exam_has_examtypes;
//     console.log(examtypelist);
//
//
//     let tableHead = tblExamResultStudent.children[0];
//     tableHead.children[0].innerHTML = "";
//     let headThNo = document.createElement("th");
//     headThNo.innerText = "NO";
//     tableHead.children[0].appendChild(headThNo);
//
//     let headSNo = document.createElement("th");
//     headSNo.innerText = "Studend Number";
//     tableHead.children[0].appendChild(headSNo);
//
//     let headSN = document.createElement("th");
//     headSN.innerText = "Studend Name";
//     tableHead.children[0].appendChild(headSN);
//
//     for(let index in examtypelist){
//         let headTh = document.createElement("th");
//         headTh.innerText = examtypelist[index].exam_type_id.name;
//         tableHead.children[0].appendChild(headTh);
//     }
//
//     let headFR = document.createElement("th");
//     headFR.innerText = "Final Result";
//     tableHead.children[0].appendChild(headFR);
//
//     let headPOF = document.createElement("th");
//     headPOF.innerText = "Grade";
//     tableHead.children[0].appendChild(headPOF);
//
//
//     // let headFra = document.createElement("th");
//     // headFra.innerText = "Grade";
//     // tableHead.children[0].appendChild(headFra);
//
//
//     let tablebody = tblExamResultStudent.children[1]
//     tablebody.innerHTML = "";
//
//     //lis eke data tyenwda kiyl blnawa
//     if(sudentListByExamApplication.length != 0){
//         divShowTotalStudentCount.innerText = sudentListByExamApplication.length;
//         //binding ek
//         examresult.reg_count = sudentListByExamApplication.length;
//
//         if(oldexamresult == null){
//             examresult.examresult_has_students = new Array();
//             for(let index in sudentListByExamApplication){
//                 let examresultstu = new Object();
//
//                 examresultstu.student_id = sudentListByExamApplication[index];
//                 //examresultstu.pass_or_fail = "Fail";
//                 examresultstu.result = "";
//                 examresultstu.grade = "B";
//
//                 examresult.examresult_has_students.push(examresultstu);
//
//
//             }
//         }
//
// //methana edit kale
//
//
//
//         for(let index in examresult.examresult_has_students){
//             let tr = document.createElement("tr");
//             tr.id = examresult.examresult_has_students[index].student_id.studentno;
//
//             let intTD = document.createElement("td");
//             intTD.innerText=parseInt(index) + 1;
//             tr.appendChild(intTD);
//
//             let stuNoTD = document.createElement("td")
//             stuNoTD.innerText = examresult.examresult_has_students[index].student_id.studentno;
//             tr.appendChild(stuNoTD);
//
//             let stuCallTD = document.createElement("td")
//             stuCallTD.innerText = examresult.examresult_has_students[index].student_id.calling_name;
//             tr.appendChild(stuCallTD);
//
//
//
//             // let inputETTD = document.createElement("td")
//             // inputETTD.className = "d-flex";
//
//             for(let ind in examtypelist){
//                 let inputETTD = document.createElement("td")
//                 let inputText = document.createElement("input")
//                 inputText.type = "text";
//                 inputText.setAttribute("examtype",examtypelist[ind].exam_type_id.name);
//
//                 inputText.placeholder = "Enter " + examtypelist[ind].exam_type_id.name + " value ";
//                 inputText.className = "form-control w-25 me-1 " + examresult.examresult_has_students[index].student_id.studentno;
//                 inputText.value = "0";
//
//                 inputETTD.appendChild(inputText);
//                 tr.appendChild(inputETTD);
//
//                 inputText.addEventListener("change",function (){
//
//                     let totalvalue = 0;
//                     let elements = document.getElementsByClassName(this.parentNode.parentNode.id);
//                     for(let element of elements){
//                         totalvalue= parseFloat(totalvalue) + parseFloat(element.value);
//                     }
//                     let extindex = parseInt(this.parentNode.parentNode.firstChild.innerText)-1;
//                     examresult.examresult_has_students[extindex][this.getAttribute("examtype")] = this.value;
//
//                     this.parentNode.parentNode.children[ this.parentNode.parentNode.children.length-2].children[0].value = (parseFloat(totalvalue)/examtypelist.length).toFixed(2);
//                     const event = new Event('change');
//                     this.parentNode.parentNode.children[this.parentNode.parentNode.children.length-2].children[0].dispatchEvent(event);
//
//                 })
//
//
//             }
//             let inputTD = document.createElement("td")
//             let inputText = document.createElement("input")
//             inputText.type = "text";
//             inputText.value = "0";
//             inputText.classList.add("form-control");
//
//             inputText.addEventListener("change", function (){
//
//                 const inputValue = this.value.trim();
//
//                 if(/^[0-9]{1,3}[.]{0,1}[0-9]{0,2}$/.test(inputValue)){
//                     const intValue = parseInt(inputValue).toFixed(2);
//
//
//                     let extindex = parseInt(this.parentNode.parentNode.firstChild.innerText)-1;
//
//                     //let finalresult = intValue/examtypelistLength.length;
//
//                     if(parseFloat(intValue) >= 0 && parseFloat(intValue) <= 100){
//                         console.log(intValue);
//                         if( parseFloat(intValue) >= 50){
//                             examresult.examresult_has_students[extindex].result = this.value;
//                             examresult.examresult_has_students[extindex].pass_or_fail = "Pass";
//                             this.parentNode.parentNode.children[this.parentNode.parentNode.children.length-1].innerText = "Pass";
//
//                         } else {
//                             examresult.examresult_has_students[extindex].result = parseFloat(this.value);
//
//                             examresult.examresult_has_students[extindex].pass_or_fail = "Fail";
//                             this.parentNode.parentNode.children[this.parentNode.parentNode.children.length-1].innerText = "Fail";
//
//
//                         }
//
//                     }else {
//                         this.value = "";
//                         alert("Please enter an integer between 0 and 100.");
//                         examresult.examresult_has_students[extindex].result = parseFloat(this.value);
//                         examresult.examresult_has_students[extindex].pass_or_fail = "-";
//                         this.parentNode.parentNode.children[this.parentNode.parentNode.children.length-1].innerText = "-";
//
//                     }
//
//
// // Calculate grade
//                     if (parseFloat(intValue) >= 50) {
//                         examresult.examresult_has_students[extindex].grade = "P";
//                     } else {
//                         examresult.examresult_has_students[extindex].grade = "F";
//                     }
//                     this.parentNode.parentNode.children[this.parentNode.parentNode.children.length - 1].innerText = examresult.examresult_has_students[extindex].grade;
//
//
//
//                     let passCount = 0;
//                     let failCount = 0;
//                     for (const result of examresult.examresult_has_students) {
//                         if(result.pass_or_fail == "Pass"){
//                             passCount = passCount+1;
//                         }
//                         if(result.pass_or_fail == "Fail"){
//                             failCount = failCount+1;
//                         }
//                     }
//
//
//                     examresult.fail_count = parseInt(failCount);
//                     examresult.pass_count = parseInt(passCount) ;
//
//
//                     divShowPassCount.innerText = examresult.pass_count;
//                     divShowFailCount.innerText = examresult.fail_count;
//
//                 }
//
//             } );
//
//             inputTD.appendChild(inputText);
//             tr.appendChild(inputTD);
//
//             let textTD = document.createElement("td");
//             textTD.innerText  = "F";
//             tr.appendChild(textTD);
//
//             // let gradeTD = document.createElement("td");
//             // gradeTD.innerText = examresult.examresult_has_students[index].grade; // Set grade
//             // tr.appendChild(gradeTD);
//
//             tablebody.appendChild(tr);
//         }
//
//
//     }
//
//     console.log(examresult);
//     console.log(tablebody)
//
// }










// function getStudentListByExamApplication(){
//     divShowPassCount.innerText = "";
//     divShowFailCount.innerText = "";
//
//     let sudentListByExamApplication = getServiceRequest("/student/getstunamebyexamapplication?eaid="+JSON.parse(cmbExamname.value).id)
//     console.log(sudentListByExamApplication);
//
//     let examtypelist = JSON.parse(cmbExamname.value).exam_has_examtypes;
//     console.log(examtypelist);
//
//
//     let tableHead = tblExamResultStudent.children[0];
//     tableHead.children[0].innerHTML = "";
//     let headThNo = document.createElement("th");
//     headThNo.innerText = "NO";
//     tableHead.children[0].appendChild(headThNo);
//
//     let headSNo = document.createElement("th");
//     headSNo.innerText = "Studend Number";
//     tableHead.children[0].appendChild(headSNo);
//
//     let headSN = document.createElement("th");
//     headSN.innerText = "Studend Name";
//     tableHead.children[0].appendChild(headSN);
//
//     for(let index in examtypelist){
//         let headTh = document.createElement("th");
//         headTh.innerText = examtypelist[index].exam_type_id.name;
//         tableHead.children[0].appendChild(headTh);
//     }
//
//     let headFR = document.createElement("th");
//     headFR.innerText = "Final Result";
//     tableHead.children[0].appendChild(headFR);
//
//     let headPOF = document.createElement("th");
//     headPOF.innerText = "Pass or Fail";
//     tableHead.children[0].appendChild(headPOF);
//
//     let tablebody = tblExamResultStudent.children[1]
//     tablebody.innerHTML = "";
//
//     if(sudentListByExamApplication.length != 0){
//         divShowTotalStudentCount.innerText = sudentListByExamApplication.length;
//         examresult.reg_count = sudentListByExamApplication.length;
//
//         if(oldexamresult == null){
//             examresult.examresult_has_students = new Array();
//             for(let index in sudentListByExamApplication){
//               let examresultstu = new Object();
//
//                 examresultstu.student_id = sudentListByExamApplication[index];
//                 examresultstu.pass_or_fail = "Fail";
//                 examresultstu.result = "";
//
//                 examresult.examresult_has_students.push(examresultstu);
//
//
//             }
//         }
//
// //methana edit kale
//
//
//
//         for(let index in examresult.examresult_has_students){
//             let tr = document.createElement("tr");
//             tr.id = examresult.examresult_has_students[index].student_id.studentno;
//
//             let intTD = document.createElement("td");
//             intTD.innerText=parseInt(index) + 1;
//             tr.appendChild(intTD);
//
//             let stuNoTD = document.createElement("td")
//             stuNoTD.innerText = examresult.examresult_has_students[index].student_id.studentno;
//             tr.appendChild(stuNoTD);
//
//             let stuCallTD = document.createElement("td")
//             stuCallTD.innerText = examresult.examresult_has_students[index].student_id.calling_name;
//             tr.appendChild(stuCallTD);
//
//
//
//             // let inputETTD = document.createElement("td")
//             // inputETTD.className = "d-flex";
//
//             for(let ind in examtypelist){
//                 let inputETTD = document.createElement("td")
//                 let inputText = document.createElement("input")
//                 inputText.type = "text";
//                 inputText.setAttribute("examtype",examtypelist[ind].exam_type_id.name);
//
//                 inputText.placeholder = "Enter " + examtypelist[ind].exam_type_id.name + " value ";
//                 inputText.className = "form-control w-25 me-1 " + examresult.examresult_has_students[index].student_id.studentno;
//                 inputText.value = "0";
//
//                 inputETTD.appendChild(inputText);
//                 tr.appendChild(inputETTD);
//
//                 inputText.addEventListener("change",function (){
//
//                     let totalvalue = 0;
//                     let elements = document.getElementsByClassName(this.parentNode.parentNode.id);
//                     for(let element of elements){
//                         totalvalue= parseFloat(totalvalue) + parseFloat(element.value);
//                     }
//                     let extindex = parseInt(this.parentNode.parentNode.firstChild.innerText)-1;
//                     examresult.examresult_has_students[extindex][this.getAttribute("examtype")] = this.value;
//
//                     this.parentNode.parentNode.children[ this.parentNode.parentNode.children.length-2].children[0].value = (parseFloat(totalvalue)/examtypelist.length).toFixed(2);
//                     const event = new Event('change');
//                     this.parentNode.parentNode.children[this.parentNode.parentNode.children.length-2].children[0].dispatchEvent(event);
//
//                 })
//
//
//             }
//             let inputTD = document.createElement("td")
//             let inputText = document.createElement("input")
//             inputText.type = "text";
//             inputText.value = "0";
//             inputText.classList.add("form-control");
//
//             inputText.addEventListener("change", function (){
//
//                 const inputValue = this.value.trim();
//
//                 if(/^[0-9]{1,3}[.]{0,1}[0-9]{0,2}$/.test(inputValue)){
//                     const intValue = parseInt(inputValue).toFixed(2);
//
//
//                     let extindex = parseInt(this.parentNode.parentNode.firstChild.innerText)-1;
//
//                     //let finalresult = intValue/examtypelistLength.length;
//
//                     if(parseFloat(intValue) >= 0 && parseFloat(intValue) <= 100){
//                         console.log(intValue);
//                         if( parseFloat(intValue) >= 50){
//                             examresult.examresult_has_students[extindex].result = this.value;
//                             examresult.examresult_has_students[extindex].pass_or_fail = "Pass";
//                             this.parentNode.parentNode.children[this.parentNode.parentNode.children.length-1].innerText = "Pass";
//
//                         } else {
//                             examresult.examresult_has_students[extindex].result = parseFloat(this.value);
//
//                             examresult.examresult_has_students[extindex].pass_or_fail = "Fail";
//                             this.parentNode.parentNode.children[this.parentNode.parentNode.children.length-1].innerText = "Fail";
//
//
//                         }
//                     }else {
//                         this.value = "";
//                         alert("Please enter an integer between 0 and 100.");
//                         examresult.examresult_has_students[extindex].result = parseFloat(this.value);
//                         examresult.examresult_has_students[extindex].pass_or_fail = "-";
//                         this.parentNode.parentNode.children[this.parentNode.parentNode.children.length-1].innerText = "-";
//
//                     }
//
//                     let passCount = 0;
//                     let failCount = 0;
//                     for (const result of examresult.examresult_has_students) {
//                         if(result.pass_or_fail == "Pass"){
//                             passCount = passCount+1;
//                         }
//                         if(result.pass_or_fail == "Fail"){
//                             failCount = failCount+1;
//                         }
//                     }
//
//                     examresult.fail_count = parseInt(failCount);
//                     examresult.pass_count = parseInt(passCount) ;
//
//
//                     divShowPassCount.innerText = examresult.pass_count;
//                     divShowFailCount.innerText = examresult.fail_count;
//
//                 }
//
//             } );
//
//             inputTD.appendChild(inputText);
//             tr.appendChild(inputTD);
//
//             let textTD = document.createElement("td");
//             textTD.innerText  = "Fail";
//
//             tr.appendChild(textTD);
//             tablebody.appendChild(tr);
//     }
//
//
//     }
//
//     console.log(examresult);
//     console.log(tablebody)
//
// }







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


function checkExam(){
    let chresult = JSON.parse(cmbExamname.value);
    let extExam = getServiceRequest("/exam/byExam/" + chresult)

        if(extExam.exam_name != null){
            iziToast.error({
                title: 'This Exam is exist ',
                position: 'topCenter',
                //message: 'Not Successfully inserted \n' + serverResponce,
            });
            //false
        } else {
            examresult.exam_name = cmbExamname.value;
        }


}
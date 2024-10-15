
window.addEventListener('load', loadUI);

//window eka load weddi watena function eka
function loadUI() {
    console.log("Browser onload");


    // $( "#cmbCourseName" ).select2({
    //     theme: "bootstrap"
    // });

    loggedUserPrivilege = getServiceRequest("/privilage/bymodule/"+"EXAM_APPLICATION" );

    refreshExamApplicationTable();
    refreshExamApplicationForm();


    //enable tooltip
    $('[data-bs-toggle = "tooltip"]').tooltip();
}

const refreshExamApplicationTable = () => {
    exam_application = getServiceRequest("/exam_application/findall")

    //properties list eka
    let displayPropertyList = ['student_id.name_full','exam_id.exam_name','registration_id.previous_balance'];
    let displayDataList = ['object','object',getDueeeBalance];
    //let statusColorList = [{name:"In-valid", colorClass:"deleted-cell-style",buttondisabled:true},{name:"Valid", colorClass:"active-cell-style",buttondisabled:false},{name:"Temporary Unavilaible", colorClass:"temporary-unavilable-cell-style",buttondisabled:false}];
    //fillDataTable (tblAttendance, attendance, displayPropertyList, displayDataList, formRefill, rowDelete, rowView,true, true, statusColorList,loggedUserPrivilege);
    fillDataTableNew(tblExamApplication, exam_application, displayPropertyList, displayDataList, true, 'editob', btnEdit, btnDelete, btnView);
    $('#tblExamApplication').dataTable();
}



function getDueeeBalance(ob){
    //api gawa nathi deyak genna gannawnm awshya dewal parameters wdihata genna gna oni,
    let stu_registration = getServiceRequest("/stubatchreg/getbystudentcourse?sid="+ob.student_id.id+"&cid="+ob.exam_id.course_id.id)
    console.log(stu_registration)
    return stu_registration.previous_balance;

}

function formRefill(examappid){

    examapplication = getServiceRequest("/exam_application/getbyid?id=" + window[examappid]['id']);
    oldexamapplication = getServiceRequest("/exam_application/getbyid?id=" + window[examappid]['id']);

    changeTab("form");

    txtRegNumber.value = examapplication.student_id.studentno;
    setValid(txtRegNumber);
    txtRegNumber.style.border = "2px solid green";

    stuName.value = examapplication.student_id.name_full;
    setValid(stuName);
    stuName.style.border = "2px solid green";


    batchlist = getServiceRequest("/stubatchreg/batchaccrorstudentandfinishbaches?studentno=" + examapplication.student_id.id)
    fillSelectFeild(cmbBatchName, "Select Batch", batchlist, 'batch_id.batch_name', examapplication.batch_id.batch_name);
    cmbBatchName.style.border = "2px solid green";

    // duepayment = getServiceRequest("/stubatchreg/getbystudentcourse?sid="+ob.student_id.id+"&cid="+ob.exam_id.course_id.id)
    // setValid(txtDuePayment);
    // txtDuePayment.style.border = "2px solid green";

    examlist = getServiceRequest("/exam/examlistaccorcourse?course_name="+JSON.parse(cmbBatchName.value).batch_id.course_id.course_name )
    fillSelectFeild(cmbExamName, "Select Exam", examlist, 'exam_name', examapplication.exam_id.exam_name);
    cmbExamName.style.border = "2px solid green";

    //
    // examtypes = getServiceRequest("/examtype/examtypeaccorexam?id="+JSON.parse(cmbExamName.value).id);
    //
    // divExamTypes.innerHTML = "";
    // for(let index in examtypes){
    //
    //     divexamtypes = document.createElement('div');
    //     divexamtypes.classList.add('form-check');
    //     inputCheckBox = document.createElement('input');
    //     inputCheckBox.type = "checkbox";
    //     inputCheckBox.value = index;
    //     inputCheckBox.classList.add('form-check-input');
    //
    //     inputCheckBox.onchange = function (){
    //         if(this.checked) {
    //             console.log("checked");
    //             console.log(this.value);
    //             examapplication.examtypes.push(examtypes[this.value]);
    //         } else {
    //             console.log("unchecked");
    //             console.log(this.value);
    //             examapplication.examtypes.splice(this.value,1);
    //         }
    //     }
    //
    //     if(examapplication.examtypes.length !=0 ){
    //         let extIndex = examapplication.examtypes.map(e=>e.examtypes).indexOf(examtypes[index]["examtypes"]);
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
    //
    //
    //     divexamtypes.appendChild(inputCheckBox);
    //     divexamtypes.appendChild(inputLabel);
    //     divExamTypes.appendChild(divexamtypes);
    //
    // }


    buttonDisable(false,true);


}

function rowDelete(){

}



function btnAddExamApplication(){
    console.log(examapplication)
    let submitmgs = "Are you sure to add this exam application";
    let errors = checktError();
    if(errors == ""){
      let userconfirm =   confirm("Are you sure to add this application?");
      if(userconfirm){
          let serverResponse = httpServiceRequest("/exam_application","POST",examapplication);
          if(serverResponse == "0"){
              alert("Ok added successfully...");
              refreshExamApplicationTable();
              refreshExamApplicationForm();
              changeTab("table");
          } else {
              alert("Error ... " + serverResponse);
          }
      }


    } else {
        alert("sorry.."+errors);
    }

}

const checktError = () => {

    let errors = "";

    if(examapplication.student_id == null){
        setInvalid(txtRegNumber);
        txtRegNumber.style.border = '2px solid red';
        errors = errors + "Student Reg No is not Entered...  \n";
    }else {

    }

    if(examapplication.batch_id == null){
        setInvalid(cmbBatchName);
        cmbBatchName.style.border = '2px solid red';
        errors = errors + "Batch is not Entered...  \n";
    } else  {

    }

    if(examapplication.exam_id == null){
        setInvalid(cmbExamName);
        cmbExamName.style.border = '2px solid red';
        errors = errors + "Exam name is not Entered...  \n";
    } else  {

    }

    // if (examapplication.examtypes.length == 0) {
    //     setInvalid(cmbExamName);
    //     errors = errors + "Exam types not Entered...  \n";
    // } else {
    // }

    return errors;

}


const btnUpdateExamApplication = () => {
    console.log(examapplication);
    let error = checktError();
    if(error == ""){
        let update = checkupdate();
        if(update == ""){
            alert("No changes..!")
        } else {
           let userconfirmation = confirm("Are you sure to update this data.."+update);
            if(userconfirmation){
                let putresponse = httpServiceRequest("/exam_application","PUT",examapplication)
                if(putresponse =="0"){
                    window.alert("Update successfully..!");
                    refreshExamApplicationTable();
                    refreshExamApplicationForm();
                    changeTab("table")
                } else {
                    window.alert("Update not succefully..!"+putresponse);
                }
            }
        }
    } else {
        window.alert("Error Not Successfully Update..."+error);
    }

}


function checkupdate(){

    let update = "";

    if(examapplication != null && oldexamapplication != null){
        if (examapplication.txtRegNumber != oldexamapplication.txtRegNumber){
            update = update + "Reg Number is changed \n" ;
        }
        if (examapplication.cmbBatchName != oldexamapplication.cmbBatchName){
            update = update + "Batch Name is changed \n" ;
        }
        if (examapplication.cmbExamName != oldexamapplication.cmbExamName){
            update = update + "Exam Name is changed \n" ;
        }
        // if(examapplication.examtypes.length != oldexamapplication.examtypes.length){
        //     update = update + "Exam types is changes \n";
        // } else {
        //     let avilableexamtypecount = 0;
        // }

    }



}





const checkUpdate = () => {
    let update = "";

    if(attendance != null && oldattendance != null){
        if(attendance.cmbBatchName != oldsession.cmbBatchName){
            update = update + "Batch is changed \n" ;
        }
        if(attendance.cmbSession != oldattendance.cmbSession){
            update = update + "Session changed \n" ;
        }
        if(attendance.dteDate != oldattendance.dteDate){
            update = update + "Date changed \n" ;
        }

    }

    return update;
}


function rowView(){

}

// const examtypeaccorexam = () => {
//
//
//     examtypes = getServiceRequest("/examtype/examtypeaccorexam?id="+JSON.parse(cmbExamName.value).id);
//
//     divExamTypes.innerHTML = "";
//     for(let index in examtypes){
//         //dom lawwa element 3 hada gatta
//         divexamtypes = document.createElement('div');
//         divexamtypes.classList.add('form-check');
//         inputCheckBox = document.createElement('input');
//         inputCheckBox.type = "checkbox";
//         inputCheckBox.value = index;
//         inputCheckBox.classList.add('form-check-input');
//         //event eka alla ganwa
//         inputCheckBox.onchange = function (){
//             if(this.checked) {
//                 console.log("checked");
//                 console.log(this.value);
//                 examapplication.examtypes.push(examtypes[this.value]);
//             } else {
//                 console.log("unchecked");
//                 console.log(this.value);
//                 examapplication.examtypes.splice(this.value,1);
//             }
//         }
//
//         if(examapplication.examtypes.length != 0){
//             let extIndex = examapplication.examtypes.map(e => e.examtypes).indexOf(examtypes[index]["examtypes"]);
//             console.log(extIndex);
//         }
//
//         inputLabel = document.createElement('label');
//         inputLabel.innerHTML = examtypes[index]["name"];
//         inputLabel.classList.add('form-check-label');
//         inputLabel.classList.add('fw-bold');
//
//         divexamtypes.appendChild(inputCheckBox);
//         divexamtypes.appendChild(inputLabel);
//         divExamTypes.appendChild(divexamtypes);
//     }
//
// }


const refreshExamApplicationForm = () => {

    examapplication = new Object();
    oldexamapplication = null;

   //examapplication.examtypes = new Array();





    buttonDisable(true,false);

    }

const getstudentfullname = () => {
    let exLenth = txtRegNumber.value;
    if (exLenth.length == 8) {

        stu = getServiceRequest("/student/getbystudentno?studentno=" + exLenth);
        stuName.value = stu.name_full;
        examapplication.student_id = stu;
        getBatchList(stu.id);
        setValid(stuName);

    } else {

    }
}

function getBatchList(sid) {

    batchlist = getServiceRequest("/stubatchreg/batchaccrorstudentandfinishbaches?studentno=" + sid)
    fillSelectFeild(cmbBatchName, "Select Batch Name", batchlist, 'batch_id.batch_name', '');

}

function getDueBalance(){
    examapplication.batch_id = JSON.parse(cmbBatchName.value).batch_id;
    txtDuePayment.value = JSON.parse(cmbBatchName.value).previous_balance;
    examapplication.previous_balance = txtDuePayment.value;
}

// function getExamList(){
//
//     examlist = getServiceRequest("/exam/examlistaccorcourse?course_name="+JSON.parse(cmbBatchName.value).batch_id.course_id.course_name )
//     fillSelectFeild(cmbExamName, "Select Exam Name", examlist, 'exam_name', '');
//
//
// }

function getExamList(){

    examlist = getServiceRequest("/exam/examlistaccorcourseandbatch?courseid="+JSON.parse(cmbBatchName.value).batch_id.course_id.id+"&studentid="+examapplication.student_id.id);
    fillSelectFeild(cmbExamName, "Select Exam Name", examlist, 'exam_name', '');


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
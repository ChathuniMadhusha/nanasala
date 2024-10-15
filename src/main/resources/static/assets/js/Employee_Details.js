window.addEventListener('load', loadUI);

//window eka load weddi watena function eka
function loadUI() {
    console.log("Browser onload");


    loggedUserPrivilege = getServiceRequest("/privilage/bymodule/"+"MANAGE_EMPLOYEE_DETAILS" );

    refreshEmpTable();
    refreshEmpForm();




  //  $('[data-bs-toggle = "tooltip"]').tooltip();
}

const refreshEmpTable = () => {
    employees = new Array();

    employees = getServiceRequest("/employee/findall");
    /* employees = [{ id: 1, empno: "Emp00214", photo: 'assets/Libraries/images/user_male01.png', callingname: "Kumara", address1: "159/C", address2: "Asgiriya", address3: "Gampaha", dob: "1998-02-03", fullname: "Kumara Bandara", designation_id: { id: 1, name: "Manager" }, gender: "Male", nic: "958478569V", mobile: "0765548521", civilstatus_id: { id: 1, name: "Single" }, employee_status_id: { id: 1, status: "working" }, land: "071458755", email: "123@gmail.com" },
    { id: 2, empno: "Emp00215", photo: 'assets/Libraries/images/user_male02.png', callingname: "Namal", address1: "159",  address2: "Temple rd", address3: "Gampaha", dob: "1992-05-05", fullname: "Namal Siriwardana",designation_id: { id: 2, name: "Cleark" }, gender: "Male", nic: "975611485V", mobile: "0754896523", civilstatus_id: { id: 2, name: "Single" }, employee_status_id: { id: 2, status: "Resign" }, land: "071458755", email: "456@gmail.com" },
    { id: 3, empno: "Emp00216", photo: 'assets/Libraries/images/user_male03.png', callingname: "Yashod", address1: "20", address2: "Cplombo rd", address3: "yakkala", dob: "1997-03-01", fullname: "Yashod Bandara", designation_id: { id: 3, name: "Cashier" }, gender: "Male", nic: "975632894V", mobile: "0718863555", civilstatus_id: { id: 3, name: "Married" }, employee_status_id: { id: 3, status: "Delted" }, land: "071458755", email: "789@gmail.com" },
    { id: 3, empno: "Emp00217", photo: 'assets/Libraries/images/user_male04.png', callingname: "Nawod", address1: "No 20", address2: "Temple rd", address3: "Colombo", dob: "1992-04-05", fullname: "Nawod Yasanjith", designation_id: { id: 4, name: "Director" }, gender: "Male", nic: "924587145V", mobile: "0715264854", civilstatus_id: { id: 4, name: "Married" }, employee_status_id: { id: 4, status: "Working" }, land: "0725487569", email: "258@gmail.com" },
    { id: 3, empno: "Emp00218", photo: 'assets/Libraries/images/user_female.png', callingname: "Sanduni", address1: "No 80", address1: "Chithra rd", address1: "Gampaha", dob: "1990-10-05", fullname: "Sanduni Thakshila", designation_id: { id: 5, name: "Manager" }, gender: "Female", nic: "904587145V", mobile: "0784596125", civilstatus_id: { id: 5, name: "Single" }, employee_status_id: { id: 5, status: "Working" }, land: "0754854125", email: "sanduni@gmail.com" }];*/


    //properties list eka
    let displayPropertyList = ['empno','empcallingname', 'mobileno','designation_id.name', 'emp_status_id.name'];
    let displayDataList = ['text', 'text',  'text' ,'object','object'];
    let statusColorList = [{name:"Deleted", colorClass:"deleted-cell-style",buttondisabled:true},
                            {name:"Working", colorClass:"active-cell-style",buttondisabled:false},
                              {name:"Resign", colorClass:"resign-cell-style",buttondisabled:false}];
    fillDataTable(tblEmp, employees, displayPropertyList, displayDataList,
        formRefill, rowDelete, rowView,true,true,statusColorList,loggedUserPrivilege);

    $('#tblEmp').dataTable();
}




const rowView = (empob) => {

    printemployee = getServiceRequest("/employee/getbyid?id="+empob.id);

    $('#empView').modal('show');
    tdEmpNo.innerHTML = printemployee.empno;
    tdEmpFullName.innerHTML = printemployee.empfullname;
    tdEmpNIC.innerHTML = printemployee.empnic;
    tdEmpMobile.innerHTML = printemployee.mobileno;
    tdEmpEmail.innerHTML = printemployee.email;
    tdEmpCivilStatus.innerHTML = printemployee.civil_status_id.name;
    tdEmpDesignation.innerHTML = printemployee.designation_id.name;
    tdAssign.innerHTML = printemployee.assigndate;
    tdEmpSatus.innerHTML = printemployee.emp_status_id.name;

}

function printEmployeeView(){
    let newWindow =  window.open();

    newWindow.document.write(" <link href=\"assets/vendor/bootstrap/css/bootstrap.min.css\" rel=\"stylesheet\">"
        +"<script src=\"assets/Libraries/jQuery/jQuery.js\"></script>"+"<h2>Employee Details</h2>"
        + tableEmployeeView.outerHTML);

    //set time out
    setTimeout(() => {
        newWindow.print();
    }, 1000);
}


function rowDelete(empob){
    //delete mg
    let deleteMsg = "Are you sure to Delete following Employee...? " +
        "Employee No : " + empob.empno;

    iziToast.info({
        messageColor: 'black',
        message: deleteMsg,
        position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
        progressBarColor: 'rgb(0, 255, 184)',
        buttons: [
            ['<button style="color: black"><b>Ok</b></button>', function (instance,toast) {
                instance.hide({ transitionOut: 'fadeOutUp' }, toast);
                let responce = httpServiceRequest("/employee", "DELETE", empob);
                if (responce == "0") {
                    // window.alert("Student Delete Successfully.......!");
                    iziToast.success({
                        title: 'OK Employee Delete Successfully...!',
                        position: 'topRight',
                        //message: 'Student Add Successfully...!',
                    });
                    refreshEmpTable();
                    refreshEmpForm();
                    resetForm();
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

function formRefill(emp) {

   // employee = JSON.parse(JSON.stringify(emp));
   // oldemployee = JSON.parse(JSON.stringify(emp));

    employee = getServiceRequest("employee/getbyid?id="+emp.id);
    oldemployee = getServiceRequest("employee/getbyid?id="+emp.id);

    changeTab("form");
    btnAddEmp.disabled = true;

    txtEmpFullName.value = employee.empfullname;
    setValid(txtEmpFullName);
    txtEmpFullName.style.border = "2px solid green";

    txtEmpCName.value = employee.empcallingname;
    setValid(txtEmpCName);
    txtEmpCName.style.border = "2px solid green";

    txtNIC.value = employee.empnic;
    setValid(txtNIC);
    txtNIC.style.border = "2px solid green";

    dateDOB.value = employee.dob;
    setValid(dateDOB);
    dateDOB.style.border = "2px solid green";

    txtMobile.value = employee.mobileno;
    setValid(txtMobile);
    txtMobile.style.border = "2px solid green";

    if(employee.landno != undefined)
    txtLand.value = employee.landno;
    //txtLand.style.border = "2px solid green";
    //setValid(txtLand);
    setDefauld(txtLand);

    if(employee.email != undefined)
        txtEmail.value = employee.email;
    //txtLand.style.border = "2px solid green";
    //setValid(txtLand);
    setDefauld(txtEmail);


    if(employee.address_line1 != undefined){
    txtAddress1.value = employee.address_line1;
    txtAddress1.style.border = "2px solid green";
    //setValid(txtAddress1);
    }else{
        setDefauld(txtLand);
    }


    if(employee.address_line2 != undefined){
    txtAddress2.value = employee.address_line2;
    txtAddress2.style.border = "2px solid green";
    //setValid(txtAddress2);
}else{
    setDefauld(txtAddress2);
}

    if(employee.address_line3 != undefined){
    txtAddress3.value = employee.address_line3;
    txtAddress3.style.border = "2px solid green";
    //setValid(txtAddress3);
}else{
    setDefauld(txtAddress3);
}

    if (employee.gender == "Male") {
        radMale.checked = true;
    } else {
        radFemale.checked = true;
    }
    box.style.border = "2px solid green";


//element eke id eka, diplay mg eka, fill krna oni data list eka, data list eke display property eka = ok
fillSelectFeild(cmbDesig, "Select designation", designations, 'name', employee.designation_id.name);
    cmbDesig.style.border = "2px solid green";
//element eke id eka, diplay mg eka, fill krna oni data list eka, data list eke display property eka
fillSelectFeild(cmbEmpStatus, "Select employee status", employeeStatuses, 'name', employee.emp_status_id.name);
    cmbEmpStatus.style.border = "2px solid green";
//element eke id eka, diplay mg eka, fill krna oni data list eka, data list eke display property eka, selected value eka
fillSelectFeild(cmbCStatus, "Select Status", civilstatuses, 'name', employee.civil_status_id.name);
    cmbCStatus.style.border = "2px solid green";
//changeUiColor(setValid);


    buttonDisable(false, true);

}


const  refreshEmpForm = () => {
    employee = new Object();
    oldemployee = null;

    employee.course_cats = new Array();
    //text field eke id eka gana oni. (text field eke values empty krna oni)

    txtEmpFullName.value = "";
    txtEmpCName.value = "";
    txtNIC.value = "";
    radMale.checked = false;
    radFemale.checked = false;
    dateDOB.value = "";
    txtMobile.value = "";
    txtLand.value = "";
    txtEmail.value = "";
    txtAddress1.value = "";
    txtAddress2.value = "";
    txtAddress3.value = "";
    txtDes.value = "";


    let currentdateForMin = new Date();
    currentdateForMin.setFullYear(currentdateForMin.getFullYear() - 60);

    dateDOB.min = currentdateForMin.getFullYear() + getDateAndMonth(currentdateForMin, "monthdate");


    // createdate object for generate max dob
    let currentDateForMax = new Date();
    currentDateForMax.setFullYear(currentDateForMax.getFullYear() - 18);

    //1 - 11 ena nisa month ekta 1 k ekathu krna oni
    /*let month = currentDateForMax.getMonth() + 1;
    if(month < 10 ) month = "0"+ month;

    let date = currentDateForMax.getDate();
    if(date < 10 ) date = "0" + date; */
    //dateDOB.max = "2004-01-01";
    dateDOB.max = currentDateForMax.getFullYear() + getDateAndMonth(currentDateForMax, "monthdate");


    //ok
    civilstatuses = getServiceRequest("/civilstatus/getlist");
    fillSelectFeild(cmbCStatus, "Select Status", civilstatuses, 'name', '');

    //ok
    designations = getServiceRequest("/designations/getlist");
    fillSelectFeild(cmbDesig, "Select designation", designations, 'name', '');

    //ok
    employeeStatuses = getServiceRequest("/empstatus/getlist")
    fillSelectFeild(cmbEmpStatus, "Select employee status", employeeStatuses, 'name', 'Working', true);
    cmbEmpStatus.style.border = "2px solid green";

    dateAssign.value = getCurrentDate("date", "");
    employee.emp_status_id = JSON.parse(cmbEmpStatus.value);
//   disableButton();

    // btnAdd.disabled = true;

    coursecatogary = getServiceRequest("/coursecatogary/getlist");

    divCoursecatogary.innerHTML = "";
    for(let index in coursecatogary){
        divcoursecatogary = document.createElement('div');
        divcoursecatogary.classList.add('form-check');
        inputCheckBox = document.createElement('input');
        inputCheckBox.type = "checkbox";
        inputCheckBox.value = index;
        inputCheckBox.classList.add('form-check-input');
        inputCheckBox.onchange = function (){
            if(this.checked) {
                console.log("checked");
                console.log(this.value);
                //employee ge api hada gattu array list ekata push krnwa api check krpu list eka.
                employee.course_cats.push(coursecatogary[this.value]);
            } else {
                console.log("unchecked");
                console.log(this.value);
                employee.course_cats.splice(this.value,1);
            }
        }

        if(employee.course_cats.length != 0){
            let extIndex = employee.course_cats.map(e => e.employee).indexOf(course_cats[index]["employee"]);
            console.log(extIndex);
        }

        inputLabel = document.createElement('label');
        inputLabel.innerHTML = coursecatogary[index]["name"];
        inputLabel.classList.add('form-check-label');
        inputLabel.classList.add('fw-bold');

        divcoursecatogary.appendChild(inputCheckBox);
        divcoursecatogary.appendChild(inputLabel);
        divCoursecatogary.appendChild(divcoursecatogary);
}



    buttonDisable(true, false);

}

const disableButton = () => {
    //statue eke value eka deleted nam color eka wenas krnna oni.
    for(let employee in employees){
        if(employees[employee].emp_status_id.name == "Deleted"){
            //deleted status eka tyna row eka alla gatta, row eke inna 6ni lamaya
            tblEmp.children[1].children[employee].children[4].children[0].classList.add("deleted-cell-style");
            //delete button eka tyenna thana hadunaganna oni.. last childge second child (e kiynne 1)
            //button eka disable krnwa
            //mouse eke pointer eka disable krnwa
            tblEmp.children[1].children[employee].lastChild.children[1].style.cursor='not-allowed';
            tblEmp.children[1].children[employee].lastChild.children[1].disabled=true;

        }
        if(employees[employee].emp_status_id.name == "Working"){
            //deleted status eka tyna row eka alla gatta, row eke inna 6ni lamaya
            tblEmp.children[1].children[employee].children[4].children[0].classList.add("active-cell-style");

        }

    }
}


const btnAddMC = () => {
    console.log(employee)
    //submit krddi ena mg eka
    let submitMsg = 'Are you sure to add following Employee....!' + '<br>' + '' + '<br>' +  'Employee Full Name : ' + txtEmpFullName.value
        + '<br>' + 'Employee Calling Name : ' + txtEmpCName.value + '<br>' + 'Employee Mobile Number : ' + txtMobile.value + '<br>' + 'Employee NIC : ' + txtNIC.value + '<br>' + 'Employee Email : ' + txtEmail.value;
    //errors tynwda kiyla check krnwa
    let errors = checkError();
    //errors nathnm ....
    if(errors == ""){
        iziToast.info({
            messageColor: 'black',
            message: submitMsg,
            position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
            progressBarColor: 'rgb(0, 255, 184)',
            buttons: [
                    ['<button style="color: black"><b>Ok</b></button>', function (instance,toast) {
                        instance.hide({ transitionOut: 'fadeOutUp' }, toast);
                //server eken error ekak enwda kiyla blnwa..
                        let serverResponce = httpServiceRequest("/employee","POST",employee);
                        if(serverResponce == "0"){
                            //server error ekak nathnm employeewa add wenwa
                            console.log(employee);
                            iziToast.success({
                                title: 'OK Employee Add Successfully...!',
                                position: 'topRight',
                                //message: 'Student Add Successfully...!',
                            });
                            refreshEmpTable();
                            refreshEmpForm();
                            resetForm();
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
            position: 'topRight',
            //message: 'Not Successfully inserted \n' + serverResponce,
        });
    }
}

const checkError = () => {
    let errors = "";
    if (employee.empfullname == null) {
        setInvalid(txtEmpFullName);
        txtEmpFullName.style.border = '2px solid red';
        //txtEmpFullName.style.borderRight = '3px dotted red';
        //txtEmpFullName.style.borderBottom = '3px dotted red';
        errors = errors + "Full Name not Entered...  \n";
    } else {
    }
    if (employee.empcallingname == null) {
        setInvalid(txtEmpCName);
        txtEmpCName.style.border = '2px solid red';
        errors = errors + "Calling Name not Entered...  \n";
    } else {

    }

    if (employee.empnic == null) {
        setInvalid(txtNIC);
        txtNIC.style.border = '2px solid red';
        errors = errors + "NIC Name not Entered...  \n";
    } else {

    }

    if (employee.mobileno == null) {
        setInvalid(txtMobile);
        txtMobile.style.border = '2px solid red';
        errors = errors + "Mobile Number not Entered...  \n";
    } else {

    }

    if (employee.designation_id == null) {
        setInvalid(cmbDesig);
        cmbDesig.style.border = '2px solid red';
        errors = errors + "Designation is not Entered...  \n";
    } else {

    }

   
    if (employee.civil_status_id == null) {
        setInvalid(cmbCStatus);
        cmbCStatus.style.border = '2px solid red';
        errors = errors + "Civil status is not Entered...  \n";
    } else {

    }

    if (employee.dob == null) {
        setInvalid(dateDOB);
        dateDOB.style.border = '2px solid red';
        errors = errors + "DOB is not Entered...  \n";
    } else {

    }




    if (employee.gender == null) {
        box.style.border = "2px solid red";
        //gender.style.border = '2px solid red';
        errors = errors + "Employee status is not Entered...  \n";
    } else {

    }

    return errors;
   

}


const cmbDesignationch = () => {
    console.log("test 123", cmbDesig.value);
    console.log("test 123", JSON.parse(cmbDesig.value) );
    console.log("test 123", JSON.parse(cmbDesig.value).name );
    let designation = JSON.parse(cmbDesig.value).name;
    if(designation == "Teacher"){
        accorCatogary.classList.remove("d-none");
    }
}



function nicFieldValidator(){
    let nicpattern  = new RegExp('^(([0-9]{9}[VvXx])|([2,1][9,0][0,7,8,9][0-9]{9}))$');
    if(txtNIC.value != ""){
        if(nicpattern.test(txtNIC.value)){

            if (txtNIC.value.length == 10) {
                empnic = "19" + txtNIC.value.substring(0,5) + "0" +  txtNIC.value.substring(5,9);
            } else {
                empnic = txtNIC.value;
            }

            //,lblFemale,lblMale)
            let empBirthYear = empnic.substring(0,4);


            let empNoofBirthDays = empnic.substring(4,7);
            //console.log(empNoofBirthDays);

            //
            if(empNoofBirthDays > 500){
                radFemale.checked = true;
                empNoofBirthDays = empNoofBirthDays - 500;
                employee.gender = "female";
                lblFemale.style.color = "green";
                lblMale.style.color = "black";
            }
            else{
                radMale.checked = true;
                employee.gender = "male";
                lblMale.style.color = "green";
                lblFemale.style.color = "black";
            }

            let dob = new Date(empBirthYear);


            if(empBirthYear%4 == 0){
                //adika awuruddak nm
                dob.setDate(empNoofBirthDays);
                dateDOB.value = getCurrentDate("date",dob);
            }else {
                if(empNoofBirthDays <= 59){
                    dob.setDate(empNoofBirthDays);
                    dateDOB.value = getCurrentDate("date",dob);
                }else if(empNoofBirthDays == 60){
                    dateDOB.value = empBirthYear+"-02-29";
                }else {
                    dob.setDate( parseInt(empNoofBirthDays)-1);
                    dateDOB.value = getCurrentDate("date",dob);
                }
            }
            //  console.log(dob)
            //   console.log(empNoofBirthDays)
            //  dob.setDate(dob.getDate() -1 + parseInt(empNoofBirthDays));
            //dob.setDate(dob.getDate() + parseInt(empNoofBirthDays));
            //input type eke id ek ()
            //  console.log(dob)



            console.log(empBirthYear);

            employee.empnic  = txtNIC.value;
            employee.dob = dateDOB.value;

            if(oldemployee != null && employee.empnic != oldemployee.empnic){
                //setUpdate(txtStuNIC);
                txtNIC.style.border = "2px solid orange";
                //setUpdate(dateDOB);
                dateDOB.style.border = "2px solid orange";



            }
            else{
                //setValid(txtStuNIC);
                txtNIC.style.border = "2px solid green";
                //setValid(dateDOB);
                dateDOB.style.border = "2px solid green";

            }
        }
        else{
            employee.empnic  = null;
            employee.dob = null;
            dateDOB.value = "";
            radFemale.checked = false;
            radMale.checked = false;
            lblFemale.style.color = "black";
            lblMale.style.color = "black";
            setDefauld(dateDOB);
            //setInvalid(txtStuNIC);
            txtNIC.style.border = "2px solid red";
        }
    }
    else{
        employee.empnic  = null;
        employee.dob = null;
        dateDOB.value = "";
        radFemale.checked = false;
        radMale.checked = false;
        lblFemale.style.color = "black";
        lblMale.style.color = "black";
        setDefauld(dateDOB);
        //setInvalid(txtStuNIC);
        txtNIC.style.border = "2px solid red";

    }
}

const checkUpdate = () => {
    let updates = "";

    if(employee != null && oldemployee != null){
        if(employee.empfullname != oldemployee.empfullname){
            updates = updates + "Employee Full name is changed \n" ;
        }
        if(employee.empcallingname != oldemployee.empcallingname){
            updates = updates + "Employee Calling name is changed \n" + oldemployee.empcallingname + " into " + employee.empcallingname + " \n";
        }
        if(employee.empnic != oldemployee.empnic){
            updates = updates + "Employee nic  is changed \n";
        }
        if(employee.gender != oldemployee.gender){
            updates = updates + "Employee Gender  is changed \n";
        }
        if(employee.dob != oldemployee.dob){
            updates = updates + "Employee dob  is changed \n";
        }
        if(employee.mobileno != oldemployee.mobileno){
            updates = updates + "Employee mobile is changed \n";
        }
        if(employee.landno != oldemployee.landno){
            updates = updates + "Employee land is changed \n";
        }
        if(employee.email != oldemployee.email){
            updates = updates + "Employee Email is changed \n";
        }
        if(employee.address != oldemployee.address){
            updates = updates + "Employee Address is changed \n";
        }
        if(employee.civil_status_id.name != oldemployee.civil_status_id.name){
            updates = updates + "Employee Civilstatus is changed \n";
        }
        if(employee.designation_id.name != oldemployee.designation_id.name){
            updates = updates + "Employee Designation is changed \n";
        }
        if(employee.emp_status_id.name != oldemployee.emp_status_id.name){
            updates = updates + "Employee Designation is changed \n";
        }
    }

    return updates;
}

function btnUpdateMC() {
    //check error
    let errors = checkError();
   //if not errors
    if (errors == ""){
        //check update
        let updates = checkUpdate();
        //if not update
        if (updates == ""){
            iziToast.success({
                title: 'No Changes',
                position: 'topRight',
            });
        }else {
            //let updaterespoce = window.confirm("Are Your sure to update this fiels : " + updates);
            iziToast.info({
                image: 'assets/img/employee1.png',
                messageColor: 'black',
                title: 'Are Your sure to update this fiels :' + updates,
                backgroundColor: '#fed3ae',
                position: 'center',// bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
                progressBarColor: 'rgb(0, 255, 184)',
                buttons: [
                    ['<button style="color: black"><b>Ok</b></button>', function (instance,toast) {
                        instance.hide({ transitionOut: 'fadeOutUp' }, toast);
                        let putresponce = httpServiceRequest("/employee", "PUT", employee);
                        if (putresponce == "0") {
                            //window.alert("Update Successfully...")
                            iziToast.success({
                                title: 'Update Successfully...!',
                            });
                            refreshEmpTable()
                            refreshEmpForm();
                            resetForm();
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
    }else {
        iziToast.error({
            title: 'Error Not Successfully Update...' + errors,
            position: 'topRight',
            //message: 'Not Successfully inserted \n' + serverResponce,
        });
    }
}

const resetForm = () => {
    txtEmpFullName.value = "";
    setDefauld(txtEmpFullName);
    txtEmpCName.value = "";
    setDefauld(txtEmpCName);
    txtNIC.value = "";
    setDefauld(txtNIC);
    radMale.checked = false;
    setDefauld(radMale);
    radFemale.checked = false;
    setDefauld(radFemale);
    dateDOB.value = "";
    setDefauld(dateDOB);
    txtMobile.value = "";
    setDefauld(txtMobile);
    txtLand.value = "";
    setDefauld(txtLand);
    txtEmail.value = "";
    setDefauld(txtEmail);
    txtAddress1.value = "";
    setDefauld(txtAddress1);
    txtAddress2.value = "";
    setDefauld(txtAddress2);
    txtAddress3.value = "";
    setDefauld(txtAddress3);
    cmbCStatus.value = "";
    setDefauld(cmbCStatus);
    cmbDesig.value = "";
    setDefauld(cmbDesig);
    txtDes.value = "";
    setDefauld(txtDes);
    lblMale.value = "";
    setDefauld(lblMale);
    lblFemale.value = "";
    setDefauld(lblFemale);
    box.valueOf = "";
    setDefauld(box);
}

const fillCallingNameList = () => {
    empcallingnamelist.innerHTML = "";
    let empcallingnamedatalist = txtEmpFullName.value.split(" ");
    for(i=0; i<empcallingnamedatalist.length; i++){
        var option = document.createElement("option");
        option.value = empcallingnamedatalist[i];
        empcallingnamelist.appendChild(option);
    }
}




const buttonDisable = (submit, modify) => {

    if(submit && loggedUserPrivilege.insert){

        $("#btnAddEmp").css('pointer-event', 'all');
        $("#btnAddEmp").css('cursor', 'pointer');
        $("#btnAddEmp").removeAttr('disabled');
    }else {
        $("#btnAddEmp").css('pointer-event', 'all');
        $("#btnAddEmp").css('cursor', 'not-allowed');
        $("#btnAddEmp").attr('disabled','disabled');
    }

    if(modify && loggedUserPrivilege.update){
        btnUpdateEmp.removeAttribute('disabled');
        $("#btnUpdateEmp").css('pointer-event', 'all');
        $("#btnUpdateEmp").css('cursor', 'pointer');

    }else{
        $("#btnUpdateEmp").attr('disabled','disabled');
        $("#btnUpdateEmp").css('pointer-event', 'all');
        $("#btnUpdateEmp").css('cursor', 'not-allowed');

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


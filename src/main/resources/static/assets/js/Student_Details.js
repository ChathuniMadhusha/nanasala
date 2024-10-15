window.addEventListener('load', loadUI);

//window eka load weddi watena function eka
function loadUI() {
    console.log("Browser onload");


    loggedUserPrivilege = getServiceRequest("/privilage/bymodule/"+"STUDENT_DETAILS" );

    $('#cmdDistrict').select2({
        theme:'bootstrap-5',
    });

    refreshStuTable();
    refreshStuForm();
    refreshGuarForm();

    $('[data-bs-toggle = "tooltip"]').tooltip();
}


const refreshStuTable = () => {

    students = getServiceRequest("/student/findall");
    /*[
    { id: 1, studentno: "Stu001", name_full: "Nadun Sampath", calling_name: "Nadun", dob: "1997-05-03", gender: "Male", address_line1: "No 159",
address_line2: "Asgiriya",city:"Gampaha", district_id: { id: 2, name: "Gampaha" }, contact_no: "0718954257", camefrom_id: { id: 1, name: "ddscs" },
        email: "sampath@gmail.com" },
{ id: 2, studentno: "Stu002", name_full: "Sandun Sampath", calling_name: "Sandun", dob: "1997-06-05", gender: "Male", address_line1: "No 159",
address_line2: "Asgiriya",city:"Gampaha", district_id: { id: 2, name: "Gampaha" }, contact_no: "0718954257", camefrom_id: { id: 1, name: "ddscs" },
    mail: "sampath@gmail.com" },
{ id: 3, studentno: "Stu003", name_full: "Kamalini Herath", calling_name: "Kamalini", dob: "1997-10-03", gender: "Female", address_line1: "No 159",
address_line2: "Asgiriya",city:"Gampaha", district_id: { id: 2, name: "Gampaha" }, contact_no: "0718954257", camefrom_id: { id: 1, name: "ddscs" },
    email: "sampath@gmail.com" }
];*/

    //properties list eka
    let displayPropertyList = ['studentno', 'added_date' ,'gender', 'mobile_whatsap', 'stu_status_id.name'];
    let displayDataList = [getRegCalling, getyearr ,'text', 'text', 'object'];


    fillDataTableNew(tblStudent, students, displayPropertyList, displayDataList, true, 'editob',
        btnEdit, btnDelete,btnView);

    // for(let index in students){
    //     if(students[index].stu_status_id.name == "Active"){
    //         tblStudent.children[1].children[index].children[5].children[0].classList.add("active-cell-style");
    //     }
    //     if(students[index].stu_status_id.name == "In Active"){
    //         tblStudent.children[1].children[index].children[5].children[0].classList.add("deleted-cell-style");
    //     }
    // }

    $('#tblStudent').dataTable();
}

function getRegCalling(ob) {
    return ob.studentno + "(" + ob.calling_name + ")";
}

function getyearr(ob){
    console.log();

    return ob.added_date.split("-")[0];

}


const rowView = (stuob) => {

    printstudent = getServiceRequest("/student/getbyid?id="+window[stuob]["id"]);

    $('#stuView').modal('show');
   // tdstudentno.innerHTML = printstudent.studentno;
    tdStuFullName.innerHTML = printstudent.name_full;
    tdStuNIC.innerHTML = printstudent.stu_nic;
    tdStuDOB.innerHTML = printstudent.dob;
    tdStuAddL1.innerHTML = printstudent.address_line1;
    tdStuAddL2.innerHTML = printstudent.address_line2;
    tdStuMobile.innerHTML = printstudent.mobile_whatsap;
    tdStuEmail.innerHTML = printstudent.email;
    tdStuStatus.innerHTML = printstudent.stu_status_id.name;
    tdStuAssign.innerHTML = printstudent.added_date;


}

function printStudentView(){
    let newWindow =  window.open();

    newWindow.document.write(" <link href=\"assets/vendor/bootstrap/css/bootstrap.min.css\" rel=\"stylesheet\">"
        +"<script src=\"assets/Libraries/jQuery/jQuery.js\"></script>"+"<h2>Student Details</h2>"
        + tableStudentView.outerHTML);

    //set time out
    setTimeout(() => {
        newWindow.print();
    }, 1000);
}






//form eka reset wela yanawa
const resetStuForm = () => {

    txtNameFull.value = "";
    setDefauld(txtNameFull);

    txtCallingName.value = "";
    setDefauld(txtCallingName);

    dateDOB.value = "";
    setDefauld(dateDOB);

    txtStuNIC.value = "";
    setDefauld(txtStuNIC);

    txtAddress01.value = "";
    setDefauld(txtAddress01);

    txtAddress02.value = "";
    setDefauld(txtAddress02);

    txtAddress03.value = "";
    setDefauld(txtAddress03);

    cmdDistrict.value = "";
    setDefauld(cmdDistrict);

    txtMobNumber.value = "";
    setDefauld(txtMobNumber);

    txtWhpNumber.value = "";
    setDefauld(txtWhpNumber);

    cmbCameFrom.value = "";
    setDefauld(cmbCameFrom);

    txtEmail.value = "";
    setDefauld(txtEmail);

    radStuMale.checked = false;
    setDefauld(radStuMale);

    radStuFemale.checked = false;
    setDefauld(radStuFemale);

    lblFemale.checked = false;
    setDefauld(lblFemale);

    lblMale.checked = false;
    setDefauld(lblMale);


    box.value = "";
    setDefauld(box);


}

function formRefill(stu) {
    student = getServiceRequest("student/getbyid?id=" + window[stu]['id']);
    oldstudent = getServiceRequest("student/getbyid?id=" + window[stu]['id']);

    changeTab("form");

    //required
    txtNameFull.value = student.name_full;
    setValid(txtNameFull);
    txtNameFull.style.border = "2px solid green";

    //required
    txtCallingName.value = student.calling_name;
    setValid(txtCallingName);
    txtCallingName.style.border = "2px solid green";

    //required
    dateDOB.value = student.dob;
    setValid(dateDOB);
    dateDOB.style.border = "2px solid green";

    //optional
    if (student.stu_nic != undefined) {
        txtStuNIC.value = student.stu_nic;
        dateDOB.disabled = true;
        radStuMale.disabled = true
        radStuFemale.disabled = true;
        txtStuNIC.style.border = "2px solid green";
    } else {
        setDefauld(txtStuNIC);
    }

    //required
    if (student.gender == "Male") {
        radStuMale.checked = true;
    } else {
        radStuFemale.checked = true;
    }
    box.style.border = "2px solid green";

//required
    txtAddress01.value = student.address_line1;
    setValid(txtAddress01);
    txtAddress01.style.border = "2px solid green";

//required
    txtAddress02.value = student.address_line2;
    setValid(txtAddress02);
    txtAddress02.style.border = "2px solid green";

//Optional
    if (student.address_line3 != undefined) {
        txtAddress03.value = student.address_line3;
        txtAddress03.style.border = "2px solid green";
    } else {
        setDefauld(txtAddress03);
    }

    //Optional
    if (student.mobile_no != undefined) {
        txtMobNumber.value = student.mobile_no;
        txtMobNumber.style.border = "2px solid green";
    } else {
        setDefauld(txtMobNumber);
    }


//required
    txtWhpNumber.value = student.mobile_whatsap;
    setValid(txtWhpNumber);
    txtWhpNumber.style.border = "2px solid green";

//optional
    if (student.email != undefined) {
        txtEmail.value = student.email;
        txtEmail.style.border = "2px solid green";
    } else {
        setDefauld(txtEmail);
    }

    //optional
    fillSelectFeild(cmbCameFrom, "Came from by", came_from, 'name', student.camefrom_id.name);
    cmbCameFrom.style.border = "2px solid green";

    //required
    fillSelectFeild(cmdDistrict, "Select District", districts, 'name', student.district_id.name);
    cmdDistrict.style.border = "2px solid green";

    fillSelectFeild(cmbStuStatus, "Select Status", stu_status, 'name', student.stu_status_id.name);
    cmbStuStatus.style.border = "2px solid green";

  //  changeUiColor(setValid);
    buttonDisable(false,true);

}


function rowDelete(stuob) {
    if(window[stuob].stu_status_id.name == "Deleted"){
        iziToast.error({
            title: 'Already Deleted \n',
            position: 'topRight',
        });
    }else {

        //delete mg eka
        let deleteMsg = "Are you sure to delete following student...?" +
            "Student Reg No : " + window[stuob]['studentno'];

        //let deleteResponce = window.confirm(deleteMsg);
        iziToast.info({
            messageColor: 'black',
            message: deleteMsg,
            position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
            progressBarColor: 'rgb(0, 255, 184)',
            buttons: [
                //ok function eka
                ['<button style="color: black"><b>Ok</b></button>', function (instance, toast) {
                    instance.hide({transitionOut: 'fadeOutUp'}, toast);
                    let responce = httpServiceRequest("/student", "DELETE", window[stuob]);
                    if (responce == "0") {
                        // window.alert("Student Delete Successfully.......!");
                        iziToast.success({
                            title: 'OK Student Delete Successfully...!',
                            position: 'topRight',
                            //message: 'Student Add Successfully...!',
                        });
                        refreshStuTable();
                        refreshStuTable();
                        resetStuForm();
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


//update button eka press unhma me function ek wada krnwa
function btnUpdateMC() {
    let errors = checkError();
    if (errors == "") {
        let updates = checkUpdate();
        if (updates == "") {
            //window.alert("No Changes")
            iziToast.success({
                title: 'No Changes',
                position: 'topRight',
            });
        } else {
            //let updaterespoce = window.confirm("Are Your sure to update this fiels : " + updates);
            iziToast.info({
                messageColor: 'black',
                title: 'Are Your sure to update this fiels :' + updates,
                position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
                progressBarColor: 'rgb(0, 255, 184)',
                buttons: [
                    ['<button style="color: black"><b>Ok</b></button>', function (instance,toast) {
                        instance.hide({ transitionOut: 'fadeOutUp' }, toast);
                        let putresponce = httpServiceRequest("/student", "PUT", student);
                        if (putresponce == "0") {
                            //window.alert("Update Successfully...")
                            iziToast.success({
                                title: 'Update Successfully...!',
                            });
                            refreshStuTable();
                            refreshStuForm();
                            resetStuForm();
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
            } else {
        //error tynwnm meka execute wenwa
        iziToast.error({
            title: 'Error Not Successfully Update...' + errors,
            position: 'topRight',
            //message: 'Not Successfully inserted \n' + serverResponce,
        });

    }

}

    const checkUpdate = () => {
        let updates = "";

        if (student != null && oldstudent != null) {
            if (student.name_full != oldstudent.name_full) {
                updates = updates + "Student Full name is changed \n";
            }
            if (student.calling_name != oldstudent.calling_name) {
                updates = updates + "Student Calling name is changed \n" + oldstudent.calling_name + " into " + student.calling_name + " \n";
            }
            if (student.dob != oldstudent.dob) {
                updates = updates + "Student DOB  is changed \n";
            }
            if (student.stu_nic != oldstudent.stu_nic) {
                updates = updates + "Student NIC  is changed \n";
            }
            if (student.gender != oldstudent.gender) {
                updates = updates + "Student Gender  is changed \n";
            }
            if (student.address_line1 != oldstudent.address_line1) {
                updates = updates + "Student Address line 1  is changed \n";
            }
            if (student.address_line2 != oldstudent.address_line2) {
                updates = updates + "Student Address line 2 is changed \n";
            }
            if (student.address_line3 != oldstudent.address_line3) {
                updates = updates + "Student City is changed \n";
            }
            if (student.district_id.name != oldstudent.district_id.name) {
                updates = updates + "Student District is changed \n";
            }
            if (student.mobile_no != oldstudent.mobile_no) {
                updates = updates + "Student Mobile No is changed \n";
            }
            if (student.mobile_whatsap != oldstudent.mobile_whatsap) {
                updates = updates + "Student Mobile No is changed \n";
            }
            if (student.camefrom_id.name != oldstudent.camefrom_id.name) {
                updates = updates + "Student Came from Statement is changed \n";
            }
            if (student.email != oldstudent.email) {
                updates = updates + "Student Email is changed \n";
            }
            if (student.stu_status_id != oldstudent.stu_status_id) {
                updates = updates + "Student Status is changed \n";
            }
        }

        return updates;
    }

    const checkError = () => {
        let errors = "";
        if (student.name_full == null) {
            setInvalid(txtNameFull);
            txtNameFull.style.border = '2px solid red';

            errors = errors + "Full Name not Entered...  \n";
        } else {

        }

        if (student.calling_name == null) {
            setInvalid(txtCallingName);
            txtCallingName.style.border = '2px solid red';
            errors = errors + "Calling Name not Entered...  \n";
        } else {

        }

        if (student.dob == null) {
            setInvalid(dateDOB);
            dateDOB.style.border = '2px solid red';
            errors = errors + "DOB not Entered...  \n";
        } else {

        }

        if (student.address_line1 == null) {
            setInvalid(txtAddress01);
            txtAddress01.style.border = '2px solid red';
            errors = errors + "Address line 1 not Entered...  \n";
        } else {

        }


        if (student.address_line2 == null) {
            setInvalid(txtAddress02);
            txtAddress02.style.border = '2px solid red';
            errors = errors + "Address line 2 not Entered...  \n";
        } else {

        }


        if (student.district_id == null) {
            setInvalid(cmdDistrict);
            cmdDistrict.style.border = '2px solid red';
            errors = errors + "District not Entered...  \n";
        } else {

        }

        if (student.mobile_whatsap == null) {
            setInvalid(txtWhpNumber);
            txtWhpNumber.style.border = '2px solid red';
            errors = errors + "Mobile No (W) not Entered...  \n";
        } else {

        }

        /* if (student.stu_nic == null) {
             setInvalid(txtStuNIC);
             txtStuNIC.style.border = '2px solid red';
             errors = errors + "Contact No not Entered...  \n";
         } else {

         }*/

        if (student.gender == null) {
            box.style.border = "2px solid red";

            errors = errors + "Gender not Entered...  \n";
        } else {

        }

        return errors;

    }

    /*const btnAddMCS = () => {
       let errors =  checkError();

       if(errors == ""){

           let serverResponce = httpServiceRequest("/student","POST",student);
           if(serverResponce == "0"){
               console.log(student);
               iziToast.success({
                   messageColor: 'white',
                   maxWidth: null,
                   titleColor: '',
                   maxWidth: null,
                   backgroundColor: 'green',
                   position: 'bottomCenter',
                   message: 'Good Job, Student Add Successfully'
               });
               refreshStuTable()
               refreshStuForm()
               resetStuForm();
               changeTab("table");
           }
           else{
               iziToast.error({
                   messageColor: 'white',
                   transitionIn: 'bounceInDown',
                   maxWidth: null,
                   backgroundColor: 'red',
                   titleColor: '',
                   position: 'topRight',
                   message: 'You Have Follwing Error'+" "+ serverResponce,
               });
           }
       }else{
           alert("you have following error"+ errors);
       }
    }*/

const btnAddMCS = (stuob) => {

    let subConfirmMsg = 'Are You sure to add following student....!' + '<br>' + ' ' + '<br>' + 'Student Full Name : ' + txtNameFull.value +
        '<br>' + '<br>' + 'Student DOB :' + dateDOB.value + '<br>' + 'Address Line 1 : ' + txtAddress01.value + '<br>' +
        'Address Line 2 : ' + txtAddress02.value + '<br>' + 'Mobile Number (W) : ' + txtWhpNumber.value;
    //errors tynwda kiyla check krnwa
    let errors = checkError();
    //errors nathnm....
    if(errors == ""){
        iziToast.info({
            messageColor: 'black',
            message: subConfirmMsg,
            position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
            progressBarColor: 'rgb(0, 255, 184)',
            buttons: [
                ['<button style="color: black"><b>Ok</b></button>', function (instance,toast) {
                    instance.hide({ transitionOut: 'fadeOutUp' }, toast);
                    let serverResponce = httpServiceRequest("/student", "POST", student);
                    //server eken errors enwda kiyla blnwa

                    let pattern = new RegExp("^[N][S][0-9]{6}$");

                    if (pattern.test(serverResponce)) {
                        iziToast.success({
                            //server errors nathnm me mg eka awilla add wenwa
                            title: 'OK Student Add Successfully...!',
                            position: 'topRight',
                            message: 'Student Reg no is ' + serverResponce,
                        });
                        refreshStuTable()
                        refreshStuForm()
                        resetStuForm();
                        changeTab("table");
                    }else {
                        //server errors tynwnm me mg eka enwa
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
    }else{
        //uda check krpu thana erors tynwnm me mg eka enwa..
        //alert("you have following error"+ errors);
        iziToast.error({
            title: 'You Have Following Errors : '+ '<br>' + errors,
            position: 'topRight',
            //message: 'Not Successfully inserted \n' + serverResponce,
        });
    }
   }



    const btnAddMCG = (guar) => {
        let errors = checkGuardianError();

        let serverResponce = httpServiceRequest("/guardian", "POST", guardian);
        if (serverResponce == "0") {
            console.log(guardian);
            let guardianMobile = guardian.emergency_con;
            resetGuaForm();
            refreshGuarForm();
            let newGuardian = getServiceRequest("/guardian/getbymobile?emergency_con=" + guardianMobile)
            guardiannames = getServiceRequest("/guardian/getlist");
            fillSelectFeild(guarDetails,"Select Guardian", guardiannames, 'guardian_name',newGuardian.guardian_name);
            student.guardian_id = newGuardian;
            fillGuardianList();


        } else {
            alert("You Have and following error" + serverResponce);
        }
    }


    const checkGuardianError = () => {
        let errors = "";
        if (guardian.guardian_name == null) {
            setInvalid(txtGuadianName);
            txtGuadianName.style.border = '2px solid red';

            errors = errors + "Guardian Name not Entered...  \n";
        } else {

        }

        if (guardian.emergency_con == null) {
            setInvalid(txtConNo);
            txtConNo.style.border = '2px solid red';

            errors = errors + "Guardian Contact No not Entered...  \n";
        } else {

        }

        if (guardian.relationship_id == null) {
            setInvalid(cmbRelationship);
            cmbRelationship.style.border = '2px solid red';

            errors = errors + "Relationship is not Entered...  \n";
        } else {

        }

        return errors;

    }

    const refreshGuarForm = () => {
        guardian = new Object();
        oldguardian = null;

        guarDetails.value = "";
        guarDetails.disabled = false;
        setDefauld(guarDetails);
        txtGuadianName.value = "";
        txtGuadianName.disabled = false;
        setDefauld(txtGuadianName);
        txtConNo.value = "";
        txtConNo.disabled = false;
        setDefauld(txtConNo);
        cmbRelationship.value = "";
        cmbRelationship.enable = false;
        setDefauld(cmbRelationship);
        txtAddressGua1.value = "";
        txtAddressGua1.enable = false;
        setDefauld(txtAddressGua1);
        txtAddressGua2.value = "";
        txtAddressGua2.enable = false;
        setDefauld(txtAddressGua2);
        txtAddressGua3.value = "";
        txtAddressGua3.enable = false;
        setDefauld(txtAddressGua3);



        relatinship = getServiceRequest("/relashionship/getlist");
        fillSelectFeild(cmbRelationship, "Select Relationship", relatinship, 'name', '');
        $('#guardianviewmodal').modal('hide');
    }


    const resetGuaForm = () => {

        txtGuadianName.value = "";
        setDefauld(txtGuadianName);

        txtConNo.value = "";
        setDefauld(txtConNo);

        cmbRelationship.value = "";
        setDefauld(cmbRelationship);


    }

    const refreshStuForm = () => {
        student = new Object();
        oldstudent = null;

        districts = getServiceRequest("/district/getlist");
        fillSelectFeild(cmdDistrict, "Select District", districts, 'name', '');

        came_from = getServiceRequest("/camefrom/getlist");
        fillSelectFeild(cmbCameFrom, "Camefrom by", came_from, 'name', '');

        stu_status = getServiceRequest("/stustatus/getlist");
        fillSelectFeild(cmbStuStatus, "Student Status", stu_status, 'name', 'Active', true);
        cmbStuStatus.style.border = "2px solid green";

        relatinship = getServiceRequest("/relashionship/getlist");
        fillSelectFeild(cmbRelationship, "Select Relationship", relatinship, 'name', '');

        guardiannames = getServiceRequest("/guardian/getlist");
        fillSelectFeild(guarDetails,"Select Guardian", guardiannames, 'guardian_name','');

        dateStuAssign.value = getCurrentDate("date", "");

        student.stu_status_id = JSON.parse(cmbStuStatus.value);

        let currentDateForMax = new Date();
        currentDateForMax.setFullYear(currentDateForMax.getFullYear() - 6);
        dateDOB.max = currentDateForMax.getFullYear() + getDateAndMonth(currentDateForMax, "monthdate");
        //dateDOB.max = "2004-01-01";

        buttonDisable(true,false);

    }

    const fillGuardianList = () => {
      //alert(JSON.parse(guarDetails.value));
      extGuardian = JSON.parse(guarDetails.value)
        /*txtGuadianName.value = extGuardian.guardian_name;
      setValid(txtGuadianName);
        txtGuadianName.disabled = true;*/
        txtMobNumber.value = extGuardian.emergency_con;
        student.mobile_no = extGuardian.emergency_con;
        setValid(txtMobNumber);
        txtMobNumber.disabled = true

        txtAddress01.value = extGuardian.addressline1;
        student.address_line1 = extGuardian.addressline1;
        setValid(txtAddress01);
        txtAddress01.disabled = true

        txtAddress02.value = extGuardian.addressline2;
        student.address_line2 = extGuardian.addressline2;
        setValid(txtAddress02);
        txtAddress02.disabled = true


        if(extGuardian.addressline3 != undefined)
            txtAddress03.value = extGuardian.addressline3;
        student.address_line3 = extGuardian.addressline3;
        txtAddress03.disabled = true


       /*fillSelectFeild(cmbRelationship,"Select Relationship",relatinship,'name',extGuardian.relationship_id.name);
        setValid(cmbRelationship);
        cmbRelationship.disabled = true;*/
        $('#guardianviewmodal').modal('hide');

    }


    function getwhatsappnumber(){

        let patern = new RegExp("^[0][7][0,1,2,4,5,6,7,8][0-9]{7}$");


        if(patern.test(txtMobNumber.value)){
            txtWhpNumber.value = txtMobNumber.value;
            student.mobile_whatsap = txtWhpNumber.value;

            student.mobile_no = txtMobNumber.value;
            setValid(txtMobNumber);
        } else {
            txtWhpNumber.value="";
            student.mobile_whatsap = null;
            setInvalid(txtMobNumber);
            setDefauld(txtWhpNumber);
        }




    }



    function ageCalculator() {
        var dateinput = document.getElementById("dateDOB").value;
        var dob = new Date(dateinput);
        if (dateinput == null || dateinput == '') {
            document.getElementById("msg"), innerHtML = "Choose a date please";
            return false;
        } else {
            //calculate month difference from current date in time
            var month_diff = Date.now() - dob.getTime();

            //convert the calculated difference in date format
            var age_dt = new Date(month_diff);

            //extract year from date
            var year = age_dt.getUTCFullYear();

            //now calculate the age of the user
            var age = Math.abs(year - 1970);

            if (age < 16) {
                $("#guardianviewmodal").modal("show");
            }

            //display the calculated age
            return document.getElementById("result").innerHTML =
                "Age is: " + age + " years. ";
        }
    }


    function nicFieldValidator() {
        let nicpattern = new RegExp('^(([0-9]{9}[VvXx])|([2,1][9,0][0,7,8,9][0-9]{9}))$');
        if (txtStuNIC.value != "") {
            dateDOB.disabled = true;
            radStuMale.disabled = true;
            radStuFemale.disabled = true;
            if (nicpattern.test(txtStuNIC.value)) {


                if (txtStuNIC.value.length == 10) {

                    stu_nic = "19" + txtStuNIC.value.substring(0, 5) + "0" + txtStuNIC.value.substring(5, 9);
                } else {
                    stu_nic = txtStuNIC.value;
                }

                //,lblFemale,lblMale)
                let stuBirthYear = stu_nic.substring(0, 4);


                let stuNoofBirthDays = stu_nic.substring(4, 7);
                //console.log(empNoofBirthDays);

                //
                if (stuNoofBirthDays > 500) {
                    radStuFemale.checked = true;
                    stuNoofBirthDays = stuNoofBirthDays - 500;
                    student.gender = "female";
                    lblFemale.style.color = "green";
                    lblMale.style.color = "black";
                } else {
                    radStuMale.checked = true;
                    student.gender = "male";
                    lblMale.style.color = "green";
                    lblFemale.style.color = "black";
                }

                let dob = new Date(stuBirthYear);


                if (stuBirthYear % 4 == 0) {
                    //adika awuruddak nm
                    dob.setDate(stuNoofBirthDays);
                    dateDOB.value = getCurrentDate("date", dob);
                } else {
                    if (stuNoofBirthDays <= 59) {
                        dob.setDate(stuNoofBirthDays);
                        dateDOB.value = getCurrentDate("date", dob);
                    } else if (stuNoofBirthDays == 60) {
                        dateDOB.value = stuBirthYear + "-02-29";
                    } else {
                        dob.setDate(parseInt(stuNoofBirthDays) - 1);
                        dateDOB.value = getCurrentDate("date", dob);
                    }
                }


                console.log(stuBirthYear);

                student.stu_nic = txtStuNIC.value;
                student.dob = dateDOB.value;

                if (oldstudent != null && student.stu_nic != oldstudent.stu_nic) {
                    //setUpdate(txtStuNIC);
                    txtStuNIC.style.border = "2px solid orange";
                    //setUpdate(dateDOB);
                    dateDOB.style.border = "2px solid orange";


                } else {
                    //setValid(txtStuNIC);
                    txtStuNIC.style.border = "2px solid green";
                    //setValid(dateDOB);
                    dateDOB.style.border = "2px solid green";

                }
            } else {
                student.stu_nic = null;
                student.dob = null;
                dateDOB.value = "";
                radStuFemale.checked = false;
                radStuMale.checked = false;
                lblFemale.style.color = "black";
                lblMale.style.color = "black";
                setDefauld(dateDOB);
                //setInvalid(txtStuNIC);
                txtStuNIC.style.border = "2px solid red";
            }
        } else {


            student.stu_nic = null;
            student.dob = null;
            dateDOB.value = "";
            radStuFemale.checked = false;
            radStuMale.checked = false;
            lblFemale.style.color = "black";
            lblMale.style.color = "black";
            setDefauld(dateDOB);
            //setInvalid(txtStuNIC);
            txtStuNIC.style.border = "2px solid red";

        }
    }


 function checkNic(){

    let chnic = txtStuNIC.value;
    let patern = new RegExp("^(([0-9]{9}[VvXx])|([0-9]){12})$");

    if(patern.test(chnic)) {
        let extNic = getServiceRequest("/student/byNic/" + chnic)

        if (extNic.stu_nic != null) {
            //database eke thiyenwa (exist wenawa)
            setInvalid(txtStuNIC);
            iziToast.error({
                title: 'This NIC is exist ',
                position: 'topCenter',
                //message: 'Not Successfully inserted \n' + serverResponce,
            });
            //false
        } else {
            //database eke nha
            //true
            student.stu_nic = txtStuNIC.value;
            setValid(txtStuNIC);
        }
    }
 }

    const fillCallingNameList = () => {
        callingnamelist.innerHTML = "";
        //full name eke values gana oni, space eken split krla array ekakata da gnwa
        let callingNameDatalist = txtNameFull.value.split(" ");
        // let callingNameDatalist = ["Chathuni","Madhusha","Kumarihami"];
        for (i = 0; i < callingNameDatalist.length; i++) {
            var option = document.createElement("option");
            option.value = callingNameDatalist[i];
            callingnamelist.appendChild(option);
        }
    }

    const fillGuardianName = () => {
        guarDetails.innerHTML = "";

    }

const buttonDisable = (submit, modify) => {

    if(submit && loggedUserPrivilege.insert){

        $("#btnAddStu").css('pointer-event', 'all');
        $("#btnAddStu").css('cursor', 'pointer');
        $("#btnAddStu").removeAttr('disabled');
    }else {
        $("#btnAddStu").css('pointer-event', 'all');
        $("#btnAddStu").css('cursor', 'not-allowed');
        $("#btnAddStu").attr('disabled','disabled');
    }

    if(modify && loggedUserPrivilege.update){
        $("#btnUpdateStu").removeAttr('disabled');
        $("#btnUpdateStu").css('pointer-event', 'all');
        $("#btnUpdateStu").css('cursor', 'pointer');

    }else{
        $("#btnUpdateStu").css('pointer-event', 'all');
        $("#btnUpdateStu").css('cursor', 'not-allowed');
        $("#btnUpdateStu").attr('disabled','disabled');

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
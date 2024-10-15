window.addEventListener('load', loadUI);

function loadUI() {
    console.log("Browser onload");

    loggedUserPrivilege = getServiceRequest("/privilage/bymodule/"+"MANAGE_USER_DETAILS" );

    refreshUserTable();
    refreshUserForm();
    $('[data-bs-toggle = "tooltip"]').tooltip();
}

const refreshUserTable = () => {

    users = getServiceRequest("/user/findall")
    /*users = [{ id: 1, employee_id: { id: 1, empno: "EMP220001", empcallingname: "Kamal" }, username: "Kamal", roles: [{ id: 1, role: "Manager" }], status: true },
    { id: 2, employee_id: { id: 2, empno: "EMP220002", callingname: "Sugath" }, username: "Sugath", roles: [{ id: 3, role: "Cashier" }, { id: 2, role: "Assis-Mana" }], status: true },
    { id: 3, employee_id: { id: 3, empno: "EMP220003", callingname: "Samantha" }, username: "Samantha", roles: [{ id: 3, role: "Cashier" }], status: false }]*/


    let displayPropertyList = ['employee_id.empno',  'roles', 'status'];
    let displayDataList = [gtEmployeeName, getUserRoles, getUserStatus];
    let statusColorList = [{name:"In-Active", colorClass:"deleted-cell-style",buttondisabled:true},
        {name:"Active", colorClass:"active-cell-style",buttondisabled:false}];

    fillDataTable(tblUser, users, displayPropertyList, displayDataList, formRefill, rowDelete, rowView,true,true,statusColorList,loggedUserPrivilege);
    setTableColor();
    $('#tblUser').dataTable();


}


function gtEmployeeName(ob) {
    return ob.username + " (" + ob.employee_id.empno + ") ";
}

function getUserRoles(ob) {
    let userRoles = "";
    for (let index in ob.roles) {
        if ((ob.roles.length - 1) == index)
            userRoles = userRoles + ob.roles[index].name;
        else userRoles = userRoles + ob.roles[index].name + ",";
    }
    return userRoles;
}

function getUserStatus(ob) {
    let status = "In-Active";
    if (ob.status)
        status = "Active";

    return status;
}





const refreshUserForm = () => {
    user = new Object();
    olduser = null;

    //many to many (make array)
    user.roles = new Array();

   // employeeWithoutUserAccount = [{id:4, callingname: "Thameera"}, {id:5, callingname: "Shamal"}];
  //  fillSelectFeild2(cmbEmpNo,"Select Employee",employeeWithoutUserAccount, '', 'empcallingname',''  );

    employeeWithoutUserAccount = getServiceRequest("employee/listbywithoutuseraccount");

    //employeeLists = getServiceRequest("/employee/findall");
    fillSelectFeild2(cmbEmpNo,"Select",employeeWithoutUserAccount,'empno','empcallingname');

    cmbEmpNo.value = "";
    txtUserName.value = "";
    pwd.value = "";
    rePwd.value = "";
    txtEmail.value = "";



    //roles = [{ id: 1, role: "Admin" }, { id: 2, role: "Manager" }, { id: 4, role: "Recesptionist" } , { id: 3, role: "Teacher" }, { id: 5, role: "Demostrator" }];
    roles = getServiceRequest("/role/getlist");

    divRoles.innerHTML = "";
    for(let index in roles){
        //dom lawwa element 3 hada gatta
        divroles = document.createElement('div');
        divroles.classList.add('form-check');
        inputCheckBox = document.createElement('input');
        inputCheckBox.type = "checkbox";
        inputCheckBox.value = index;
        inputCheckBox.classList.add('form-check-input');
        //event eka alla ganwa
        inputCheckBox.onchange = function (){
            if(this.checked) {
                console.log("checked");
                console.log(this.value);
                user.roles.push(roles[this.value]);
            } else {
                console.log("unchecked");
                console.log(this.value);
                user.roles.splice(this.value,1);
            }
        }

        if(user.roles.length != 0){
            let extIndex = user.roles.map(e => e.role).indexOf(roles[index]["role"]);
            console.log(extIndex);
        }

        inputLabel = document.createElement('label');
        inputLabel.innerHTML = roles[index]["name"];
        inputLabel.classList.add('form-check-label');
        inputLabel.classList.add('fw-bold');

        divroles.appendChild(inputCheckBox);
        divroles.appendChild(inputLabel);
        divRoles.appendChild(divroles);
    }


    chkUserStatus.checked = true;
    user.status = true;

    //empty input element
    cmbEmpNo.value = "";
    txtUserName.value = "";
    pwd.value = "";
    rePwd.value = "";
    txtEmail.value = "";
    chkUserStatus.value = "";

    //set initial color for UI element
    setStyle("2px solid #ced4da");
    buttonDisable(true,false);

}

function setStyle(style){
    cmbEmpNo.style.border = style;
    txtUserName.style.border = style;
    pwd.style.border = style;
    rePwd.style.border = style;
    txtEmail.style.border = style;
    chkUserStatus.style.border = style;
}

function rowView() {

}

function rowDelete(userob) {

    let deletMsg = "Are You sure to delete this User....? "

    iziToast.info({
        messageColor: 'black',
        message: deletMsg,
        position: 'center',// bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
        progressBarColor: 'rgb(0, 255, 184)',
        buttons: [
            ['<button style="color: black"><b>Ok</b></button>', function (instance,toast) {
                instance.hide({ transitionOut: 'fadeOutUp' }, toast);
                let responce = httpServiceRequest("/user", "DELETE", userob);
                if (responce == "0") {
                    // window.alert("User Delete Successfully.......!");
                    iziToast.success({
                        title: 'OK User Delete Successfully...!',
                        position: 'topRight',
                        //message: 'Student Add Successfully...!',
                    });
                    refreshUserTable();
                    refreshUserForm();
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

    //create function for refill form
function formRefill(obuser, rowno) {

//user = JSON.parse(JSON.stringify(obuser));
//olduser = JSON.parse(JSON.stringify(obuser));

    user = getServiceRequest("/user/getbyid?id="+obuser.id);
    olduser = getServiceRequest("/user/getbyid?id="+obuser.id);

    changeTab("form");

    txtUserName.value = user.username;
    setValid(txtUserName);
    txtUserName.style.border = "2px solid green";

    pwd.value = "";
    pwd.disabled = true;

    rePwd.value = "";
    rePwd.disabled = true;

    txtEmail.value = user.email;
    setValid(txtEmail);
    txtEmail.style.border = "2px solid green";

    employeeWithoutUserAccount.push(user.employee_id);
    fillSelectFeild2(cmbEmpNo, "Select Emp NO", employeeWithoutUserAccount, 'empno','empcallingname', user.employee_id.empno,true);
    cmbEmpNo.style.border = "2px solid green";

    roles = getServiceRequest("/role/getlist");

    divRoles.innerHTML = "";
    for(let index in roles){
        //dom lawwa element 3 hada gatta
        divroles = document.createElement('div');
        divroles.classList.add('form-check');
        inputCheckBox = document.createElement('input');
        inputCheckBox.type = "checkbox";
        inputCheckBox.value = index;
        inputCheckBox.classList.add('form-check-input');
        //event eka alla ganwa
        inputCheckBox.onchange = function (){
            if(this.checked) {
                console.log("checked");
                console.log(this.value);
                user.roles.push(roles[this.value]);
            } else {
                console.log("unchecked");
                console.log(this.value);
                user.roles.splice(this.value,1);
            }

        }

        if(user.roles.length != 0){
            let extIndex = user.roles.map(e => e.name).indexOf(roles[index]["name"]);
            if(extIndex != -1){
                inputCheckBox.checked = true;
            }
        }

        inputLabel = document.createElement('label');
        inputLabel.innerHTML = roles[index]["name"];
        inputLabel.classList.add('form-check-label');
        inputLabel.classList.add('fw-bold');

        divroles.appendChild(inputCheckBox);
        divroles.appendChild(inputLabel);
        divRoles.appendChild(divroles);
    }



if (user.status) {
    chkUserStatus.checked = true;
    lblUserStatus.innerText = "User Account is Active";
    lblUserStatus.style.color = "green";
} else {
    chkUserStatus.checked = false;
    lblUserStatus.innerText = "User Account is In-Active";
    lblUserStatus.style.color = "green";
}
    changeTab("form");
   // headingTwo.ariaExpanded = "true";

    buttonDisable(false,true);

}


const btnAddMCU = () => {
    //console.log(user)
    let submitMsg = "Are you sure to Add this User ";
    //errors tynwda kiyla check krnwa
   let errors =  checktError();
   //errore nathnm....
   if(errors == ""){
       iziToast.info({
           messageColor: 'black',
           message: submitMsg,
           position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
           progressBarColor: 'rgb(0, 255, 184)',
           buttons: [
               ['<button style="color: black"><b>Ok</b></button>', function (instance,toast) {
                   instance.hide({ transitionOut: 'fadeOutUp' }, toast);
               let serverResponce = httpServiceRequest("/user","POST",user);
                   //server errors tynwda kiyla check knrwa
               if(serverResponce == "0"){
                   //server erros nathnm meka display wenwa
                   iziToast.success({
                       title: 'OK Uesr Add Successfully...!',
                       position: 'topRight',
                       //message: 'Student Add Successfully...!',
                   });
                   refreshUserTable();
                   refreshUserForm();
                   resetUserForm()
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
       //uda errors tynwnm meka display wenwa
       iziToast.error({
           title: 'You Have Following Errors : '+ '<br>' + errors,
           position: 'topRight',
           //message: 'Not Successfully inserted \n' + serverResponce,
       });
}
}

const checkUpdate = () => {
    let update = "";

    if(user != null && olduser != null){
        if(user.employee_id != olduser.employee_id){
            update = update + "Employee No is changed \n" ;
        }
        if(user.username != olduser.username){
            update = update + "User name is changed \n" ;
        }
        if(user.password != olduser.password){
            update = update + "Password is changed \n" ;
        }
        if(user.email != olduser.email){
            update = update + "Email is changed \n" ;
        }
        if(user.roles.length != olduser.roles.length){
            update = update + "User Role is changes \n";
        }else {
            let avilableRoleCount = 0;
            for (let index in olduser.roles){
                for(let ind in user.roles){
                    if(olduser.roles[index]['id'] == user.roles[ind]['id']){
                        avilableRoleCount = parseInt(avilableRoleCount) + 1;
                        break;
                    }
                }
            }
            if (user.roles.length != avilableRoleCount){
                update = update + "User roles are changed..\n";
            }
        }
    }
    return update;
}

const btnUpdateMCU = () => {
    let errors = checktError()
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
                        let putresponce = httpServiceRequest("/user", "PUT", user);
                        if (putresponce == "0") {
                            //window.alert("Update Successfully...")
                            iziToast.success({
                                title: 'Update Successfully...!',
                            });
                            refreshUserTable()
                            refreshUserForm();
                            resetUserForm()
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

const resetUserForm = () => {
    cmbEmpNo.value = "";
    setDefauld(cmbEmpNo);
    txtUserName.value = "";
    setDefauld(txtUserName);
    pwd.value = "";
    setDefauld(pwd);
    rePwd.value = "";
    setDefauld(rePwd);
    txtEmail.value = "";
    setDefauld(txtEmail);
}

//create function for check object value
const checktError = () => {
    let errors = "";

    /*if (user.roles.length == 0) {
        errors = errors + "User roles not selected...\n";
    }*/

    if (user.employee_id == null) {
        setInvalid(cmbEmpNo);
        //txtEmpFullName.style.borderRight = '3px dotted red';
        //txtEmpFullName.style.borderBottom = '3px dotted red';
        errors = errors + "Employee name not Entered...  \n";
    } else {
    }

    if (user.username == null) {
        setInvalid(txtUserName);
        errors = errors + "User Name not Entered...  \n";
    } else {
    }

    if (user.password == null) {
        setInvalid(pwd);
        errors = errors + "Password not Entered...  \n";
    } else {
    }


    if (user.email == null) {
        setInvalid(txtEmail);
        errors = errors + "Email not Entered...  \n";
    } else {
    }

    if (user.roles.length == 0) {
        setInvalid(txtEmail);
        errors = errors + "User Role not Entered...  \n";
    } else {
    }

return errors;
  
}


function btnSubmitMC() {
    console.log(user);
}

const RefillUserForm = (use) => {


    user = JSON.parse(JSON.stringify(use));
    oldeuser = JSON.parse(JSON.stringify(use));

    cmbEmpNo.value = user.empno;
    txtUserName.value = user.username;


}

const buttonDisable = (submit, modify) => {

    if(submit && loggedUserPrivilege.insert){

        $("#btnAddUser").css('pointer-event', 'all');
        $("#btnAddUser").css('cursor', 'pointer');
        $("#btnAddUser").removeAttr('disabled');
    }else {
        $("#btnAddUser").css('pointer-event', 'all');
        $("#btnAddUser").css('cursor', 'not-allowed');
        $("#btnAddUser").attr('disabled','disabled');
    }

    if(modify && loggedUserPrivilege.update){
        btnUpdateUser.removeAttribute('disabled');
        $("#btnUpdateUser").css('pointer-event', 'all');
        $("#btnUpdateUser").css('cursor', 'pointer');

    }else{
        $("#btnUpdateUser").attr('disabled','disabled');
        $("#btnUpdateUser").css('pointer-event', 'all');
        $("#btnUpdateUser").css('cursor', 'not-allowed');

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

//create function for check password maching
const passwordCheck = () => {
 let password = pwd.value;
 let repassword = rePwd.value;


    if(password == repassword ){
        rePwd.style.border = "2px solid green";
        user.repassword = repassword;
    }else {
        rePwd.style.border = "2px solid red";
        user.repassword = null;
    }
}

const setTableColor = () => {
    for(let index in users){
        if(users[index]["status"]){
            //tblUser.children[1].children[index].style.backgroundColor = "green";
            tblUser.children[1].children[index].children[3].children[0].classList.add("active-cell-style");
        }else{
            //tblUser.children[1].children[index].style.backgroundColor = "red";
            tblUser.children[1].children[index].children[3].children[0].classList.add("deleted-cell-style");
        }
    }
}










window.addEventListener('load', loadUI);

//window eka load weddi watena function eka
function loadUI() {
    console.log("Browser onload");

    //get privilage for logged user by current module
    //loggedUserPrivilege = {select:true, insert:true, update:true, delete:true};
    loggedUserPrivilege = getServiceRequest("/privilage/bymodule/"+"MANAGE_PRIVILAGE");

    refreshPrivTable();
    refreshPrivilegeForm();


    $('[data-bs-toggle = "tooltip"]').tooltip();


}

const refreshPrivTable = () => {
    privileges = getServiceRequest("/privilage/findall")

    let displayPropertyList = ['role_id.name','module_id.name','sel','ins','upd','del' ];
    let displayDataList = ['object', 'object',getSelectPriv,getInsertPriv,getUpdatePriv,getDeletePriv];
    let statusColorList = [];

    fillDataTable (tblPrive, privileges, displayPropertyList, displayDataList, formRefill, rowDelete, rowView, true, true, statusColorList,loggedUserPrivilege);

    $('#tblPrive').dataTable();
}

const resetPrivilage = () => {
    cmbRoleName.value = ""
    setDefauld(cmbRoleName);

    cmbModuleName.value = ""
    setDefauld(cmbModuleName);

    selectAcep.checked = false;
    selLblAccepted.style.color = "black";
    selLblNotAccepted.style.color = "black";

    selectNotAcep.checked = false;
    selLblAccepted.style.color = "black";
    selLblNotAccepted.style.color = "black";

    insertAcep.checked = false;
    insLblAccepted.style.color = "black";
    insLblNotAccepted.style.color = "black";

    insertNotAcep.checked = false;
    insLblAccepted.style.color = "black";
    insLblNotAccepted.style.color = "black";


    updateAcep.checked = false;
    updLblAccepted.style.color = "black";
    updLblNotAccepted.style.color = "black";


    updateNotAcep.checked = false;
    updLblAccepted.style.color = "black";
    updLblNotAccepted.style.color = "black";


    deleteAcep.checked = false;
    delLblAccepted.style.color = "black";
    delLblNotAccepted.style.color = "black";


    deleteNotAcep.checked = false;
    delLblAccepted.style.color = "black";
    delLblNotAccepted.style.color = "black";


    boxSel.value = "";
    setDefauld(boxSel);

    boxIns.value = "";
    setDefauld(boxIns);

    boxUpd.value = "";
    setDefauld(boxUpd);

    boxDel.value = "";
    setDefauld(boxDel);


}

const getSelectPriv = (ob) => {
    let selectPriv = "<i class=\"fa-solid fa-square-xmark\" style='color: red; font-size: 40px'></i>";


    if(ob.sel){
        selectPriv = "<i class=\"fa-solid fa-square-check\" style='color: green; font-size: 40px'></i>";
    }

    return selectPriv;
}

const getInsertPriv = (ob) => {
    let insertPriv = "<i class=\"fa-solid fa-square-xmark\" style='color: red; font-size: 40px'></i>";

    if(ob.ins){
        insertPriv = "<i class=\"fa-solid fa-square-check\" style='color: green; font-size: 40px'></i>";
    }

    return insertPriv;
}

const getUpdatePriv = (ob) => {
    let updatePriv = "<i class=\"fa-solid fa-square-xmark\" style='color: red; font-size: 40px'></i>";

    if(ob.upd){
        updatePriv = "<i class=\"fa-solid fa-square-check\" style='color: green; font-size: 40px'></i>";
    }

    return updatePriv;
}

const getDeletePriv = (ob) => {
    let deletePriv = "<i class=\"fa-solid fa-square-xmark\" style='color: red; font-size: 40px'></i>";

    if(ob.del){
        deletePriv = "<i class=\"fa-solid fa-square-check\" style='color: green; font-size: 40px'></i>";
    }

    return deletePriv;
}

//function create for refresh form
const refreshPrivilegeForm = () => {

    privilege = new Object(); // me object ekata thama form eke siyalu field wala value tika collect kr ganne,, meka bucket ekak wage ara value tika bucket ekta da gnwa, eka pass krnwa back end ekta
    oldprivilege = null; //compare kraganna

    //data genna ganna
    roles = getServiceRequest("/role/getlist");
    fillSelectFeild(cmbRoleName, "Select Role", roles, 'name', '')
    cmbRoleName.style.border = "2px solid #ced4da";

    modules = getServiceRequest("/module/getlist");
    fillSelectFeild(cmbModuleName , "Select Module", modules, 'name','')
    cmbModuleName.style.border = "2px solid #ced4da";
    cmbModuleName.disable=true;


    selectAcep.checked = false;
    selectNotAcep.checked = false;


    insertAcep.checked = false;
    insertNotAcep.checked = false;



    updateAcep.checked = false;
    updateNotAcep.checked = false;



    deleteAcep.checked = false;
    deleteNotAcep.checked = false;



    buttonDisable(true, false);
}



function getModuleListByRole(){

    modulelists = getServiceRequest("/module/getModuleListByRole?id="+JSON.parse(cmbRoleName.value).id)
    fillSelectFeild (cmbModuleName, "Select Module", modulelists,'name','');



}

//create function for disable button using user module privilage
const buttonDisable = (submit, modify) => {

    //updateBtnPriv
    // addBtnPriv

    if(submit && loggedUserPrivilege.insert){

        $("#addBtnPriv").css('pointer-event', 'all');
        $("#addBtnPriv").css('cursor', 'pointer');
        $("#addBtnPriv").removeAttr('disabled');
    }else {
        $("#addBtnPriv").css('pointer-event', 'all');
        $("#addBtnPriv").css('cursor', 'not-allowed');
        $("#addBtnPriv").attr('disabled','disabled');
    }

    if(modify && loggedUserPrivilege.update){
        updateBtnPriv.removeAttribute('disabled');
        $("#updateBtnPriv").css('pointer-event', 'all');
        $("#updateBtnPriv").css('cursor', 'pointer');

    }else{
        $("#updateBtnPriv").attr('disabled','disabled');
        $("#updateBtnPriv").css('pointer-event', 'all');
        $("#updateBtnPriv").css('cursor', 'not-allowed');

    }
}


const checkError = () => {
    let errors = "";
    if (privilege.role_id == null) {
        setInvalid(cmbRoleName);
        cmbRoleName.style.border = '2px solid red';
        errors = errors + "Role is not Entered...  \n";
    } else {

    }

    if (privilege.module_id == null) {
        setInvalid(cmbModuleName);
        cmbModuleName.style.border = '2px solid red';
        errors = errors + "Module is not Entered...  \n";
    } else {

    }

    if (privilege.sel == null) {
        box.style.border = "2px solid red";

        errors = errors + "Select Privilege not Entered...  \n";
    } else {

    }

    if (privilege.ins == null) {
        box.style.border = "2px solid red";

        errors = errors + "Insert Privilege not Entered...  \n";
    } else {

    }

    if (privilege.upd == null) {
        box.style.border = "2px solid red";

        errors = errors + "Update Privilege not Entered...  \n";
    } else {

    }

    if (privilege.del == null) {
        box.style.border = "2px solid red";

        errors = errors + "Delete Privilege not Entered...  \n";
    } else {

    }
     return errors;
}

//creae function for submit privilage data

const btnAddMCPriv = () => {
    //submit krddi ena mg eka
    let submitMsg = 'Are you sure to add following Privilage....!' + '<br>' + '' + '<br>' +  'Role Name : ' + cmbRoleName.value
        + '<br>' + 'Module Name : ' + cmbModuleName.value ;
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
                    let serverResponce = httpServiceRequest("/privilage","POST",privilege);
                    if(serverResponce == "0"){
                        //server error ekak nathnm employeewa add wenwa
                        //console.log(employee);
                        iziToast.success({
                            title: 'OK Privilege Add Successfully...!',
                            position: 'topRight',
                            //message: 'Student Add Successfully...!',
                        });
                        refreshPrivTable();
                        refreshPrivilegeForm();
                        resetPrivilage();
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


const formRefill = (priv) => {
    privilege = getServiceRequest("privilage/getbyid?id=" + priv.id);
    oldprivilege = getServiceRequest("privilage/getbyid?id=" + priv.id);

    changeTab("form");

    //required
    fillSelectFeild(cmbRoleName, "Select Role", roles, 'name', privilege.role_id.name,true);
    cmbRoleName.style.border = "2px solid green";

    fillSelectFeild(cmbModuleName, "Select Module", modules, 'name', privilege.module_id.name,true);
    cmbModuleName.style.border = "2px solid green";

    if (priv.sel) {
        selectAcep.checked = true;
        lblAccepSelect.style.color = "green";
        lblNotAccepSelect.style = "#ced4da";
    } else {
        selectNotAcep.checked = true;
        lblNotAccepSelect.style.color = "green";
        lblAccepSelect.style.color = "#ced4da";
    }
    boxSel.style.border = "2px solid green";

    if (priv.ins) {
        insertAcep.checked = true;
        lblAccepInsert.style.color = "green";
        lblNotAccepInsert.style.color = "#ced4da";
    } else {
        insertNotAcep.checked = true;
        lblNotAccepInsert.style.color = "green";
        lblAccepInsert.style.color = "#ced4da";
    }
    boxIns.style.border = "2px solid green";


    if (priv.upd) {
        updateAcep.checked = true;
        lblAccepUpdate.style.color = "green";
        lblNotAccepUpdate.style.color =  "#ced4da";
    } else {
        updateNotAcep.checked = true;
        lblNotAccepUpdate.style.color =  "green";
        lblAccepUpdate.style.color =  "#ced4da";
    }
    boxUpd.style.border = "2px solid green";

    if (priv.del) {
        deleteAcep.checked = true;
        lblAccepDelete.style.color = "green";
        lblNotAccepDelete.style.color = "#ced4da";
    } else {
        deleteNotAcep.checked = true;
        lblNotAccepDelete.style.color = "green";
        lblAccepDelete.style.color = "#ced4da";
    }
    boxDel.style.border = "2px solid green";


   // changeUiColor(setValid);
   buttonDisable(false, true);
}


const checkUpdate = () => {
    let updates = "" ;

    if(privilege != null && oldprivilege !=null){
        if(privilege.role_id.name != oldprivilege.role_id.name){
            updates = updates + "Role name is changed \n" + oldprivilege.role_id.name + "into" + privilege.role_id.name + "\n";
        }
        if(privilege.module_id.name != oldprivilege.module_id.name){
            updates = updates + "Module is changed \n" + oldprivilege.module_id.name + "into" + privilege.module_id.name + "\n";
        }
        if(privilege.sel != oldprivilege.sel){
            updates = updates + "Select Privilege is changed \n" + oldprivilege.sel + "into" + privilege.sel + "\n";
        }
        if(privilege.ins != oldprivilege.ins){
            updates = updates + "Insert Privilege is changed \n" + oldprivilege.ins + "into" + privilege.ins + "\n";
        }
        if(privilege.upd != oldprivilege.upd){
            updates = updates + "Update Privilege is changed \n" + oldprivilege.upd + "into" + privilege.upd + "\n";
        }
        if(privilege.del != oldprivilege.del){
            updates = updates + "Delete Privilege is changed \n" + oldprivilege.del + "into" + privilege.del + "\n";
        }

    }

    return updates;
}

const btnUpdateMCPriv = () => {
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
                        let putresponce = httpServiceRequest("/privilage", "PUT", privilege);
                        if (putresponce == "0") {
                            //window.alert("Update Successfully...")
                            iziToast.success({
                                title: 'Update Successfully...!',
                                position:'topRight',
                            });
                            refreshPrivTable()
                          refreshPrivilegeForm()
                           resetPrivilage()
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
    } else {
        //error tynwnm meka execute wenwa
        iziToast.error({
            title: 'Error Not Successfully Update...' + errors,
            position: 'topRight',
            //message: 'Not Successfully inserted \n' + serverResponce,
        });

    }

}


const rowDelete = (privob) => {

    let deleteMsg = "Are you sure to Delete following Privilages...? " +
        "Role Name : " + privob.role_id.name;

    iziToast.info({
        messageColor: 'black',
        message: deleteMsg,
        position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
        progressBarColor: 'rgb(0, 255, 184)',
        buttons: [
            ['<button style="color: black"><b>Ok</b></button>', function (instance,toast) {
                instance.hide({ transitionOut: 'fadeOutUp' }, toast);
                let responce = httpServiceRequest("/privilage", "DELETE", privob);
                if (responce == "0") {
                    // window.alert("Student Delete Successfully.......!");
                    iziToast.success({
                        title: 'OK Privilege Delete Successfully...!',
                        position: 'topRight',
                        //message: 'Student Add Successfully...!',
                    });
                    refreshPrivTable();
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

const rowView = () => {

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


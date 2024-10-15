window.addEventListener('load', loadUI);

//window eka load weddi watena function eka
function loadUI() {
    console.log("Browser onload");


   loggedUserPrivilege = getServiceRequest("/privilage/bymodule/"+"LECTURE_HALL_MANAGEMENT" );

    refreshLecTable();
    refreshLecForm();


    $('[data-bs-toggle = "tooltip"]').tooltip();
}


const refreshLecTable = () => {

    lecturehalls = getServiceRequest("/lecturehall/findall")

    //properties list eka
    let displayPropertyList = ['lec_hall_type_id.name','code','location','max_capacity','lec_hall_status_id.name'];
    let displayDataList = ['object','text','text','text','object'];
    let statusColorList = [{name:"Destroyed", colorClass:"deleted-cell-style",buttondisabled:true},{name:"Avilable", colorClass:"active-cell-style",buttondisabled:false},{name:"Not Avilable", colorClass:"temporary-unavilable-cell-style",buttondisabled:false}];

    fillDataTableNew(tblLecHall, lecturehalls, displayPropertyList, displayDataList, true, 'editob', btnEdit,btnDelete,btnView);



    $('#tblLecHall').dataTable();


}

const resetStuForm = () => {

    txtLocation.value = "";
    setDefauld(txtLocation);

    txtCode.value = "";
    setDefauld(txtCode);

    txtNoOfCapacity.value = "";
    setDefauld(txtNoOfCapacity);

    txtMaxCapacity.value = "";
    setDefauld(txtMaxCapacity);

    radlecHall.checked = false;
    setDefauld(radlecHall);

    radComLab.checked = false;
    setDefauld(radComLab);

    lblLecHall.checked = false;
    setDefauld(lblLecHall);

    lblComLab.checked = false;
    setDefauld(lblComLab);


    box.value = "";
    setDefauld(box);


}

function formRefill(lec) {

    lecturehall = getServiceRequest("lecturehall/getbyid?id=" + window[lec]['id']);
    oldlecturehall = getServiceRequest("lecturehall/getbyid?id=" + window[lec]['id']);

    changeTab("form");

    if (lecturehall.lec_hall_type_id == "Lecture Hall") {
        radlecHall.checked = true;
    } else {
        radComLab.checked = true;
    }

    txtLocation.value = lecturehall.location;
    setValid(txtLocation);
    txtLocation.style.border = "2px solid green";

    txtCode.value = lecturehall.code;
    setValid(txtCode);
    txtCode.style.border = "2px solid green";

    txtNoOfCapacity.value = lecturehall.no_of_seat;
    setValid(txtNoOfCapacity);
    txtNoOfCapacity.style.border = "2px solid green";

    txtMaxCapacity.value = lecturehall.max_capacity;
    setValid(txtMaxCapacity);
    txtMaxCapacity.style.border = "2px solid green";

    innerRefreshForm();

    buttonDisable(false,true);


}

function rowDelete(lechallob) {

    if(window[lechallob].lec_hall_status_id.name == "Not Avilable") {
        iziToast.error({
            title: 'aaaaa \n',
            position: 'topRight',
        });
    } else {

        let deleteMsg = "Are you sure to Delete following Hall...? " +
            "Hall : " + window[lechallob].code;

        iziToast.info({
            messageColor: 'black',
            message: deleteMsg,
            position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
            progressBarColor: 'rgb(0, 255, 184)',
            buttons: [
                ['<button style="color: black"><b>Ok</b></button>', function (instance,toast) {
                    instance.hide({ transitionOut: 'fadeOutUp' }, toast);
                    let responce = httpServiceRequest("/lecturehall", "DELETE", window[lechallob]);
                    if (responce == "0") {
                        // window.alert("Student Delete Successfully.......!");
                        iziToast.success({
                            title: 'OK Course Delete Successfully...!',
                            position: 'topRight',
                            //message: 'Student Add Successfully...!',
                        });
                        refreshLecTable();
                        refreshLecForm();
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


const refreshLecForm = () => {
        lecturehall = new Object();
        oldlecturehall = null;


        dteAddedDate.value = getCurrentDate("date" , "");


        lechallstatus = getServiceRequest("/lechallstatus/getlist");
        fillSelectFeild(cmbLectureHallStatus, "Select Status", lechallstatus, 'name', 'Avilable',true);
        lecturehall.lec_hall_status_id = JSON.parse(cmbLectureHallStatus.value);
        cmbLectureHallStatus.style.border = "2px solid green";


       lecturehall.lecHall_has_featureList = new Array();

        innerRefreshForm();


        buttonDisable(true,false);

}

const checkError = () => {
    let errors = "";
        // if (lecturehall.lec_hall_type_id == null) {
        //     errors = errors + "Type is not Entered...  \n";
        // } else {
        // }

       if (lecturehall.lec_hall_type_id == null) {

           errors = errors + "Type is not Entered...  \n";
       } else {

       }


        if(lecturehall.location == null){
            setInvalid(txtLocation);
            txtLocation.style.border = '2px solid red';
            errors = errors + "Location is not Entered...  \n";
        }else {

        }

        if(lecturehall.code == null){
            setInvalid(txtCode);
            txtCode.style.border = '2px solid red';
            errors = errors + "Code is not Entered...  \n";
        }else {

        }

       if(lecturehall.no_of_seat == null){
            setInvalid(txtNoOfCapacity);
            txtNoOfCapacity.style.border = '2px solid red';
            errors = errors + "No of Seat is not Entered...  \n";
        }else {

       }

        if(lecturehall.max_capacity == null){
            setInvalid(txtMaxCapacity);
            txtMaxCapacity.style.border = '2px solid red';
            errors = errors + "Maximum Capacity is not Entered...  \n";
        }else {

        }

        return errors;
    }

const checkUpdate = () => {
    let update = "";

    if(lecturehall != null && oldlecturehall != null){
        if(lecturehall.lec_hall_type_id != oldlecturehall.lec_hall_type_id){
            update = update + "Hall type is changed \n" ;
        }
        if(lecturehall.location != oldlecturehall.location){
            update = update + "Hall Location is changed \n" ;
        }
        if(lecturehall.code != oldlecturehall.code){
            update = update + "Hall Code is changed \n" ;
        }
        if(lecturehall.no_of_seat != oldlecturehall.no_of_seat){
            update = update + "No of seat is changed \n" ;
        }
        if(lecturehall.max_capacity != oldlecturehall.max_capacity){
            update = update + "Maximum No of seat is changed \n" ;
        }
    }
    return update;
}

const btnAddMCL = () => {

    let lectypeList = getServiceRequest("/lechalltype/getlist")

    lecturehall.lec_hall_type_id = lectypeList[lecturehall.lec_hall_type_id];

        let submitMsg = "Are you sure to Add this Feature ";
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
                    let serverResponce = httpServiceRequest("/lecturehall","POST",lecturehall);
                    //server errors tynwda kiyla check knrwa
                    if(serverResponce == "0"){
                        //server erros nathnm meka display wenwa
                        iziToast.success({
                            title: 'OK Feature Add Successfully...!',
                            position: 'topCenter',
                            //message: 'Student Add Successfully...!',
                        });
                        refreshLecTable();
                        refreshLecForm();
                        resetStuForm();
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
                        let putresponce = httpServiceRequest("/lecturehall", "PUT", lecturehall);
                        if (putresponce == "0") {
                            //window.alert("Update Successfully...")
                            iziToast.success({
                                title: 'Update Successfully...!',
                            });
                            refreshLecTable();
                            refreshLecForm();
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
    }else{
        iziToast.error({
            title: 'Error Not Successfully Update...' + errors,
            position: 'topRight',
            //message: 'Not Successfully inserted \n' + serverResponce,
        });
    }
}

const innerRefreshForm = () => {
            lechallfeatures = new Object();
            oldlechallfeatures = null;

        features = getServiceRequest("/lecturehallfeatures/getlist");
        fillSelectFeild(cmbFeatures, "Select Features", features, 'name', '');


        let displayPropertyList = ['lecturehall_features_id.name','count'];
        let displayDataList = ['object','text'];
        let statusColorList = [];

        fillDataTable(tblLecHallFeat,lecturehall.lecHall_has_featureList,displayPropertyList,displayDataList,
            modifyInner,deleteInnerRow,viewInnerRow,true,false,statusColorList,loggedUserPrivilege);


}

function modifyInner(lechallfeature,innerindex) {

    innerRowIndex = innerindex;

    lechallfeatures = JSON.parse(JSON.stringify(lechallfeature));
    oldlechallfeatures = JSON.parse(JSON.stringify(lechallfeature));

    changeTab("form");

    fillSelectFeild(cmbFeatures, "Select Features", features, 'name', lechallfeatures.lecturehall_features_id.name);
    cmbFeatures.style.border = "2px solid green";
    cmbFeatures.disabled = true;


    txtCount.value = lechallfeatures.count;
    setValid(txtCount);
    txtCount.style.border = "2px solid green";


}

function deleteInnerRow(lechallfeature,innerindex) {

    let deleteMsg = "Are you sure to Delete following Feature...? " +
        "Feature : " + lechallfeature.lecturehall_features_id.name;

    iziToast.info({
        messageColor: 'black',
        message: deleteMsg,
        position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
        progressBarColor: 'rgb(0, 255, 184)',
        buttons: [
            ['<button style="color: black"><b>Ok</b></button>', function (instance,toast) {
                instance.hide({ transitionOut: 'fadeOutUp' }, toast);

                lecturehall.lecHall_has_featureList.splice(innerindex,1);
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

    if(lechallfeatures.lecturehall_features_id == null){
        setInvalid(cmbFeatures);
        cmbFeatures.style.border = '2px solid red';
        errors = errors + "Feature is not Entered...  \n";
    }else {

    }

    if(lechallfeatures.count == null){
        setInvalid(txtCount);
        txtCount.style.border = '2px solid red';
        errors = errors + "Count is not Entered...  \n";
    }else {

    }

        return errors;

}

function checkUpdateInner(){

    let update = "";

    if(lechallfeatures != null && oldlechallfeatures != null){

        if(lechallfeatures.count != oldlechallfeatures.count){
            update = update + "Feature Count is changed \n" ;
        }

    }
    return update;
}


function btnAddInnFormMC(){

    let submitMsg = "Are you sure to Add this Feature ";
    let errors = checkErrorInner();
    if(errors == ""){
        iziToast.info({
            messageColor: 'black',
            message: "Are you sure to add this feature...?",
            position: 'topCenter', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
            progressBarColor: 'rgb(0, 255, 184)',
            buttons: [
                ['<button style="color: black"><b>Ok</b></button>', function (instance,toast) {
                    instance.hide({ transitionOut: 'fadeOutUp' }, toast);

                    //list ekakata data push karanwa
                    lecturehall.lecHall_has_featureList.push(lechallfeatures);
                    innerRefreshForm();

                        iziToast.success({
                            title: 'OK Feature Add Successfully...!',
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
                title: 'Are Your sure to update this fiels :' + update,
                position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
                progressBarColor: 'rgb(0, 255, 184)',
                buttons: [
                    ['<button style="color: black"><b>Ok</b></button>', function (instance,toast) {
                        instance.hide({ transitionOut: 'fadeOutUp' }, toast);

                        lecturehall.lecHall_has_featureList[innerRowIndex] = lechallfeatures;
                        innerRefreshForm();

                        iziToast.success({
                            title: 'OK Feature Update Successfully...!',
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
//back end eka implement krna services wlin data tika UIt wlta ganna
function getServiceRequest(url) {
    var returndata;
    //ajax call
    $.ajax(url,
        {
            async: false,
            dataType: 'json', // type of response data
            timeout: 500,     // timeout milliseconds (Url eka request krddi error ekak thibboth data ene nathi unoth nthra wenwa)
            success: function (data, status, xhr) {   // success callback function
                $('#err').append('<br>');
                $('#err').append('Responce : <br>' + url + " --><br>" + JSON.stringify(data));
                console.log("success " , status)
                if(status == "success"){
                    //alert("success")
                    returndata = data;
                }
            },
            error: function (jqXhr, textStatus, errorMessage) { // error callback
                $('#err').append('Error: \n' + jqXhr);
                returndata = errorMessage;
            }
        });
    return returndata;
}

function httpServiceRequest(url,method, postdata) {
    var returndata;
    $.ajax(url, {
        async: false,
        // dataType: 'json', // type of response data
        type: method,  // http method
        data: JSON.stringify(postdata),// data to submit
        timeout: 500, // timeout milliseconds
        contentType:"application/json; charset=utf-8",
        success: function (data, status, xhr) {
            $('#err').append('<br>');
            $('#err').append('Responce : <br>' + url + " --><br>" + JSON.stringify(data));
            returndata = data;
        },
        error: function (jqXhr, textStatus, errorMessage) {
            $('#err').append('Error: \n' + jqXhr);
            returndata = errorMessage;
        }
    });
    return returndata;
}


//create function for remove style
const clearTableStyle = (tableid) => {
    for (let index = 0; index < tableEmployeeD.children[1].children.length; index++) {
        tableid.children[1].children[index].style.backgroundColor = "white";

    }
}





//field validator ok
const textFieldValidator = (feildid, pattern, object, property, oldemployee) => {


    let ob = window[object];
    let oldob = window[oldemployee];

    if (feildid.value != "") {
        const namepattern = new RegExp(pattern);

        if (namepattern.test(feildid.value)) {
            ob[property] = feildid.value;
            //fieldid.style.backgroundColor = 'green';
            if (oldob != null && ob[property] != oldob[property]) {
                //valid updated eke style ek
                setUpdate(feildid);
                feildid.style.border = '2px solid orange';
                
            } else {
                setValid(feildid);
                feildid.style.border = '2px solid green';
            }
        } else {
            ob[property] = null;
            //fieldid.style.backgroundColor = 'red';
            setInvalid(feildid);
            feildid.style.border = '2px solid red';
        }
    } else {
        ob[property] = null;
        if (feildid.required) {
            //fieldid.style.backgroundColor = 'red';
            setInvalid(feildid);
            feildid.style.border = '2px solid red';
        } else {
            //fieldid.style.backgroundColor = 'white';
            setDefauld(feildid);
        }

    }
}


//getCurrent date function for get current date
const getCurrentDate = (format,givendate) => {

    //set auto load value
    let today;

    if (givendate != "") {
        //given date object ekak
        today = new Date(givendate);
    } else {
        //current date bject ekak
        today = new Date();
    }

    let hour = today.getHours() ; //0-11
    let minutes = today.getMinutes(); //1-31

    if (hour < 10) hour = "0" + hour;
    if (minutes < 10) minutes = "0" + minutes;

    //value = "2022-08-23";
    let currentDate = today.getFullYear() + getDateAndMonth(today,"monthdate");
    let currentMonth = today.getFullYear() + "-" + getDateAndMonth(today,"month");
    let currentYear = today.getFullYear();
    let currentTime = hour +":"+minutes;

    if(format == "date") return currentDate;
    if(format == "month") return currentMonth;
    if(format == "year") return currentYear;
    if(format == "time") return currentTime;
}

//illana format ekata anuwa date value eka return krnwa
const getDateAndMonth = (dateob,format) => {

    let month = dateob.getMonth() + 1; //0-11
    let date = dateob.getDate(); //1-31

   if (month < 10) month = "0" + month;
    if (date < 10) date = "0" + date;

   if(format == "monthdate") return "-"+month+"-"+date;
   if(format == "month") return month;
   if(format == "date") return date;
}



//radio validator
const radioFieldValidator = (feildid, pattern, object, property, oldobject, lblid,ldlid2 ) => {
    let ob = window[object];
    let oldob = window[oldobject];

    if (feildid.checked == true) {
        ob[property] = feildid.value;
        //lblid.style.color = 'green';
        if (oldob != null && ob[property] != oldob[property]){
            lblid.style.color = 'orange';
            ldlid2.style.color = "black";
        } else {
            lblid.style.color = 'green';
            ldlid2.style.color = "black";
        }
       // boxid.style.border = '2px solid green';

    } else {
        ob[property] = null;
        //lblid.style.color = 'red';
      //  boxid.style.border = '2px solid red';

    }
}



const dateFieldValidator = (feildid, pattern, object, property, oldobject) => {


    let ob = window[object];
    let oldob = window[oldobject];

    if (feildid.value != "") {

            ob[property] = feildid.value;
            //fieldid.style.backgroundColor = 'green';
            if (oldob != null && ob[property] != oldob[property]) {
                //valid updated eke style ek
                setUpdate(feildid);
                feildid.style.border = '2px solid orange';

            } else {
                setValid(feildid);
                feildid.style.border = '2px solid green';
            }

    } else {
        ob[property] = null;
        if (feildid.required) {
            //fieldid.style.backgroundColor = 'red';
            setInvalid(feildid);
            feildid.style.border = '2px solid red';
        } else {
            //fieldid.style.backgroundColor = 'white';
            setDefauld(feildid);
        }

    }
}

const timeFieldValidator = (feildid, pattern, object, property, oldobject) => {


    let ob = window[object];
    let oldob = window[oldobject];

    if (feildid.value != "") {

        ob[property] = feildid.value;
        //fieldid.style.backgroundColor = 'green';
        if (oldob != null && ob[property] != oldob[property]) {
            //valid updated eke style ek
            setUpdate(feildid);
            feildid.style.border = '2px solid orange';

        } else {
            setValid(feildid);
            feildid.style.border = '2px solid green';
        }

    } else {
        ob[property] = null;
        if (feildid.required) {
            //fieldid.style.backgroundColor = 'red';
            setInvalid(feildid);
            feildid.style.border = '2px solid red';
        } else {
            //fieldid.style.backgroundColor = 'white';
            setDefauld(feildid);
        }

    }
}


const getCurrentDate2 = (format,givendate) => {
    let nowDate = new Date(givendate);
    // retrive 0 to 11
    let month = nowDate.getMonth() + 1;//return 0jan-11Dec
//retrive 1-31
    let date = nowDate.getDate();//return 1-31
//year
    let year = nowDate.getFullYear();

    if(month < 10){
        month = "0"+ month;
    }
    if(date < 10){
        date = "0" + date;
    }


    return year + "-" + month + "-" + date ;
}

//select validator
const selectBinder = (feildid,pattern, object, property,oldobject) => {

    let ob = window[object];
    let oldob = window[oldobject];

    ob[property] = JSON.parse(feildid.value);
    if (oldob != null && ob[property]['id'] != oldob[property]['id']) {
        setUpdate(feildid);
        feildid.style.border = '2px solid orange';
    } else {
        setValid(feildid);
        feildid.style.border = '2px solid green';
    }


    /*if (feildid.value != "") {

        ob[property] = JSON.parse(feildid.value);
       //feildid.style.border = '2px solid green';
       setValid(feildid);
    } else {
        ob[property] = null;
        //feildid.style.border = '2px solid red';
        setInvalid(feildid);
    }*/
}

//select validator
const selectBinder2 = (feildid,pattern, object, property,oldobject) => {

    let ob = window[object];
    let oldob = window[oldobject];

    ob[property] = JSON.parse(feildid.value);
    if (oldob != null && ob[property]['id'] != oldob[property]['id']) {
      //  setUpdate(feildid);

        //feildid.style.border = '2px solid orange';
        $(".select2").css("border","2px solid orange");
        $(".select2").addClass("is-updated");
        $(".select2").addClass("is-valid");
        $(".select2").removeClass("is-invalid");
    } else {
        setValid(feildid);
       // feildid.style.border = '2px solid green';
        $(".select2").css("border","2px solid green");
        $(".select2").addClass("is-valid");
        $(".select2").removeClass("is-updated");
        $(".select2").removeClass("is-invalid");
    }


    /*if (feildid.value != "") {

        ob[property] = JSON.parse(feildid.value);
       //feildid.style.border = '2px solid green';
       setValid(feildid);
    } else {
        ob[property] = null;
        //feildid.style.border = '2px solid red';
        setInvalid(feildid);
    }*/
}


const fillSelectFeild = (feildid, displayMessage, dataList, displayProperty, selectValue, visibility = false) => {
    feildid.innerHTML = ";"

    if(displayMessage != ""){
        optionPlaceholder = document.createElement('option');
        optionPlaceholder.value = "";
        optionPlaceholder.selected = true;
        optionPlaceholder.disabled = true;
        optionPlaceholder.innerText = displayMessage;
        feildid.appendChild(optionPlaceholder);
    }




    for (index in dataList) {
        optionValues = document.createElement('option');
        optionValues.value = JSON.stringify(dataList[index]);
        //optionValues.innerText = getDataFromList(dataList, displayPropertyList ) =====> Data list ekata property list eka use krla data pass krnwa
        optionValues.innerText = getDataFromObject(dataList[index],displayProperty);
        if (getDataFromObject(dataList[index],displayProperty) == selectValue) {
            optionValues.selected = true;
            setValid(feildid);
            //feildid.style.borderBottom = "2px solid green";
        }
        feildid.appendChild(optionValues);
    }

    if(visibility)
    feildid.disabled = true; 
    else
    feildid.disabled = false;
}


const fillSelectFeild2 = (feildid, displayMessage, dataList, displayProperty, displayProperty2,selectValue, visibility = false) => {
    feildid.innerHTML = "";

if(displayMessage!= ""){
    optionPlaceholder = document.createElement('option');
    optionPlaceholder.value = "";
    optionPlaceholder.selected = true;
    optionPlaceholder.disabled = true;
    optionPlaceholder.innerText = displayMessage;
    feildid.appendChild(optionPlaceholder);
}

    for (index in dataList) {
        optionValues = document.createElement('option');
        optionValues.value = JSON.stringify(dataList[index]);
        //optionValues.innerText = getDataFromList(dataList, displayPropertyList ) =====> Data list ekata property list eka use krla data pass krnwa
        optionValues.innerText = dataList[index][displayProperty] + "==>" + dataList[index][displayProperty2];
        if (dataList[index][displayProperty] == selectValue) {
            optionValues.selected = true;
            setValid(feildid);
            //feildid.style.borderBottom = "2px solid green";
        }
        feildid.appendChild(optionValues);
    }

    if(visibility)
    feildid.disabled = true; 
    else
    feildid.disabled = false;
}

const fillSelectFeild3 = (feildid, displayMessage, dataList, displayProperty, displayProperty2, displayProperty21) => {
    optionPlaceholder = document.createElement('option');
    optionPlaceholder.value = "";
    optionPlaceholder.selected = true;
    optionPlaceholder.disabled = true;
    optionPlaceholder.innerText = displayMessage;
    feildid.appendChild(optionPlaceholder);


    for (index in dataList) {
        optionValues = document.createElement('option');
        optionValues.value = JSON.stringify(dataList[index]);
        //optionValues.innerText = getDataFromList(dataList, displayPropertyList ) =====> Data list ekata property list eka use krla data pass krnwa
        optionValues.innerText = dataList[index][displayProperty2][displayProperty21] + " " + dataList[index][displayProperty];
        feildid.appendChild(optionValues);
    }
    /*
    if(visibility)
    feildid.disabled = true; 
    else
    feildid.disabled = false;*/
}


// use to fill data into table using given parameters
//fillDataTable(tableid , datalist , required_display_prperty_list , data_type_List_for_required_display_prperty_list ,
//  modify_button_onclick_event_handler_function_name, delete_button_onclick_event_handler_function_name ,
//  eview_button_onclick_event_handler_function_name , button_cell_visibility , status_cel_Avalability ,status_cel_Colorlist )
const fillDataTable = (tableid, dataList, propertyList, displayDT,
                       modifyFunction, deleteFunction, viewFunction,
                       buttonVisibility = true,statusisibility = true, statusColorlist,useprivilege) => {

    tbody = tableid.children[1];
    //table eke body eka empty kala
    tbody.innerHTML = "";

    for (index in dataList) {

        //create tr node
        tr = document.createElement("tr");
        let deleteButtonVisibility = false;
        // create td element
        tdind = document.createElement("td");
        //pasrtInt = String value eka Integer wlta pass krnwa
        tdind.innerText = parseInt(index) + 1;
        tr.appendChild(tdind);

        for (pro in propertyList) {
            // create td element
            td = document.createElement("td");
            let data = dataList[index][propertyList[pro]];
           // console.log(propertyList[pro]);
           // console.log(displayDT[pro]);

            if (displayDT[pro] == 'text') {
                if (data == null) {
                    td.innerText = '-';
                } else {
                    td.innerText = data;
                }
            } else if (displayDT[pro] == 'object') {
                //create paragraph element
                p = document.createElement("p")
                p.classList.add("para");
                let paraData = getDataFromObject(dataList[index], propertyList[pro]);

                if(statusisibility){ // check status cell availability
                    // if exist
                    if(statusColorlist.length > 0){ // check color list length
                        for(let ind in statusColorlist){
                            if(paraData == statusColorlist[ind]['name']){
                               // p.style.backgroundColor = statusColorlist[ind]['colorClass'];
                                p.classList.add(statusColorlist[ind]['colorClass']);

                                deleteButtonVisibility = statusColorlist[ind]['buttondisabled'];
                            }
                        }
                    }
                }
                p.innerText = paraData;
                td.appendChild(p);

            } else if (displayDT[pro] == 'yearbydate') {
                if (data == null) {
                    td.innerText = '-';
                } else {
                    td.innerText = new Date(data).getFullYear();
                }
            } else if (displayDT[pro] == 'img') {
                //create img node
                let img = document.createElement('img');
                if (data == null) {
                    img.src = 'Libraries/images/sort_asc.png';
                } else {
                    img.src = data;
                }
                td.appendChild(img);
            } else {
                let para = document.createElement("p");
                let paradata = displayDT[pro](dataList[index]);
                //td.innerText = displayDT[pro](dataList[index]);
                para.innerHTML = paradata;
                td.appendChild(para);
            }


            tr.appendChild(td);
        }



        //create td for add modify button
        tdbtn = document.createElement("td");
        tdbtn.classList.add('modifycol');

        //create td for add modify button
        //buton with bs class
        btnEdit = document.createElement("button");
        btnEdit.classList.add('btn-sm');
        btnEdit.classList.add('btn-outline');
        btnEdit.style.pointerEvents = "all";
        btnEdit.classList.add('btnStyle');
        btnEdit.classList.add('btnedit');
        btnEdit.classList.add('btnedit:hover');
        btnEdit.onclick = function () {
            //alert("edit");
            let indx = this.parentNode.parentNode.firstChild.innerHTML;

            modifyFunction(dataList[parseInt(indx) - 1], parseInt(indx) - 1);
        }

        if(!useprivilege.update){
            btnEdit.disabled = true;
            btnEdit.style.cursor='not-allowed';
        }

        btnDelete = document.createElement("button");
        btnDelete.classList.add('btn-sm');
        btnDelete.style.pointerEvents = "all";
        btnDelete.classList.add('btn-outline');
        btnDelete.classList.add('btnStyle');
        btnDelete.classList.add('btndelete');
        btnDelete.classList.add('btndelete:hover');
        //buton with bs margin
        btnDelete.classList.add('ms-1');
        btnDelete.classList.add('me-1');

        if(deleteButtonVisibility){
            btnDelete.disabled = true;

        }

        btnDelete.onclick = function () {
            //alert("delete");
            let indx = this.parentNode.parentNode.firstChild.innerHTML;

            deleteFunction(dataList[parseInt(indx) - 1], parseInt(indx) - 1);
        }

        if(!useprivilege.delete){
            btnDelete.disabled = true;
            btnDelete.style.cursor='not-allowed';
        }


        btnView = document.createElement("button");
        btnView.classList.add('btn-sm');
        btnView.classList.add('btn-outline');
        btnView.classList.add('btnStyle');
        btnView.classList.add('btnview');
        btnView.classList.add('btnview:hover');
        btnView.onclick = function () {
            //alert("view");
            let indx = this.parentNode.parentNode.firstChild.innerHTML;

            viewFunction(dataList[parseInt(indx) - 1], parseInt(indx) - 1);
        }

        //icon eka ==> btnEdit.innerHTML = "<i class='fas fa-edit'></i>Edit";
        btnEdit.innerHTML = "<i class='fas fa-edit'></i>";
        //btnDelete.innerHTML = "<i class='fa-solid fa-trash-can'></i>Delete";
        btnDelete.innerHTML = "<i class='fas fa-trash-can'></i>";
        //btnView.innerHTML = "<i class='fa-solid fa-eye'></i>View";
        btnView.innerHTML = "<i class='fa-solid fa-eye'></i>";

        tdbtn.appendChild(btnEdit);
        tdbtn.appendChild(btnDelete);
        tdbtn.appendChild(btnView);

        if (buttonVisibility){
            tr.appendChild(tdbtn);
/*
            if(statusisibility){ // check status cell availability
                // if exist
                if(statusColorlist.length > 0){ // check color list length
                    for(let ind in statusColorlist){
                        if(statusColorlist[ind]['buttondisabled'] && statusColorlist[ind]['name'] == "Deleted"){

                                tr.lastChild.children[1].style.cursor='not-allowed';
                                tr.lastChild.children[1].disabled = true;

                        }
                    }
                }
            }*/

        }

        tbody.appendChild(tr);
    }
}





// use to fill data into table using given parameters
//fillDataTable(tableid , datalist , required_display_prperty_list , data_type_List_for_required_display_prperty_list ,
//  modify_button_onclick_event_handler_function_name, delete_button_onclick_event_handler_function_name ,
//  eview_button_onclick_event_handler_function_name , button_cell_visibility , status_cel_Avalability ,status_cel_Colorlist )
const fillDataTableNew = (tableid, dataList, propertyList, displayDT,buttonVisibility = true ,ob,
                                                    btnEdite, btnDelete,btnView) => {

    tbody = tableid.children[1];
    //table eke body eka empty kala
    tbody.innerHTML = "";

    for (index in dataList) {

        //create tr node
        tr = document.createElement("tr");


        tdradio = document.createElement("td");
        radioinput = document.createElement("input");
        radioinput.type = "radio";
        radioinput.id = parseInt(index);
        radioinput.name = "tabledata";
        radioinput.onchange = function () {
            if(this.checked){
                window[ob] = dataList[parseInt(this.id)];
                btnEdite.disabled  = false;
                btnDelete.disabled  = false;
                btnView.disabled  = false;
            }
        }
        tdradio.appendChild(radioinput);
        tr.appendChild(tdradio);


        // create td element
        tdind = document.createElement("td");
        //pasrtInt = String value eka Integer wlta pass krnwa
        tdind.innerText = parseInt(index) + 1;
        tr.appendChild(tdind);



        for (pro in propertyList) {
            // create td element
            td = document.createElement("td");
            let data = dataList[index][propertyList[pro]];
            // console.log(propertyList[pro]);
            // console.log(displayDT[pro]);

            if (displayDT[pro] == 'text') {
                if (data == null) {
                    td.innerText = '-';
                } else {
                    td.innerText = data;
                }
            } else if (displayDT[pro] == 'object') {
                //create paragraph element
                p = document.createElement("p")
                p.classList.add("para");
                let paraData = getDataFromObject(dataList[index], propertyList[pro]);

                p.innerText = paraData;
                td.appendChild(p);

            } else if (displayDT[pro] == 'yearbydate') {
                if (data == null) {
                    td.innerText = '-';
                } else {
                    td.innerText = new Date(data).getFullYear();
                }
            } else if (displayDT[pro] == 'img') {
                //create img node
                let img = document.createElement('img');
                if (data == null) {
                    img.src = 'Libraries/images/sort_asc.png';
                } else {
                    img.src = data;
                }
                td.appendChild(img);
            } else {
                let para = document.createElement("p");
                let paradata = displayDT[pro](dataList[index]);
                //td.innerText = displayDT[pro](dataList[index]);
                para.innerHTML = paradata;
                td.appendChild(para);
            }


            tr.appendChild(td);
        }


        tbody.appendChild(tr);
    }
}


const fillDataTableExamBatch = (tableid, dataList, propertyList, displayDT) => {

    tbody = tableid.children[1];
    //table eke body eka empty kala
    tbody.innerHTML = "";

    for (index in dataList) {

        //create tr node
        tr = document.createElement("tr");

        // create td element
        tdind = document.createElement("td");
        //pasrtInt = String value eka Integer wlta pass krnwa
        tdind.innerText = parseInt(index) + 1;
        tr.appendChild(tdind);

        for (pro in propertyList) {
            // create td element
            td = document.createElement("td");
            let data = dataList[index][propertyList[pro]];
            // console.log(propertyList[pro]);
            // console.log(displayDT[pro]);

            if (displayDT[pro] == 'text') {
                if (data == null) {
                    td.innerText = '-';
                } else {
                    td.innerText = data;
                }
            } else if (displayDT[pro] == 'object') {
                //create paragraph element
                p = document.createElement("p")
                p.classList.add("para");
                let paraData = getDataFromObject(dataList[index], propertyList[pro]);

                p.innerText = paraData;
                td.appendChild(p);

            } else {
                let para = document.createElement("p");
                let paradata = displayDT[pro](dataList[index]);
                //td.innerText = displayDT[pro](dataList[index]);
                para.innerHTML = paradata;
                td.appendChild(para);
            }


            tr.appendChild(td);
        }


        tbody.appendChild(tr);
    }
}

const getDataFromObject = (ob, path) => {
    // console.log(ob);
    // console.log(path);



    let getData = (modal, propPath) => {
        let paths = propPath.split('.');

        if (paths.length > 1 && typeof modal[paths[0]] === "object") {
            return getData(modal[paths[0]], paths.slice(1).join('.'));
        } else {
            return modal[paths[0]];
        }
    }

    let data = getData(ob, path);

    return data;
}

function setValid(feildid) {
    feildid.classList.add("is-valid");
    feildid.classList.remove("is-invalid");
    feildid.classList.remove("is-updated");
    feildid.removeAttribute('style');
}

function setInvalid(feildid) {
    feildid.classList.add("is-invalid");
    feildid.classList.remove("is-valid");
    feildid.classList.remove("is-updated");
    feildid.removeAttribute('style');
}

function setUpdate(feildid) {
    feildid.classList.add("is-updated");
    feildid.classList.add("is-valid");
    feildid.classList.remove("is-invalid");
}

function setDefauld(feildid) {
    feildid.classList.remove("is-invalid");
    feildid.classList.remove("is-valid");
    feildid.classList.remove("is-updated");
    feildid.removeAttribute('style');
}


//check box eke validation eka kr aganna ( chek box eke binding eka kra ganna)
const checkBoxValidator = (fieldid,pattern,object,property,oldobject,lblid,trueMsg,falseMsg) => {
let ob = window[object];
let oldob = window[oldobject];

if (fieldid.checked) {
    ob[property] = true;
    if(trueMsg != ""){
    lblid.innerText = "";
    lblid.innerText = trueMsg;
if (oldob != null && ob[property] != oldob[property]) {
    lblid.style.color = "orange";
} else {
    lblid.style.color = "green";
}
}


} else {
    ob[property] = false;
    if(falseMsg != ""){
        lblid.innerText = "";
        lblid.innerText = falseMsg;
        if (oldob != null && ob[property] != oldob[property]) {
            lblid.style.color = "orange";
        } else {
            lblid.style.color = "green";
        }
    }
   
}
}
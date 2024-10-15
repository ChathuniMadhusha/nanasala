window.addEventListener('load', loadUI);

//window eka load weddi watena function eka
function loadUI() {
    console.log("Browser onload");

    refreshArrearsReport();


    loggedUserPrivilege = getServiceRequest("/privilage/bymodule/"+"ATTENDANCE_MANAGEMENT" );

    //enable tooltip
    $('[data-bs-toggle = "tooltip"]').tooltip();
}


function refreshArrearsReport(){

    courselist = getServiceRequest("/course/findall");
    fillSelectFeild (cmbCourseName, "Select Course name", courselist, 'course_name', '');

}


const btnGenReportArr = () => {

    //arrearsreport = getServiceRequest("/arrearsreport/bybatch?bid="+JSON.parse(cmbBatchname.value).id)
    batchcountreport = getServiceRequest("/batchcountreport/bycourse?cid="+JSON.parse(cmbCourseName.value).id)

    let displayPropertyList = ['batch_name','s_count'];
    let displayDataList = ['text','text'];

    fillDataTable (tblBatchCount, batchcountreport, displayPropertyList,displayDataList,formRefill, rowDelete, rowView,false, true,[],loggedUserPrivilege);

    labelArray = new Array();
    dataArray = new Array();

    batchcountreport.forEach(bcount =>{
        labelArray.push(bcount.batch_name);
        dataArray.push(bcount.s_count);
    });

    colorArray = new Array();
    for(let index=0; index < batchcountreport.length ; index++){
        colorArray.push(getRandomColor());
    }

//reload refresh chart with table
    const ctx = document.getElementById('myChart');

    myChartView = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labelArray,
            datasets: [{
                label: '# of Votes',
                data: dataArray,
                borderWidth: 1,
                backgroundColor: colorArray
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

}

const btnPrintReportArr = () => {
    let newwindow = window.open();
    let tablehtml = tblArrearsPayment.outerHTML;
    newwindow.document.write(
        "<link rel='stylesheet' href='assets/vendor/bootstrap/css/bootstrap.min.css'>" +

        "<div>" + tablehtml + "</div>"
    );
}

const clearChart =()=>{
    if(myChartView != undefined){
        myChartView.destroy();
    }
}


function getBatchName(){

    // batchname = getServiceRequest("/batch/batchnameaccortocourse?id="+JSON.parse(cmbCourseName.value).id);
    // fillSelectFeild(cmbBatchname,"Select Batch Name",batchname,'batch_name','');

    batchname = getServiceRequest("/batch/batchnameaccortoonlycourse?id="+JSON.parse(cmbCourseName.value).id);
    fillSelectFeild(cmbBatchname,"Select Batch Name",batchname,'batch_name','');


}

const getMonthlyArrears = () => {

    console.log(JSON.parse(cmbBatchname.value))



}

const formRefill = () => {


}

const rowView = () => {

}

const rowDelete = () => {

}



 const printChartMC = () => {
        //chart js wlta aithi function ekak thma toBase64Image kiyna eka
     //eken image src ekak create wela viewChart ekta add wenwa
     viewChart.src = myChartView.toBase64Image();
     let newWindow = window.open();

     //display property eka remove krnwa
     newWindow.document.write(viewChart.outerHTML + "<script>viewChart.style.removeProperty('display');</script>")

     //mili second 500k late wela print wela close krna kiynwa
        setTimeout(function () {
            newWindow.print();
            newWindow.close();
            }, 500
        )


 }


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
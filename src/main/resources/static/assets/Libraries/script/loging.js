window.addEventListener("load",function () {
    let logedUser = getServiceRequest("/logeduser");


    imgLoggedUser.src = logedUser.user_photo_path + logedUser.photo_name;
    spmLoggedUser.innerText = logedUser.username;
    spnUserRole.innerText = logedUser.role;
    UserName.innerText = logedUser.name;

    if(logedUser.username != "Admin"){
        //privilage nathi module list eka
        let modulelist = getServiceRequest("/modulenamebyuser/"+logedUser.username);

        console.log(modulelist)
        for(let index in modulelist){
            if(document.getElementById(modulelist[index])!=undefined);
                document.getElementById(modulelist[index]).remove();
        }
    }

 /*   let modulelist = getServiceRequest("/modulenamebyuser/"+logedUser.username);

        for(let index in modulelist){
            if(document.getElementById((modulelist[index])!=undefined))
                document.getElementById(modulelist[index]).remove();
        }*/


})

function logoutMC(){
    let userConfirm = window.confirm("Are you sure to signout....?");

    if(userConfirm){
        window.location.replace("/logout");
    }
}
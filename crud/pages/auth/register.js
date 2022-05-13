function register() {

}
function checkUserName(){

}

function checkPassword(){

}
function  checkConfirmPassword(){
    let confirmPassword = $("#confirm-password").val();
    let password = $("#password").val();
    if (confirmPassword !== password){
        $("#checked-confirm-password").text("not true")
    }else {
        $("#checked-confirm-password").text("")
    }
}
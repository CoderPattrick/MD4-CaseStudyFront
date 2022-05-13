function login() {
    event.preventDefault();
    let username = $('#username').val();
    let password = $('#password').val();
    let user = {
        "username": username,
        "password": password
    }

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        url: "http://localhost:8080/login",
        data: JSON.stringify(user),
        success: function (data){
            localStorage.setItem("data", JSON.stringify(data));
            window.location.href = "../players/list.html"
        }
    })
}
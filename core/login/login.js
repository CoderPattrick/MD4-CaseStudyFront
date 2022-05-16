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
        success: function (user){
            localStorage.setItem("user", JSON.stringify(user));
            let userStorage = localStorage.getItem("user");
            let userDetail = JSON.parse(userStorage);
            let role = userDetail.authority;
            let id = userDetail.id;
            switch (role) {
                case "ROLE_ADMIN": window.location.href = "";
                break;

                case "ROLE_COACH": window.location.href = "../players/list.html";
                break;

                case "ROLE_PLAYER": window.location.href = "../players/list.html";
                break;

                default:
                    window.location.href = "../login/login.html";
                    break;
            }
        }
    })
}

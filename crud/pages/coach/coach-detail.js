let user = localStorage.getItem("user");

function getToken() {
    if (user == null){
        window.location.href = "../auth/login.html";
    }
    else {
        let obj = JSON.parse(user);
        let token = obj.accessToken;
        return token;
    }
}

function showDetailCoach() {
    let token = getToken();
    let id = JSON.parse("user").id;
    $.ajax({
        headers:{
            'Authorization': 'Bearer '+ token,
            'Access-control-allow-origin': '*'
        },
        type: 'GET',
        url: `http://localhost:8080/coach/${id}`,
        success: function (coach) {
            let tableDetail = `<table>
                        
                       <tr>
                            <th>Tên HLV:</th>
                            <th></th>
                            <th></th>
                            <th>${coach.name}</th>
                           
                        </tr>
                        <tr>
                            <td>Ngày Sinh</td>
                            <td></td>
                            <td></td>
                            <td>${coach.doB}</td>
                        </tr>
                        <tr>
                            <td>Quốc tịch:</td>
                            <td></td>
                            <td></td>
                            <td>${coach.nationality.name}</td>
                        </tr>
                        <tr>
                            <td>Lương cơ bản</td>
                            <td></td>
                            <td></td>
                            <td>${player.base_salary}</td>
                        </tr>
                    </table>`;
            $('#detail-info').html(tableDetail);
        }
    })




}
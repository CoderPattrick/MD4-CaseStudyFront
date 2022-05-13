let data = localStorage.getItem("data");
if (data == null){
    window.location.href = "../login/login.html"
}
else {
    let obj = JSON.parse(data);
    let name = obj.name;
    console.log(name);
    $('#name').html(name)
    let token = obj.accessToken;
    showPlayer(token);
}


function showPlayer(token) {
    $.ajax({
        headers:{
            'Authorization': 'Bearer '+ token,
            'Access-control-allow-origin': '*'
        },
        type:"GET",
        url:"http://localhost:8080/player",
        success:function (player) {
            let content="";
            for (let i = 0; i < player.length; i++) {
                content+=`<tr>
            <th scope="row">${i+1}</th>
            <th>${player[i].name}</th>
            <th>${player[i].nationality.name}</th>
            <th>${player[i].doB}</th>
            <th>${player[i].status.name}</th>
            <th>${player[i].position.name}</th>
            <td><button class="btn btn-primary" data-toggle="modal" data-target="#myModal" onclick="PlayerView(${player[i].id})">View</button></td>

</tr>`
            }
            $("#list-player").html(content);
        }
    })
}
function PlayerView(id,token) {
let content= `<div>
 <form>
                    <div class="mb-3">
                        <label for="name1" class="form-label">Name</label>
                        <input type="text" class="form-control" id="name1" >
                    </div>
                    <div class="mb-3">
                        <label for="position1" class="form-label">Position</label>
                        <input type="position" class="form-control" id="position1">
                    </div>
                    <div class="mb-3">
                        <label for="dob1" class="form-label">DoB</label>
                        <input type="text" class="form-control" id="dob1">
                    </div>
                    <div class="mb-3">
                        <label for="nationality1" class="form-label">Nationality</label>
                        <input type="text" class="form-control" id="nationality1">
                    </div>
                    <div class="mb-3">
                        <label for="performance1" class="form-label">Performance</label>
                        <input type="text" class="form-control" id="performance1">
                    </div>
                    <div class="mb-3">
                        <label for="status1" class="form-label">Status</label>
                        <input type="text" class="form-control" id="status1">
                    </div>
                    <div class="mb-3">
                        <label for="base_salary" class="form-label">Base_Salary</label>
                        <input type="text" class="form-control" id="base_salary">
                    </div>
                    <div class="mb-3">
                        <label for="height" class="form-label">Height</label>
                        <input type="text" class="form-control" id="height">
                    </div>
                    <div class="mb-3">
                        <label for="weight" class="form-label">Weight</label>
                        <input type="text" class="form-control" id="weight">
                    </div>
                    <div class="mb-3">
                        <label for="cv" class="form-label">CV</label>
                        <input type="text" class="form-control" id="cv">
                    </div>
                    <div class="mb-3">
                        <label for="avatar" class="form-label">Avatar</label>
                        <input type="text" class="form-control" id="avatar">
                    </div>
<!--                   <div class="modal-footer">-->
<!--                    <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>-->
<!--                </div>-->

                </form>

</div>`
    $("#showDetail").html(content);
$.ajax({
     type: "GET",
    url: "http://localhost:8080/player/"+id,
    success:function (player) {
         $('#name1').val(player.name)
         $('#position1').val(player.position.name)
         $('#dob1').val(player.doB)
         $('#nationality1').val(player.nationality.name)
         $('#performance1').val(player.performance.name)
        $('#status1').val(player.status.name)
         $('#base_salary').val(player.base_salary)
         $('#height').val(player.height)
         $('#weight').val(player.weight)
         $('#cv').val(player.cv)
         $('#avatar').val(player.avatar)
    }
})
}
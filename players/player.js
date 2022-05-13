function showPlayer() {
    $.ajax({
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
showPlayer();
function PlayerView() {

}

function getAllPlayer() {
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/player`,

        success: function (playerList) {
            let content = '';
            for (let i = 0; i < playerList.length; i++) {
                content += `<tr>
        <td>${i + 1}</td>
        <td>${playerList[i].name}</td>
        <td><img src="http://localhost:8080/image/${playerList[i].avatar}" height="100px" width="80px"></td>
        <td>${playerList[i].position.name}</td>
        <td>${playerList[i].nationality.name}</td>
        <td>${playerList[i].status.name}</td>
         <td><button class="btn btn-primary" data-target="#create-product" data-toggle="modal"
                                        type="button" onclick="showEditPlayer(${playerList[i].id})"><i>Chỉnh sửa</i></button></td>
        <td><button class="btn btn-danger" data-target="#detail-product" data-toggle="modal"
                                        type="button" onclick="showDetailPlayer(${playerList[i].id})"><i>Chi tiết</i></button></td>
       
    </tr>`
            }
            $('#player-list-content').html(content);
        }
    })
    event.preventDefault();
}

function showDetailPlayer(id) {
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/player/${id}`,
        success: function (player) {
            let tableDetail = `<table>
                        <tr>
                        <img src="http://localhost:8080/image/${player.avatar}" width="200" height="160">
                       <tr>
                       <tr>
                            <th>Tên cầu thủ:</th>
                            <th></th>
                            <th></th>
                            <th>${player.name}</th>
                           
                        </tr>
                            <td>Chiều cao:</td>
                            <td></td>
                            <td></td>
                            <td>${player.height}</td>
                        </tr>
                        <tr>
                            <td>Cân nặng:</td>
                            <td></td>
                            <td></td>
                            <td>${player.weight}</td>
                        </tr>
                        <tr>
                            <td>Vị trí</td>
                            <td></td>
                            <td></td>
                            <td>${player.position.name}</td>
                        </tr>
                        <tr>
                            <td>Ngày Sinh</td>
                            <td></td>
                            <td></td>
                            <td>${player.doB}</td>
                        </tr>
                        <tr>
                            <td>Quốc tịch:</td>
                            <td></td>
                            <td></td>
                            <td>${player.nationality.name}</td>
                        </tr>
                        <tr>
                            <td>Phong độ:</td>
                            <td></td>
                            <td></td>
                            <td>${player.performance.name}</td>
                        </tr>
                        <tr>
                            <td>Trạng thái</td>
                            <td></td>
                            <td></td>
                            <td>${player.status.name}</td>
                        </tr>
                        <tr>
                            <td>Lương cơ bản</td>
                            <td></td>
                            <td></td>
                            <td>${player.base_salary}</td>
                        </tr>
                    </table>`;
            $('#detail-body').html(tableDetail);
        }
    })




}

function addNewPlayer() {
    let name = $('#name').val();
    let position = $('#position').val();
    let DoB = $('#DoB').val();
    let nationality = $('#nationality').val();
    let performance = $('#performance').val();
    let status = $('#status').val();
    let base_salary = $('#base_salary').val();
    let height = $('#height').val();
    let weight = $('#weight').val();
    let cv = $('#cv');
    let avatar = $('#avatar');
    let player = new FormData();
    player.append('name', name);
    player.append('position', position);
    player.append('DoB', DoB);
    player.append('nationality', nationality);
    player.append('performance', performance);
    player.append('status', status);
    player.append('base_salary', base_salary);
    player.append('height', height);
    player.append('weight', weight);
    player.append('cv', cv.prop('files')[0])
    player.append('avatar', avatar.prop('files')[0])
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/player',
        data: player,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        success: function () {
            getAllPlayer();
            showSuccessMessage('Tạo thành công!');
        },
        error: function () {
            showErrorMessage('Tạo lỗi!');
        }
    })
}

function showEditPlayer(id) {
    let title = 'Chỉnh sửa thông tin cầu thủ';
    let footer = `<button class="btn btn-secondary" data-dismiss="modal" type="button">Đóng</button>
                    <button class="btn btn-primary" onclick="editPlayer(${id})" type="button" aria-label="Close"
                     class="close" data-dismiss="modal">Cập nhật</button>`;
    $(`#name`).val(null);
    $(`#position`).val(null);
    $(`#DoB`).val(null);
    $(`#nationality`).val(null);
    $(`#performance`).val(null);
    $(`#status`).val(null);
    $(`#base_salary`).val(null);
    $(`#height`).val(null);
    $(`#weight`).val(null);
    $(`#cv`).val(null);
    $(`#avatar`).val(null);
    $('#create-product-title').html(title);
    $('#create-product-footer').html(footer);
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/player/${id}`,

        success: function (player) {
            $('#name').val(player.name);
            $(`#position`).val(player.position.name);
            $(`#DoB`).val(player.doB);
            $(`#nationality`).val(player.nationality);
            $(`#performance`).val(player.performance);
            $(`#status`).val(player.status);
            $(`#base_salary`).val(player.base_salary);
            $(`#height`).val(player.height);
            $(`#weight`).val(player.weight);
            let cv = `<i><p style="color: blue">CV cũ:</p><p style="color: red"> ${player.cv}</p><i/>`;
            $('#cv_player').html(cv);
            let avatar = `<img src="http://localhost:8080/image/${player.avatar}" height="50" alt="image">`
            $('#avatar_player').html(avatar);
        }
    })
    getNationality();
    getPerformance();
    getStatus();
    getPosition();
}

function editPlayer(id) {
    let name = $('#name').val();
    let position = $(`#position`).val();
    let DoB = $('#DoB').val();
    let nationality = $('#nationality').val();
    let performance = $('#performance').val();
    let status = $('#status').val();
    let base_salary = $('#base_salary').val();
    let height = $('#height').val();
    let weight = $('#weight').val();
    let avatar = $('#avatar');
    let cv = $('#cv');
    let player = new FormData();
    player.append('name', name);
    player.append('position', position);
    player.append('DoB', DoB);
    player.append('nationality', nationality);
    player.append('performance', performance);
    player.append('status', status);
    player.append('base_salary', base_salary);
    player.append('height', height);
    player.append('weight', weight);
    player.append('avatar', avatar.prop('files')[0])
    player.append('cv', cv.prop('files')[0])
    $.ajax({
        type: 'POST',
        url: `http://localhost:8080/player/${id}`,
        data: player,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        success: function () {
            getAllPlayer();
            showSuccessMessage('Sửa thành công!');
        },
        error: function () {
            showErrorMessage('Thất bại!');
        }
    })
}

function showCreatePlayerForm() {
    let title = 'Nhập thông tin cầu thủ';
    let footer = `   <button class="btn btn-secondary" data-dismiss="modal" type="button">Đóng</button>
                    <button class="btn btn-primary" onclick="addNewPlayer()" type="button" aria-label="Close" class="close" data-dismiss="modal">Tạo mới</button>`;
    $('#create-product-title').html(title);
    $('#create-product-footer').html(footer);
    $(`#name`).val(null);
    $(`#position`).val(null);
    $(`#DoB`).val(null);
    $(`#nationality`).val(null);
    $(`#performance`).val(null);
    $(`#status`).val(null);
    $(`#base_salary`).val(null);
    $(`#height`).val(null);
    $(`#weight`).val(null);
    $(`#cv`).val(null);
    $(`#avatar`).val(null);
    getPosition();
    getStatus();
    getNationality();
    getPerformance();
}

function getPerformance() {
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/performance`,
        success: function (data) {
            let content = `<option>Chọn phong độ</option>`
            for (let i = 0; i < data.length; i++) {
                content += `<option value="${data[i].id}">${data[i].name}</option>`
            }
            $('#performance').html(content);
        }
    })
}

function getNationality() {
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/nationality`,
        success: function (data) {
            let content = `<option>Chọn quốc tịch</option>`
            for (let i = 0; i < data.length; i++) {
                content += `<option value="${data[i].id}">${data[i].name}</option>`
            }
            $('#nationality').html(content);
        }
    })
}

function getStatus() {
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/status`,
        success: function (data) {
            let content = `<option>Chọn trạng thái</option>`
            for (let i = 0; i < data.length; i++) {
                content += `<option value="${data[i].id}">${data[i].name}</option>`
            }
            $('#status').html(content);
        }
    })
}

function getPosition() {
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/position`,
        success: function (data) {
            let content = `<option>Chọn vị trí</option>`
            for (let i = 0; i < data.length; i++) {
                content += `<option value="${data[i].id}">${data[i].name}</option>`
            }
            $('#position').html(content);
        }
    })
    event.preventDefault();
}

$(document).ready(function () {
    getAllPlayer();
})

function showSuccessMessage(message) {
    $(function () {
        var Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000
        });

        Toast.fire({
            icon: 'success',
            title: message
        })
    });
}

function showErrorMessage(message) {
    $(function () {
        var Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000
        });

        Toast.fire({
            icon: 'error',
            title: message
        })
    });
}

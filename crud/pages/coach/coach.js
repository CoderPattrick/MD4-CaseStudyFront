getAllCoach();

function getAllCoach() {
    $.ajax({
        Type: 'GET',
        url: 'http://localhost:8080/coach',
        success: function (coachList) {
            let content = '';
            for (let i = 0; i < coachList.length; i++) {
                content += `<tr>
        <td>${i + 1}</td>
        <td>${coachList[i].name}</td>
        <td>${coachList[i].doB}</td>
        <td>${coachList[i].nationality.name}</td>
    <td><button class="btn btn-primary" data-target="#create-product" data-toggle="modal"
                                        type="button" onclick="showEditCoach(${coachList[i].id})"><i>Chỉnh sửa</i></button></td>
        <td><button class="btn btn-danger" data-target="#edit-product" data-toggle="modal"
                                        type="button" onclick="showDetailCoach(${coachList[i].id})"><i>Chi tiết</i></button></td>
       
    </tr>`
            }
            $('#category-list-content').html(content);
        }
    })
}


function addNewCoach() {
    let name = $('#name').val();
    let DoB =  $(`#DoB`).val();
    let nationality = $(`#nationality`).val();
    let base_salary = $(`#base_salary`).val();
    let cv = $('#cv');
    let coach = new FormData;
    coach.append('name', name);
    coach.append('DoB', DoB);
    coach.append('nationality', nationality);
    coach.append('base_salary', base_salary);
    coach.append('cv', cv.prop('files')[0]);
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/coach',
        data: coach,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        success: function () {
            getAllCoach();
            showSuccessMessage('Tạo thành công');
        },
        error: function () {
            showErrorMessage('Tạo lỗi');
        }
    })
}

function showSuccessMessage(message) {
    $(function () {
        var Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
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
            timer: 3000
        });

        Toast.fire({
            icon: 'error',
            title: message
        })
    });
}

function showCreateCoach() {
    let title = 'Nhập thông HLV';
    let footer = `   <button class="btn btn-secondary" data-dismiss="modal" type="button">Đóng</button>
                    <button class="btn btn-primary" onclick="addNewCoach()" type="button" aria-label="Close" class="close" data-dismiss="modal">Thêm mới</button>`;
    $('#create-category-title').html(title);
    $('#create-category-footer').html(footer);
    $(`#name`).val(null);
    $(`#DoB`).val(null);
    $(`#nationality`).val(null);
    $(`#base_salary`).val(null);
    $(`#cv`).val(null);
    getNationality();
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





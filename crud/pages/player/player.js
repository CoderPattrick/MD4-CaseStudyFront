function showDetailPlayer(id) {

    let content = `
                <tr>
                    <td>Tên:</td>
                    <td colspan="2" id="name"></td>
                </tr>
                <tr>
                    <td>Quốc tịch:</td>
                    <td colspan="2" id="nationality"></td>
                </tr><tr>
                    <td>Vị trí:</td>
                    <td colspan="2" id="position"></td>
                </tr>
                <tr aria-rowspan="3">
                    <td>Avatar:</td>
                    <td colspan="2" id="avatar"></td>
                </tr>
                <tr>
                    <td>Chiều cao:</td>
                    <td colspan="2" id="height"></td>
                </tr>
                <tr>
                    <td>Cân nặng:</td>
                    <td colspan="2" id="weight"></td>
                </tr>
                <tr>
                    <td>Phong độ:</td>
                    <td colspan="2" id="performance"></td>
                </tr>
                <tr>
                    <td>Ngày sinh:</td>
                    <td colspan="2" id="DoB"></td>
                </tr>
                <tr>
                    <td>Trạng thái:</td>
                    <td colspan="2" id="status"></td>
                </tr>
                <tr>
                    <td>Lương cơ bản:</td>
                    <td colspan="2" id="base_salary"></td>
                </tr> `;
                $('#detail-player').html(content);

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
            let avatar = `<img src="http://localhost:8080/image/${player.avatar}" height="50" alt="image">`
            $('#avatar').html(avatar);
        }
    })
}
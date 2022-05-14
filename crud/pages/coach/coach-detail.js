function showDetailCoach() {
    let id = JSON.parse(localStorage.getItem("user")).id;
    $.ajax({
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
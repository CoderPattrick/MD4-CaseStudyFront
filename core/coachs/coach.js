function showAllCoach() {
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/coach",
        success:function (coach) {
            let content="";
            for (let i = 0; i < coach.length; i++) {
                content += `<tr>
             <th scope="row">${i+1}</th>
             <th>${coach[i].name}</th>
             <th>${coach[i].nationality.name}</th>
             <th>${coach[i].doB}</th>
             <td><button class="btn btn-primary" data-toggle="modal" data-target="#myModal" onclick="showCoachDetail(${coach[i].id})">View</button></td>

</tr>`
            }
            $("#list-coach").html(content);
        }
    })

}
showAllCoach();
function showCoachDetail(id) {
    let content=`<div>
 <form id="coach">
                    <div class="mb-3">
                        <label for="name1" class="form-label">Name</label>
                        <input type="text" class="form-control" id="name">
                    </div>
                    <div class="mb-3">
                        <label for="nationality1" class="form-label">Nationality</label>
                        <input type="text" class="form-control" id="nationality1">
                    </div>
                    <div class="mb-3">
                        <label for="doB1" class="form-label">DoB</label>
                        <input type="text" class="form-control" id="doB1">
                    </div>
                    <div class="mb-3">
                        <label for="base_salary" class="form-label">Base_Salary</label>
                        <input type="text" class="form-control" id="base_salary">
                    </div>
                    <div class="mb-3">
                        <label for="cv" class="form-label">CV</label>
                        <input type="text" class="form-control" id="cv">
                    </div>
                     <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                </div>
                </form>
</div>`
    $("#showDetail").html(content);
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/coach/" +id,
        success:function (coach) {
            $('#name1').val(coach.name)
            $('#nationality1').val(coach.nationality.name)
            $('#dob1').val(coach.doB.name)
            $('#base_salary').val(coach.base_salary)
            $('#cv').val(coach.cv)
        }
    })
}
